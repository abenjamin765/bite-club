/**
 * Bite Club — domain data access layer.
 *
 * Every page talks to the backend through this module. When Supabase is
 * configured it issues real queries against the schema in
 * `supabase/migrations/`. When it is not (local demo mode), it reads and writes
 * a structured mirror of that schema in localStorage so the full loop —
 * group → plan → build meals → submit → approve → check-in → digest — is
 * exercisable offline.
 *
 * The demo store intentionally mirrors the SQL table/column names so the two
 * paths stay in sync and the Supabase path can be reasoned about against demo.
 */
import { getSupabaseClient } from "/app/assets/js/supabase.js";
import {
  todayIso,
  addDaysIso,
  startOfWeekIso,
  weekDates,
  dowLong,
  dowShort,
  dayOfMonth,
  sumMacros,
  emptyMacros,
} from "/app/assets/js/utils.js";

const DEMO_KEY = "bc.demo.db";

function emptyDb() {
  return {
    users: [],
    groups: [],
    group_members: [],
    weekly_meal_plans: [],
    day_plans: [],
    meals: [],
    ingredients: [],
    saved_meals: [],
    daily_check_ins: [],
    meal_adherence_records: [],
  };
}

function readDb() {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (!raw) return emptyDb();
    return { ...emptyDb(), ...JSON.parse(raw) };
  } catch {
    return emptyDb();
  }
}

function writeDb(db) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(db));
}

function uuid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function makeInviteCode() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function nowIso() {
  return new Date().toISOString();
}

const MACRO_FIELDS = ["calories", "protein", "carbs", "fat"];

function normalizeMacros(input) {
  const out = {};
  MACRO_FIELDS.forEach((key) => {
    out[key] = Math.max(0, Number(input?.[key] || 0));
  });
  return out;
}

/**
 * Ensure a demo user record exists so coach-facing views can show names.
 * Called opportunistically from pages that know the current profile.
 */
export function rememberDemoUser({ id, name, role, email }) {
  if (getSupabaseClient() || !id) return;
  const db = readDb();
  const existing = db.users.find((u) => u.id === id);
  if (existing) {
    existing.name = name || existing.name;
    existing.role = role || existing.role;
    existing.email = email || existing.email;
  } else {
    db.users.push({ id, name: name || "Member", role: role || "client", email: email || "" });
  }
  writeDb(db);
}

/* ----------------------------------------------------------------------------
 * Groups & membership
 * ------------------------------------------------------------------------- */

/** Pilot cap — UI supports a collection; creation disabled at this limit until multi-group ships. */
export const MAX_COACH_GROUPS = 1;

export async function getCoachGroups(coachId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return db.groups
      .filter((g) => g.coach_id === coachId)
      .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
  const { data } = await supabase
    .from("groups")
    .select("id, name, coach_id, invite_code, created_at")
    .eq("coach_id", coachId)
    .order("created_at", { ascending: true });
  return data || [];
}

export async function getMyGroup(userId, role) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    if (role === "coach") {
      const groups = db.groups.filter((g) => g.coach_id === userId);
      return groups.sort((a, b) => String(a.name).localeCompare(String(b.name)))[0] || null;
    }
    const membership = db.group_members.find((m) => m.user_id === userId);
    if (!membership) return null;
    return db.groups.find((g) => g.id === membership.group_id) || null;
  }

  if (role === "coach") {
    const groups = await getCoachGroups(userId);
    return groups[0] || null;
  }

  const { data: membership } = await supabase
    .from("group_members")
    .select("group_id, groups ( id, name, coach_id, invite_code )")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
  return membership?.groups || null;
}

export async function createGroup(name, coachId) {
  const supabase = getSupabaseClient();
  const inviteCode = makeInviteCode();
  if (!supabase) {
    const db = readDb();
    const group = { id: uuid(), coach_id: coachId, name, invite_code: inviteCode };
    db.groups.push(group);
    writeDb(db);
    return { data: group, error: null };
  }
  const { data, error } = await supabase
    .from("groups")
    .insert({ coach_id: coachId, name, invite_code: inviteCode })
    .select("id, name, coach_id, invite_code")
    .single();
  return { data, error };
}

export async function joinGroupByCode(code, userId) {
  const normalized = String(code || "").trim().toUpperCase();
  if (!normalized) return { data: null, error: { message: "Enter an invite code." } };

  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    const group = db.groups.find((g) => g.invite_code === normalized);
    if (!group) return { data: null, error: { message: "No group found for that code." } };
    const already = db.group_members.find(
      (m) => m.group_id === group.id && m.user_id === userId
    );
    if (!already) {
      db.group_members.push({ group_id: group.id, user_id: userId });
      writeDb(db);
    }
    return { data: group, error: null };
  }

  // Self-join under RLS requires a security-definer RPC (see 003_group_invites.sql).
  const { data, error } = await supabase.rpc("join_group_by_code", { code: normalized });
  return { data, error };
}

export async function getGroupMembers(groupId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return db.group_members
      .filter((m) => m.group_id === groupId)
      .map((m) => db.users.find((u) => u.id === m.user_id))
      .filter(Boolean)
      .filter((u) => u.role !== "coach");
  }
  const { data } = await supabase
    .from("group_members")
    .select("user_id, users ( id, name, email, role )")
    .eq("group_id", groupId);
  return (data || [])
    .map((row) => row.users)
    .filter((u) => u && u.role !== "coach");
}

/* ----------------------------------------------------------------------------
 * Weekly meal plans — lifecycle
 * ------------------------------------------------------------------------- */

const EDITABLE_STATUSES = new Set(["draft", "needs_changes"]);

export function isPlanEditable(plan) {
  return !plan || EDITABLE_STATUSES.has(plan.status || "draft");
}

export async function getLatestPlan(clientId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return (
      db.weekly_meal_plans
        .filter((p) => p.client_id === clientId)
        .sort((a, b) => (a.week_start < b.week_start ? 1 : -1))[0] || null
    );
  }
  const { data } = await supabase
    .from("weekly_meal_plans")
    .select("*")
    .eq("client_id", clientId)
    .order("week_start", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

export async function getActivePlan(clientId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return (
      db.weekly_meal_plans
        .filter(
          (p) =>
            p.client_id === clientId &&
            (p.status === "approved" || p.status === "active")
        )
        .sort((a, b) => (a.week_start < b.week_start ? 1 : -1))[0] || null
    );
  }
  const { data } = await supabase
    .from("weekly_meal_plans")
    .select("*")
    .eq("client_id", clientId)
    .in("status", ["approved", "active"])
    .order("week_start", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

/**
 * The plan the client is currently building: the row for this week, created as
 * a draft if it does not exist yet. One plan per client per week (unique
 * client_id, week_start), so this is safe to call on every visit.
 */
export async function getOrCreateCurrentPlan(clientId, groupId, weekStart = startOfWeekIso()) {
  const weekEnd = addDaysIso(weekStart, 6);
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    let plan = db.weekly_meal_plans.find(
      (p) => p.client_id === clientId && p.week_start === weekStart
    );
    if (!plan) {
      plan = {
        id: uuid(),
        client_id: clientId,
        group_id: groupId,
        week_start: weekStart,
        week_end: weekEnd,
        status: "draft",
      };
      db.weekly_meal_plans.push(plan);
      writeDb(db);
    }
    return plan;
  }

  const { data: existing } = await supabase
    .from("weekly_meal_plans")
    .select("*")
    .eq("client_id", clientId)
    .eq("week_start", weekStart)
    .maybeSingle();
  if (existing) return existing;

  const { data } = await supabase
    .from("weekly_meal_plans")
    .insert({
      client_id: clientId,
      group_id: groupId,
      week_start: weekStart,
      week_end: weekEnd,
      status: "draft",
    })
    .select("*")
    .single();
  return data;
}

/* ----------------------------------------------------------------------------
 * Plan tree — meals & ingredients
 * ------------------------------------------------------------------------- */

/**
 * Load every meal in a plan with its ingredients, normalized to a flat list:
 * [{ id, date, name, type, position, ingredients: [...] }]
 */
async function fetchPlanTree(plan) {
  if (!plan) return [];
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return db.meals
      .filter((m) => m.plan_id === plan.id)
      .map((m) => ({
        ...m,
        ingredients: db.ingredients.filter((i) => i.meal_id === m.id),
      }));
  }

  const { data: dayPlans } = await supabase
    .from("day_plans")
    .select("id, date")
    .eq("plan_id", plan.id);
  if (!dayPlans || !dayPlans.length) return [];
  const dateByDay = new Map(dayPlans.map((d) => [d.id, d.date]));

  const { data: meals } = await supabase
    .from("meals")
    .select("id, day_plan_id, name, type, position")
    .in("day_plan_id", Array.from(dateByDay.keys()))
    .order("position", { ascending: true });
  if (!meals || !meals.length) return [];

  const mealIds = meals.map((m) => m.id);
  const { data: ingredients } = await supabase
    .from("ingredients")
    .select("id, meal_id, name, quantity, unit, calories, protein, carbs, fat")
    .in("meal_id", mealIds);
  const ingByMeal = new Map();
  (ingredients || []).forEach((row) => {
    if (!ingByMeal.has(row.meal_id)) ingByMeal.set(row.meal_id, []);
    ingByMeal.get(row.meal_id).push(row);
  });

  return meals.map((m) => ({
    id: m.id,
    date: dateByDay.get(m.day_plan_id),
    name: m.name,
    type: m.type,
    position: m.position,
    ingredients: ingByMeal.get(m.id) || [],
  }));
}

function decorateMeal(meal) {
  const totals = sumMacros(meal.ingredients);
  return {
    id: meal.id,
    date: meal.date,
    name: meal.name,
    type: meal.type,
    position: meal.position || 0,
    ingredients: meal.ingredients,
    ingredientCount: meal.ingredients.length,
    totals,
  };
}

/**
 * Full builder view of a plan: seven day buckets with meals, per-meal /
 * per-day / week macro totals, and a completeness verdict for submission.
 */
export async function getPlanBuilder(plan) {
  const tree = await fetchPlanTree(plan);
  const start = plan?.week_start || startOfWeekIso();
  const today = todayIso();

  const mealsByDate = new Map();
  tree.forEach((meal) => {
    if (!mealsByDate.has(meal.date)) mealsByDate.set(meal.date, []);
    mealsByDate.get(meal.date).push(meal);
  });

  const days = weekDates(start).map((date) => {
    const meals = (mealsByDate.get(date) || [])
      .sort((a, b) => (a.position || 0) - (b.position || 0))
      .map(decorateMeal);
    return {
      date,
      dowLong: dowLong(date),
      dowShort: dowShort(date),
      dom: dayOfMonth(date),
      isToday: date === today,
      meals,
      totals: sumMacros(meals.map((m) => m.totals)),
    };
  });

  const allMeals = days.flatMap((d) => d.meals);
  const weekTotals = sumMacros(allMeals.map((m) => m.totals));

  // Completeness: at least one meal, and every meal has ingredient data.
  const emptyMeals = allMeals.filter((m) => m.ingredientCount === 0);
  const issues = [];
  if (allMeals.length === 0) {
    issues.push("Add at least one meal before submitting.");
  } else if (emptyMeals.length) {
    const names = emptyMeals.map((m) => m.name).join(", ");
    issues.push(`Add ingredients to: ${names}.`);
  }

  return {
    plan,
    editable: isPlanEditable(plan),
    days,
    weekTotals,
    mealCount: allMeals.length,
    dayCount: days.filter((d) => d.meals.length).length,
    completeness: { complete: issues.length === 0, issues },
  };
}

/** Single meal + its ingredients + totals, with owning date/plan context. */
export async function getMeal(mealId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    const meal = db.meals.find((m) => m.id === mealId);
    if (!meal) return null;
    const ingredients = db.ingredients.filter((i) => i.meal_id === mealId);
    const plan = db.weekly_meal_plans.find((p) => p.id === meal.plan_id) || null;
    return { meal, ingredients, totals: sumMacros(ingredients), plan, date: meal.date };
  }

  const { data: meal } = await supabase
    .from("meals")
    .select("id, name, type, position, day_plans!inner ( date, plan_id, weekly_meal_plans!inner ( id, status, client_id, group_id, week_start, week_end ) )")
    .eq("id", mealId)
    .maybeSingle();
  if (!meal) return null;
  const { data: ingredients } = await supabase
    .from("ingredients")
    .select("id, meal_id, name, quantity, unit, calories, protein, carbs, fat")
    .eq("meal_id", mealId);
  const list = ingredients || [];
  const day = meal.day_plans;
  return {
    meal: { id: meal.id, name: meal.name, type: meal.type, position: meal.position },
    ingredients: list,
    totals: sumMacros(list),
    plan: day?.weekly_meal_plans || null,
    date: day?.date || null,
  };
}

async function ensureDayPlan(supabase, planId, dateIso, position) {
  const { data, error } = await supabase
    .from("day_plans")
    .upsert(
      { plan_id: planId, date: dateIso, position },
      { onConflict: "plan_id,date" }
    )
    .select("id")
    .single();
  return { id: data?.id, error };
}

/** Add a meal to a specific day of a plan. Returns { data: { id }, error }. */
export async function addMeal(plan, dateIso, { name, type }) {
  const cleanName = String(name || "").trim() || "Meal";
  const cleanType = String(type || "other").toLowerCase();
  const supabase = getSupabaseClient();

  if (!supabase) {
    const db = readDb();
    const position = db.meals.filter((m) => m.plan_id === plan.id && m.date === dateIso).length;
    const meal = {
      id: uuid(),
      plan_id: plan.id,
      date: dateIso,
      name: cleanName,
      type: cleanType,
      position,
    };
    db.meals.push(meal);
    writeDb(db);
    return { data: meal, error: null };
  }

  const weekIndex = weekDates(plan.week_start).indexOf(dateIso);
  const { id: dayPlanId, error: dayError } = await ensureDayPlan(
    supabase,
    plan.id,
    dateIso,
    weekIndex < 0 ? 0 : weekIndex
  );
  if (dayError) return { data: null, error: dayError };

  const { count } = await supabase
    .from("meals")
    .select("*", { count: "exact", head: true })
    .eq("day_plan_id", dayPlanId);
  const { data, error } = await supabase
    .from("meals")
    .insert({ day_plan_id: dayPlanId, name: cleanName, type: cleanType, position: count || 0 })
    .select("id")
    .single();
  return { data, error };
}

export async function deleteMeal(mealId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    db.meals = db.meals.filter((m) => m.id !== mealId);
    db.ingredients = db.ingredients.filter((i) => i.meal_id !== mealId);
    writeDb(db);
    return { error: null };
  }
  const { error } = await supabase.from("meals").delete().eq("id", mealId);
  return { error };
}

export async function addIngredient(mealId, fields) {
  const macros = normalizeMacros(fields);
  const row = {
    meal_id: mealId,
    name: String(fields.name || "").trim() || "Ingredient",
    quantity: Math.max(0, Number(fields.quantity || 0)),
    unit: String(fields.unit || "serving").trim() || "serving",
    ...macros,
  };
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    const ingredient = { id: uuid(), ...row };
    db.ingredients.push(ingredient);
    writeDb(db);
    return { data: ingredient, error: null };
  }
  const { data, error } = await supabase
    .from("ingredients")
    .insert(row)
    .select("id, meal_id, name, quantity, unit, calories, protein, carbs, fat")
    .single();
  return { data, error };
}

export async function deleteIngredient(ingredientId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    db.ingredients = db.ingredients.filter((i) => i.id !== ingredientId);
    writeDb(db);
    return { error: null };
  }
  const { error } = await supabase.from("ingredients").delete().eq("id", ingredientId);
  return { error };
}

/* ----------------------------------------------------------------------------
 * Saved meals (reuse)
 * ------------------------------------------------------------------------- */

export async function getSavedMeals(clientId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return db.saved_meals
      .filter((m) => m.client_id === clientId)
      .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
  const { data } = await supabase
    .from("saved_meals")
    .select("id, name, ingredients")
    .eq("client_id", clientId)
    .order("name", { ascending: true });
  return data || [];
}

/** Snapshot a built meal (name + ingredients) into the client's reusable library. */
export async function saveMealToLibrary(clientId, mealId) {
  const detail = await getMeal(mealId);
  if (!detail) return { error: { message: "Meal not found." } };
  const snapshot = detail.ingredients.map((i) => ({
    name: i.name,
    quantity: Number(i.quantity || 0),
    unit: i.unit || "serving",
    ...normalizeMacros(i),
  }));
  const row = { client_id: clientId, name: detail.meal.name, ingredients: snapshot, type: detail.meal.type };

  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    db.saved_meals.push({ id: uuid(), ...row });
    writeDb(db);
    return { error: null };
  }
  const { error } = await supabase
    .from("saved_meals")
    .insert({ client_id: clientId, name: detail.meal.name, ingredients: snapshot });
  return { error };
}

/** Instantiate a saved meal into a day: creates the meal and copies ingredients. */
export async function addSavedMealToDay(plan, dateIso, savedMealId, clientId) {
  const saved = (await getSavedMeals(clientId)).find((m) => m.id === savedMealId);
  if (!saved) return { data: null, error: { message: "Saved meal not found." } };
  const { data: meal, error } = await addMeal(plan, dateIso, {
    name: saved.name,
    type: saved.type || "other",
  });
  if (error) return { data: null, error };
  const list = Array.isArray(saved.ingredients) ? saved.ingredients : [];
  for (const ing of list) {
    await addIngredient(meal.id, ing);
  }
  return { data: meal, error: null };
}

/* ----------------------------------------------------------------------------
 * Submit / status
 * ------------------------------------------------------------------------- */

export async function submitPlan({ clientId, groupId, weekStart = startOfWeekIso(), weekEnd }) {
  const end = weekEnd || addDaysIso(weekStart, 6);
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    let plan = db.weekly_meal_plans.find(
      (p) => p.client_id === clientId && p.week_start === weekStart
    );
    if (!plan) {
      plan = {
        id: uuid(),
        client_id: clientId,
        group_id: groupId,
        week_start: weekStart,
        week_end: end,
        status: "draft",
      };
      db.weekly_meal_plans.push(plan);
    }
    plan.status = "submitted";
    plan.submitted_at = nowIso();
    writeDb(db);
    return { data: plan, error: null };
  }
  const { data, error } = await supabase
    .from("weekly_meal_plans")
    .upsert(
      {
        client_id: clientId,
        group_id: groupId,
        week_start: weekStart,
        week_end: end,
        status: "submitted",
        submitted_at: nowIso(),
      },
      { onConflict: "client_id,week_start" }
    )
    .select("*")
    .single();
  return { data, error };
}

export async function getSubmittedPlans(groupId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    return db.weekly_meal_plans
      .filter((p) => p.group_id === groupId && p.status === "submitted")
      .map((p) => ({ ...p, client: db.users.find((u) => u.id === p.client_id) || null }))
      .sort((a, b) => (a.submitted_at < b.submitted_at ? 1 : -1));
  }
  const { data } = await supabase
    .from("weekly_meal_plans")
    .select("*, client:client_id ( id, name )")
    .eq("group_id", groupId)
    .eq("status", "submitted")
    .order("submitted_at", { ascending: false });
  return data || [];
}

/** Coach review detail: client + plan + day/meal/ingredient tree with macro totals. */
export async function getPlanDetail(planId) {
  const supabase = getSupabaseClient();
  let plan = null;
  let client = null;

  if (!supabase) {
    const db = readDb();
    plan = db.weekly_meal_plans.find((p) => p.id === planId) || null;
    if (!plan) return null;
    client = db.users.find((u) => u.id === plan.client_id) || null;
  } else {
    const { data } = await supabase
      .from("weekly_meal_plans")
      .select("*, client:client_id ( id, name )")
      .eq("id", planId)
      .maybeSingle();
    if (!data) return null;
    plan = data;
    client = data.client || null;
  }

  const builder = await getPlanBuilder(plan);
  return {
    ...plan,
    client,
    days: builder.days.filter((d) => d.meals.length),
    weekTotals: builder.weekTotals,
    mealCount: builder.mealCount,
  };
}

export async function setPlanStatus(planId, status) {
  const supabase = getSupabaseClient();
  const patch = { status };
  if (status === "approved") patch.approved_at = nowIso();
  if (!supabase) {
    const db = readDb();
    const plan = db.weekly_meal_plans.find((p) => p.id === planId);
    if (!plan) return { data: null, error: { message: "Plan not found." } };
    Object.assign(plan, patch);
    writeDb(db);
    return { data: plan, error: null };
  }
  const { data, error } = await supabase
    .from("weekly_meal_plans")
    .update(patch)
    .eq("id", planId)
    .select("*")
    .single();
  return { data, error };
}

/* ----------------------------------------------------------------------------
 * Daily check-ins
 * ------------------------------------------------------------------------- */

/**
 * Everything the check-in screen needs for today: the active plan, the meals
 * planned for today (with macro totals), and any existing check-in + statuses.
 */
export async function getTodaysCheckinContext(clientId, dateIso = todayIso()) {
  const plan = await getActivePlan(clientId);
  if (!plan) return { plan: null, meals: [], checkIn: null, records: {} };

  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    const meals = db.meals
      .filter((m) => m.plan_id === plan.id && m.date === dateIso)
      .sort((a, b) => (a.position || 0) - (b.position || 0))
      .map((m) => ({ ...m, totals: sumMacros(db.ingredients.filter((i) => i.meal_id === m.id)) }));
    const checkIn =
      db.daily_check_ins.find((c) => c.client_id === clientId && c.date === dateIso) || null;
    const records = {};
    if (checkIn) {
      db.meal_adherence_records
        .filter((r) => r.check_in_id === checkIn.id)
        .forEach((r) => {
          records[r.meal_id] = r;
        });
    }
    return { plan, meals, checkIn, records };
  }

  const { data: meals } = await supabase
    .from("meals")
    .select("id, name, type, position, ingredients ( calories, protein, carbs, fat ), day_plans!inner ( date, plan_id )")
    .eq("day_plans.plan_id", plan.id)
    .eq("day_plans.date", dateIso)
    .order("position", { ascending: true });
  const shaped = (meals || []).map((m) => ({
    id: m.id,
    name: m.name,
    type: m.type,
    position: m.position,
    totals: sumMacros(m.ingredients || []),
  }));
  const { data: checkIn } = await supabase
    .from("daily_check_ins")
    .select("*")
    .eq("client_id", clientId)
    .eq("date", dateIso)
    .maybeSingle();
  const records = {};
  if (checkIn) {
    const { data: mars } = await supabase
      .from("meal_adherence_records")
      .select("*")
      .eq("check_in_id", checkIn.id);
    (mars || []).forEach((r) => {
      records[r.meal_id] = r;
    });
  }
  return { plan, meals: shaped, checkIn: checkIn || null, records };
}

/**
 * Persist a complete check-in: upserts the daily_check_ins row then one
 * meal_adherence_records row per marked meal.
 * `marks` is an array of { mealId, status, deviationType, notes }.
 */
export async function submitCheckin({ clientId, planId, dateIso = todayIso(), marks }) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const db = readDb();
    let checkIn = db.daily_check_ins.find(
      (c) => c.client_id === clientId && c.date === dateIso
    );
    if (!checkIn) {
      checkIn = { id: uuid(), client_id: clientId, plan_id: planId, date: dateIso };
      db.daily_check_ins.push(checkIn);
    }
    checkIn.status = "submitted";
    checkIn.submitted_at = nowIso();
    db.meal_adherence_records = db.meal_adherence_records.filter(
      (r) => r.check_in_id !== checkIn.id
    );
    marks.forEach((mark) => {
      db.meal_adherence_records.push({
        id: uuid(),
        check_in_id: checkIn.id,
        meal_id: mark.mealId,
        status: mark.status,
        deviation_type: mark.deviationType || null,
        notes: mark.notes || null,
      });
    });
    writeDb(db);
    return { data: checkIn, error: null };
  }

  const { data: checkIn, error: checkInError } = await supabase
    .from("daily_check_ins")
    .upsert(
      {
        client_id: clientId,
        plan_id: planId,
        date: dateIso,
        status: "submitted",
        submitted_at: nowIso(),
      },
      { onConflict: "client_id,date" }
    )
    .select("*")
    .single();
  if (checkInError) return { data: null, error: checkInError };

  const rows = marks.map((mark) => ({
    check_in_id: checkIn.id,
    meal_id: mark.mealId,
    status: mark.status,
    deviation_type: mark.deviationType || null,
    notes: mark.notes || null,
  }));
  const { error: marError } = await supabase
    .from("meal_adherence_records")
    .upsert(rows, { onConflict: "check_in_id,meal_id" });
  return { data: checkIn, error: marError || null };
}

/* ----------------------------------------------------------------------------
 * Coach digest
 * ------------------------------------------------------------------------- */

/**
 * Returns today's adherence summary for a group, bucketed for the digest:
 * { counts: {followed, deviated, missed}, breakdown, attention: [...], onTrack: [...] }
 * Each client row: { id, name, status: 'followed'|'deviated'|'missed', summary }
 */
export async function getDigest(groupId, dateIso = todayIso()) {
  const members = await getGroupMembers(groupId);
  const supabase = getSupabaseClient();

  let checkInsByClient = new Map();
  if (!supabase) {
    const db = readDb();
    members.forEach((member) => {
      const checkIn = db.daily_check_ins.find(
        (c) => c.client_id === member.id && c.date === dateIso
      );
      const records = checkIn
        ? db.meal_adherence_records.filter((r) => r.check_in_id === checkIn.id)
        : [];
      checkInsByClient.set(member.id, { checkIn, records });
    });
  } else {
    const memberIds = members.map((m) => m.id);
    const { data: checkIns } = await supabase
      .from("daily_check_ins")
      .select("*, meal_adherence_records ( status, deviation_type )")
      .in("client_id", memberIds.length ? memberIds : ["00000000-0000-0000-0000-000000000000"])
      .eq("date", dateIso);
    (checkIns || []).forEach((c) => {
      checkInsByClient.set(c.client_id, {
        checkIn: c,
        records: c.meal_adherence_records || [],
      });
    });
  }

  const attention = [];
  const onTrack = [];
  const counts = { followed: 0, deviated: 0, missed: 0 };
  const breakdown = { followed: 0, modified: 0, skipped: 0 };

  members.forEach((member) => {
    const entry = checkInsByClient.get(member.id);
    const checkIn = entry?.checkIn;
    const records = entry?.records || [];

    if (!checkIn || checkIn.status !== "submitted") {
      counts.missed += 1;
      attention.push({ id: member.id, name: member.name, status: "missed", summary: "No check-in submitted" });
      return;
    }

    records.forEach((r) => {
      if (r.status === "followed") breakdown.followed += 1;
      else if (r.status === "modified") breakdown.modified += 1;
      else if (r.status === "skipped") breakdown.skipped += 1;
    });

    const deviations = records.filter((r) => r.status === "modified" || r.status === "skipped");
    if (deviations.length > 0) {
      counts.deviated += 1;
      const skipped = records.filter((r) => r.status === "skipped").length;
      const modified = records.filter((r) => r.status === "modified").length;
      const parts = [];
      if (skipped) parts.push(`${skipped} skipped`);
      if (modified) parts.push(`${modified} modified`);
      attention.push({ id: member.id, name: member.name, status: "deviated", summary: parts.join(", ") });
    } else {
      counts.followed += 1;
      onTrack.push({ id: member.id, name: member.name, status: "followed", summary: "All meals followed" });
    }
  });

  return { counts, breakdown, attention, onTrack, totalMembers: members.length };
}

/* ----------------------------------------------------------------------------
 * Coach roster & client check-in detail
 * ------------------------------------------------------------------------- */

const ROSTER_SORT = { plan_review: 0, missed: 1, deviated: 2, followed: 3 };

/**
 * Group member rows for coach surfaces — sorted by attention (plan queue first).
 * Each row: { id, name, email, href, sub, pill, pillClass, kind }
 */
export async function getGroupRoster(groupId, dateIso = todayIso()) {
  const members = await getGroupMembers(groupId);
  const submittedPlans = await getSubmittedPlans(groupId);
  const planByClient = new Map(submittedPlans.map((p) => [p.client_id, p]));
  const { attention, onTrack } = await getDigest(groupId, dateIso);
  const digestByClient = new Map();
  [...attention, ...onTrack].forEach((row) => digestByClient.set(row.id, row));

  const roster = members.map((member) => {
    const plan = planByClient.get(member.id);
    if (plan) {
      return {
        ...member,
        kind: "plan_review",
        href: `/app/coach/plan-review.html?plan=${encodeURIComponent(plan.id)}`,
        sub: "Plan submitted — review needed",
        pill: "Review",
        pillClass: "is-tint",
        sort: ROSTER_SORT.plan_review,
      };
    }
    const digestRow = digestByClient.get(member.id);
    const status = digestRow?.status || "missed";
    const pillByStatus = {
      followed: { pill: "Followed", pillClass: "is-green" },
      deviated: { pill: "Deviated", pillClass: "is-orange" },
      missed: { pill: "Missed", pillClass: "is-red" },
    };
    const { pill, pillClass } = pillByStatus[status] || pillByStatus.missed;
    return {
      ...member,
      kind: "check_in",
      href: `/app/coach/checkin.html?client=${encodeURIComponent(member.id)}&from=group`,
      sub: digestRow?.summary || "No check-in submitted",
      pill,
      pillClass,
      sort: ROSTER_SORT[status] ?? ROSTER_SORT.missed,
    };
  });

  roster.sort(
    (a, b) =>
      a.sort - b.sort ||
      String(a.name || "").localeCompare(String(b.name || ""))
  );
  return roster;
}

/** Coach read-only view of a client's check-in for one day. */
export async function getCoachCheckinDetail(clientId, dateIso = todayIso()) {
  const { plan, meals, checkIn, records } = await getTodaysCheckinContext(clientId, dateIso);
  const supabase = getSupabaseClient();
  let client = null;
  if (!supabase) {
    const db = readDb();
    client = db.users.find((u) => u.id === clientId) || null;
  } else {
    const { data } = await supabase
      .from("users")
      .select("id, name, email")
      .eq("id", clientId)
      .maybeSingle();
    client = data;
  }

  const mealRows = (meals || []).map((meal) => {
    const adherence = records[meal.id] || null;
    return { ...meal, adherence };
  });

  return { client, plan, checkIn, meals: mealRows, dateIso };
}

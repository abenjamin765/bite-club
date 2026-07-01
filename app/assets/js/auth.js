import { getSupabaseClient } from "/app/assets/js/supabase.js";

async function readStoredSession() {
  const serialized = localStorage.getItem("demo.session");
  if (!serialized) {
    return null;
  }

  try {
    return JSON.parse(serialized);
  } catch {
    return null;
  }
}

function writeStoredSession(session) {
  localStorage.setItem("demo.session", JSON.stringify(session));
}

export async function getSession() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return readStoredSession();
  }

  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signUp(email, password, { name = "", role = "client" } = {}) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const fake = { user: { id: crypto.randomUUID(), email } };
    writeStoredSession(fake);
    return { data: { session: fake }, error: null };
  }
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/app/auth/callback.html`,
      data: { name, role },
    },
  });
}

export async function signIn(email, password) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const fake = { user: { id: crypto.randomUUID(), email } };
    writeStoredSession(fake);
    return { data: { session: fake }, error: null };
  }
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = getSupabaseClient();
  localStorage.removeItem("demo.session");
  localStorage.removeItem("demo.role");
  if (!supabase) {
    return;
  }
  await supabase.auth.signOut();
}

/**
 * Upsert public.users from an auth session. On sign-in, pass role=null so an
 * existing role is preserved (the hidden signup role field defaults to client).
 */
export async function syncUserProfile(session, { email, name, role = null } = {}) {
  const user = session?.user;
  if (!user) return;

  const meta = user.user_metadata || {};
  const resolvedEmail = email || user.email || "";
  const supabase = getSupabaseClient();

  if (!supabase) {
    if (role) localStorage.setItem("demo.role", role);
    return;
  }

  let resolvedRole = role || meta.role || null;
  let resolvedName = name || meta.name || "";

  if (!resolvedRole || !resolvedName) {
    const { data: existing } = await supabase
      .from("users")
      .select("role, name")
      .eq("id", user.id)
      .maybeSingle();
    if (!resolvedRole) resolvedRole = existing?.role || "client";
    if (!resolvedName) resolvedName = existing?.name || resolvedEmail.split("@")[0] || "User";
  }

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: resolvedEmail,
      name: resolvedName,
      role: resolvedRole,
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    },
    { onConflict: "id" }
  );
}

export async function getProfile(userId) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      id: userId,
      role: localStorage.getItem("demo.role") || "client",
      name: "Demo User",
    };
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, role, name")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }
  return data;
}

export async function requireAuth(role) {
  const session = await getSession();
  if (!session) {
    window.location.replace("/app/auth/index.html");
    return null;
  }

  if (!role) {
    return session;
  }

  const profile = await getProfile(session.user.id);
  if (!profile || profile.role !== role) {
    window.location.replace("/app/index.html");
    return null;
  }

  return session;
}

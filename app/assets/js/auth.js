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

export async function signUp(email, password) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const fake = { user: { id: crypto.randomUUID(), email } };
    writeStoredSession(fake);
    return { data: { session: fake }, error: null };
  }
  return supabase.auth.signUp({ email, password });
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

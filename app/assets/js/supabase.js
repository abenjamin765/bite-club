import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import projectConfig from "./supabase-config.js";

function readFromMeta(name) {
  const element = document.querySelector(`meta[name="${name}"]`);
  return element?.content?.trim() || "";
}

function readSupabaseConfig() {
  const fromWindow = window.__SUPABASE_CONFIG || {};
  const url =
    fromWindow.url ||
    readFromMeta("supabase-url") ||
    localStorage.getItem("supabase.url") ||
    projectConfig.url ||
    "";
  const key =
    fromWindow.anonKey ||
    readFromMeta("supabase-anon-key") ||
    localStorage.getItem("supabase.anonKey") ||
    projectConfig.anonKey ||
    "";
  return { url, key };
}

let client = null;

export function getSupabaseClient() {
  if (client) {
    return client;
  }

  const { url, key } = readSupabaseConfig();
  if (!url || !key) {
    return null;
  }

  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}

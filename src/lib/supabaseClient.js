import { createClient } from "@supabase/supabase-js";

// Environment variables'ı al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Validation
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Initialize client immediately but ensure proper module initialization order
// Using function to avoid TDZ (Temporal Dead Zone) issues in production builds
function initializeSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = initializeSupabase();

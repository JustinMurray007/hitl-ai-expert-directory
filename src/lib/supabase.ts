import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project')
);

export const isSupabaseServiceConfigured = Boolean(
  isSupabaseConfigured && supabaseServiceRoleKey
);

// Anonymous public client (RLS enforced)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Server-side service-role client (Admin / Private writes only)
export const getServiceSupabase = () => {
  if (!isSupabaseServiceConfigured) return null;
  return createClient(supabaseUrl!, supabaseServiceRoleKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

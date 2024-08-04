import { SupabaseAuthentication } from './authentication';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const initSupabaseAuth = () => {
  const supabaseAuth: SupabaseAuthentication = new SupabaseAuthentication(
    supabaseUrl as string,
    supabaseKey as string
  );

  return supabaseAuth;
};

let supabaseAuthSingleton: SupabaseAuthentication;

export const getSupabaseAuthSingleton = () => {
  if (!supabaseAuthSingleton) {
    supabaseAuthSingleton = initSupabaseAuth();
  }
  return supabaseAuthSingleton;
};

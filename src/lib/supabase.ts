import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// For development without Supabase, we'll use placeholder values
if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('⚠️ Using placeholder Supabase credentials. Please configure your .env file with real Supabase credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

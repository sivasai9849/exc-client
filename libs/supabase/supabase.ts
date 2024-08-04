import { createClient } from '@supabase/supabase-js';

class Supabase {
  protected supabaseClient;
  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
}

export { Supabase };

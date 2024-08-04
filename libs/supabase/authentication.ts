import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

import { Supabase } from './supabase';

export class SupabaseAuthentication extends Supabase {
  protected supabaseAuth: SupabaseAuthClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    super(supabaseUrl, supabaseKey);
    this.supabaseAuth = this.supabaseClient.auth;
  }

  get currentUser() {
    return this.supabaseAuth.getSession();
  }

  reloadUser() {
    this.supabaseAuth.refreshSession();
  }

  onAuthStateChanged(callback: (user: User | null) => Promise<void>) {
    return this.supabaseAuth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        callback(session?.user || null);
      }
    );
  }

  onIdTokenChanged(callback: (user: User | null) => Promise<void>) {
    return this.supabaseAuth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        callback(session?.user || null);
      }
    );
  }

  signOut() {
    return this.supabaseAuth.signOut();
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.supabaseAuth.signInWithPassword({ email, password });
  }
}

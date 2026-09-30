import { supabase } from '../config/supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export const authApi = {
  signIn: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) throw new Error(error.message);
  },

  signUp: async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { data: { name: name.trim() } },
    });
    if (error) throw new Error(error.message);
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  getUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange: (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  resetPassword: async (email: string, redirectTo?: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      redirectTo ? { redirectTo } : undefined,
    );
    if (error) throw new Error(error.message);
  },

  setNewPassword: async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
  },

  updateProfile: async (name: string) => {
    const { data, error } = await supabase.auth.updateUser({ data: { name: name.trim() } });
    if (error) throw new Error(error.message);
    return data.user;
  },

  updatePassword: async (email: string, currentPassword: string, newPassword: string) => {
    const { error: verifyErr } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });
    if (verifyErr) throw new Error('Current password is incorrect.');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw new Error(error.message);
  },
};

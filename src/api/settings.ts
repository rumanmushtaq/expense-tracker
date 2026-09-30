import { supabase } from '../config/supabase';
import type { UserSettings } from '../types';

const defaults: UserSettings = {
  emailAddress: '',
  currency: 'PKR',
  monthlyBudget: 50000,
  emailNotifications: false,
};

export const settingsApi = {
  get: async (userId: string): Promise<UserSettings> => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return (data as UserSettings) ?? defaults;
  },

  save: async (settings: UserSettings, userId: string): Promise<UserSettings> => {
    const { error } = await supabase
      .from('settings')
      .upsert({ ...settings, user_id: userId }, { onConflict: 'user_id' });
    if (error) throw new Error(error.message);
    return settings;
  },
};

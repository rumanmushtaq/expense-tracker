import { supabase } from '../config/supabase';
import type { Expense } from '../types';

export const expensesApi = {
  getAll: async (userId: string): Promise<Expense[]> => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    if (error) throw new Error(error.message);
    return (data as Expense[]) ?? [];
  },

  create: async (expense: Expense, userId: string): Promise<Expense> => {
    const { data, error } = await supabase
      .from('expenses')
      .insert({ ...expense, user_id: userId })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Expense;
  },

  remove: async (id: string): Promise<void> => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};

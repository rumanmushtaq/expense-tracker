import { supabase } from '../config/supabase';
import type { Expense, NewExpense } from '../types';

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

  create: async (expense: NewExpense, userId: string): Promise<Expense> => {
    const { data, error } = await supabase
      .from('expenses')
      .insert({ ...expense, user_id: userId })
      .select()
      .single();
    if (error) {
      console.error('[expensesApi.create]', error);
      throw new Error(error.message || error.details || 'Insert failed');
    }
    return data as Expense;
  },

  getByDateRange: async (userId: string, from: string, to: string): Promise<Expense[]> => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .gte('date', from)
      .lte('date', to)
      .order('date', { ascending: true });
    if (error) throw new Error(error.message);
    return (data as Expense[]) ?? [];
  },

  remove: async (id: string): Promise<void> => {
    const { error } = await supabase.from('expenses').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};

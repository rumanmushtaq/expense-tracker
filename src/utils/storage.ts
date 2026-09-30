import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, UserSettings } from '../types';

const EXPENSES_KEY = '@expenses';
const SETTINGS_KEY = '@settings';

// ─── Expenses ───────────────────────────────────────────────
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveExpense = async (expense: Expense): Promise<void> => {
  const expenses = await getExpenses();
  expenses.unshift(expense);
  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

export const deleteExpense = async (id: string): Promise<void> => {
  const expenses = await getExpenses();
  const filtered = expenses?.filter((e) => e.id !== id) ?? [];
  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filtered));
};

export const getExpensesByMonth = async (year: number, month: number): Promise<Expense[]> => {
  const expenses = await getExpenses();
  return expenses?.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
};

// ─── Settings ───────────────────────────────────────────────
export const defaultSettings: UserSettings = {
  emailAddress: '',
  currency: 'PKR',
  monthlyBudget: 50000,
  emailNotifications: true,
};

export const getSettings = async (): Promise<UserSettings> => {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = async (settings: UserSettings): Promise<void> => {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

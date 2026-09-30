import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Expense, UserSettings } from '../types';
import { authApi } from '../api/auth';
import { expensesApi } from '../api/expenses';
import { settingsApi } from '../api/settings';
import { isCurrentMonth, isToday, sumAmounts } from '../utils/expenseFilters';

export const defaultSettings: UserSettings = {
  emailAddress: '',
  currency: 'PKR',
  monthlyBudget: 50000,
  emailNotifications: false,
};

interface ExpenseContextType {
  expenses: Expense[];
  settings: UserSettings;
  loading: boolean;
  addExpense: (expense: Expense) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  updateSettings: (settings: UserSettings) => Promise<void>;
  refreshExpenses: () => Promise<void>;
  currentMonthTotal: number;
  todayTotal: number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = authApi.onAuthStateChange((_event, session) => {
      const id = session?.user?.id ?? null;
      setUserId(id);
      if (!id) {
        setExpenses([]);
        setSettings(defaultSettings);
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadData = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const [loadedExpenses, loadedSettings] = await Promise.all([
        expensesApi.getAll(uid),
        settingsApi.get(uid),
      ]);
      setExpenses(loadedExpenses);
      setSettings(loadedSettings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) loadData(userId);
  }, [userId, loadData]);

  const addExpense = async (expense: Expense) => {
    if (!userId) return;
    const created = await expensesApi.create(expense, userId);
    setExpenses((prev) => [created, ...prev]);
  };

  const removeExpense = async (id: string) => {
    await expensesApi.remove(id);
    setExpenses((prev) => prev?.filter((e) => e.id !== id));
  };

  const updateSettings = async (newSettings: UserSettings) => {
    if (!userId) return;
    await settingsApi.save(newSettings, userId);
    setSettings(newSettings);
  };

  const refreshExpenses = async () => {
    if (!userId) return;
    const loaded = await expensesApi.getAll(userId);
    setExpenses(loaded);
  };

  const now = new Date();
  const currentMonthTotal = sumAmounts(expenses?.filter((e) => isCurrentMonth(e.date, now)) ?? []);
  const todayTotal = sumAmounts(expenses?.filter((e) => isToday(e.date, now)) ?? []);

  return (
    <ExpenseContext.Provider
      value={{ expenses, settings, loading, addExpense, removeExpense, updateSettings, refreshExpenses, currentMonthTotal, todayTotal }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider');
  return ctx;
};

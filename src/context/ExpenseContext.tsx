import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Expense, UserSettings } from '../types';
import {
  getExpenses,
  saveExpense as saveExpenseToStorage,
  deleteExpense as deleteExpenseFromStorage,
  getSettings,
  saveSettings as saveSettingsToStorage,
  defaultSettings,
} from '../utils/storage';

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
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [loadedExpenses, loadedSettings] = await Promise.all([getExpenses(), getSettings()]);
    setExpenses(loadedExpenses);
    setSettings(loadedSettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addExpense = async (expense: Expense) => {
    await saveExpenseToStorage(expense);
    setExpenses((prev) => [expense, ...prev]);
  };

  const removeExpense = async (id: string) => {
    await deleteExpenseFromStorage(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateSettings = async (newSettings: UserSettings) => {
    await saveSettingsToStorage(newSettings);
    setSettings(newSettings);
  };

  const refreshExpenses = async () => {
    const loaded = await getExpenses();
    setExpenses(loaded);
  };

  const now = new Date();
  const currentMonthTotal = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const todayTotal = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        settings,
        loading,
        addExpense,
        removeExpense,
        updateSettings,
        refreshExpenses,
        currentMonthTotal,
        todayTotal,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

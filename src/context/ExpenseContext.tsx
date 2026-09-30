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
import { isCurrentMonth, isToday, sumAmounts } from '../utils/expenseFilters';

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
  const currentMonthTotal = sumAmounts(expenses.filter((e) => isCurrentMonth(e.date, now)));
  const todayTotal = sumAmounts(expenses.filter((e) => isToday(e.date, now)));

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

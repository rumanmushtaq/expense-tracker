import { create } from 'zustand';
import { format } from 'date-fns';
import { Expense, NewExpense, UserSettings } from '../types';
import { authApi } from '../api/auth';
import { expensesApi } from '../api/expenses';
import { settingsApi } from '../api/settings';
import { isToday, sumAmounts } from '../utils/expenseFilters';

export const defaultSettings: UserSettings = {
  emailAddress: '',
  currency: 'PKR',
  monthlyBudget: 50000,
  emailNotifications: false,
};

interface ExpenseState {
  expenses: Expense[];
  historyExpenses: Expense[];
  settings: UserSettings;
  loading: boolean;
  userId: string | null;
  addExpense: (expense: NewExpense) => Promise<void>;
  removeExpense: (id: string) => Promise<void>;
  updateSettings: (settings: UserSettings) => Promise<void>;
  refreshExpenses: () => Promise<void>;
  fetchHistoryExpenses: (year: number, month: number) => Promise<void>;
  currentMonthTotal: number;
  todayTotal: number;
}

export const useExpenses = create<ExpenseState>((set, get) => ({
  expenses: [],
  historyExpenses: [],
  settings: defaultSettings,
  loading: true,
  userId: null,
  currentMonthTotal: 0,
  todayTotal: 0,

  addExpense: async (expense: NewExpense) => {
    const { userId } = get();
    if (!userId) throw new Error('Not authenticated.');
    await expensesApi.create(expense, userId);
    get().refreshExpenses();
  },

  removeExpense: async (id: string) => {
    await expensesApi.remove(id);
    get().refreshExpenses();
  },

  updateSettings: async (newSettings: UserSettings) => {
    const { userId } = get();
    if (!userId) return;
    await settingsApi.save(newSettings, userId);
    set({ settings: newSettings });
  },

  refreshExpenses: async () => {
    const { userId } = get();
    if (!userId) return;
    set({ loading: true });
    
    try {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      
      const loadedExpenses = await expensesApi.getByDateRange(
        userId, 
        format(start, 'yyyy-MM-dd'), 
        format(end, 'yyyy-MM-dd')
      );
      const loadedSettings = await settingsApi.get(userId);
      
      const currentMonthTotal = sumAmounts(loadedExpenses);
      const todayTotal = sumAmounts(loadedExpenses.filter(e => isToday(e.date, now)));

      set({ 
        expenses: loadedExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), 
        settings: loadedSettings,
        currentMonthTotal,
        todayTotal,
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchHistoryExpenses: async (year: number, month: number) => {
    const { userId } = get();
    if (!userId) return;
    set({ loading: true });
    try {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
      
      const loadedHistory = await expensesApi.getByDateRange(
        userId, 
        format(start, 'yyyy-MM-dd'), 
        format(end, 'yyyy-MM-dd')
      );
      set({ 
        historyExpenses: loadedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
      });
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      set({ loading: false });
    }
  }
}));

authApi.getSession().then((session) => {
  const id = session?.user?.id ?? null;
  useExpenses.setState({ userId: id });
  if (id) {
    useExpenses.getState().refreshExpenses();
  } else {
    useExpenses.setState({ loading: false });
  }
});

authApi.onAuthStateChange((_event, session) => {
  const id = session?.user?.id ?? null;
  useExpenses.setState({ userId: id });
  if (id) {
    useExpenses.getState().refreshExpenses();
  } else {
    useExpenses.setState({ 
      expenses: [], 
      settings: defaultSettings, 
      loading: false,
      currentMonthTotal: 0,
      todayTotal: 0
    });
  }
});

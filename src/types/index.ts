export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO string
  note?: string;
}

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'bills'
  | 'entertainment'
  | 'health'
  | 'education'
  | 'other';

export interface CategoryInfo {
  key: ExpenseCategory;
  label: string;
  icon: string;
  color: string;
}

export interface MonthlyReport {
  month: string; // YYYY-MM
  totalExpense: number;
  expenses: Expense[];
  categoryBreakdown: Record<ExpenseCategory, number>;
}

export interface UserSettings {
  emailAddress: string;
  currency: string;
  monthlyBudget: number;
  emailNotifications: boolean;
}

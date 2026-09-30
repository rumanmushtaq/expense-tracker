import type { Expense } from './index';

export interface RecentExpensesProps {
  expenses: Expense[];
  currency: string;
  onDelete: (id: string) => void;
  onSeeAll: () => void;
}

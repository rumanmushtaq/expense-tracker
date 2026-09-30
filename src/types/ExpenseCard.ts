import type { Expense } from './index';

export interface Props {
  expense: Expense;
  currency: string;
  onDelete?: (id: string) => void;
  index?: number;
}

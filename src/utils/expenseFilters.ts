import { Expense } from '../types';

export function isCurrentMonth(dateStr: string, now: Date): boolean {
  const d = new Date(dateStr);
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

export function isToday(dateStr: string, now: Date): boolean {
  const d = new Date(dateStr);
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function sumAmounts(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function parsePositiveFloat(value: string): number | null {
  const parsed = parseFloat(value);
  if (!value || isNaN(parsed) || parsed <= 0) return null;
  return parsed;
}

import { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { isCurrentMonth } from '../utils/expenseFilters';
import { getCategoryInfo } from '../constants/categories';
import { Colors } from '../constants/theme';

export function useDashboard() {
  const { expenses, settings, currentMonthTotal, todayTotal, removeExpense } = useExpenses();

  const now = new Date();
  const budgetLeft = settings.monthlyBudget - currentMonthTotal;
  const budgetPercent = Math.min((currentMonthTotal / settings.monthlyBudget) * 100, 100);
  const budgetColor =
    budgetPercent > 90 ? Colors.danger : budgetPercent > 70 ? Colors.warning : Colors.success;

  const currentMonthExpenses = useMemo(
    () => expenses?.filter((e) => isCurrentMonth(e.date, now)),
    [expenses]
  );

  const recentExpenses = useMemo(() => currentMonthExpenses?.slice(0, 5), [currentMonthExpenses]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    currentMonthExpenses?.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals)
      ?.map(([key, amount]) => ({ ...getCategoryInfo(key), amount }))
      ?.sort((a, b) => b.amount - a.amount);
  }, [currentMonthExpenses]);

  return {
    settings,
    currentMonthTotal,
    todayTotal,
    budgetLeft,
    budgetPercent,
    budgetColor,
    recentExpenses,
    categoryTotals,
    removeExpense,
    now,
  };
}

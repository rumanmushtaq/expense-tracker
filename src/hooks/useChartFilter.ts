import { useState, useEffect, useCallback } from 'react';
import {
  startOfWeek, endOfWeek,
  startOfMonth, endOfMonth,
  subDays, format,
  eachDayOfInterval, isSameDay,
} from 'date-fns';
import { expensesApi } from '../api/expenses';
import { authApi } from '../api/auth';
import { useExpenses } from '../context/ExpenseContext';
import type { Expense, ChartFilter, ChartDataPoint } from '../types';

function getDateRange(filter: ChartFilter, now: Date): { from: Date; to: Date } {
  switch (filter) {
    case 'week':
      return {
        from: startOfWeek(now, { weekStartsOn: 1 }),
        to: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case 'month':
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case '7days':
      return { from: subDays(now, 6), to: now };
    case '30days':
      return { from: subDays(now, 29), to: now };
  }
}

function buildChartData(
  expenses: Expense[],
  from: Date,
  to: Date,
  filter: ChartFilter,
): ChartDataPoint[] {
  const today = new Date();
  return eachDayOfInterval({ start: from, end: to }).map((day) => ({
    label:
      filter === 'week' || filter === '7days'
        ? format(day, 'EEE')[0]
        : format(day, 'd'),
    total:
      expenses
        ?.filter((e) => isSameDay(new Date(e.date), day))
        ?.reduce((sum, e) => sum + e.amount, 0) ?? 0,
    isToday: isSameDay(day, today),
  }));
}

export function useChartFilter() {
  const { expenses } = useExpenses();
  const [filter, setFilter] = useState<ChartFilter>('week');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async (selectedFilter: ChartFilter) => {
    const session = await authApi.getSession();
    const userId = session?.user?.id;
    if (!userId) return;

    setLoading(true);
    try {
      const now = new Date();
      const { from, to } = getDateRange(selectedFilter, now);
      const data = await expensesApi.getByDateRange(
        userId,
        format(from, 'yyyy-MM-dd'),
        format(to, 'yyyy-MM-dd'),
      );
      setChartData(buildChartData(data, from, to, selectedFilter));
    } catch (e) {
      console.error('[useChartFilter]', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(filter);
  }, [filter, loadData, expenses.length]);

  const maxValue = Math.max(...(chartData?.map((d) => d.total) ?? []), 1);

  return { filter, setFilter, chartData, maxValue, loading };
}

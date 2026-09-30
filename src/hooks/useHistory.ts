import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { sumAmounts } from '../utils/expenseFilters';
import { sendMonthlyReportEmail } from '../utils/notifications';

export function useHistory() {
  const { expenses, settings, removeExpense } = useExpenses();

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((e) => {
        const d = new Date(e.date);
        return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
      }),
    [expenses, selectedYear, selectedMonth]
  );

  const monthTotal = sumAmounts(filteredExpenses);
  const avgPerDay =
    filteredExpenses.length > 0
      ? monthTotal / new Date(selectedYear, selectedMonth + 1, 0).getDate()
      : 0;

  const goToPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Expense', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeExpense(id) },
    ]);
  };

  const handleSendReport = async () => {
    try {
      await sendMonthlyReportEmail();
    } catch {
      Alert.alert('Error', 'Could not open email composer.');
    }
  };

  return {
    filteredExpenses,
    settings,
    selectedYear,
    selectedMonth,
    monthTotal,
    avgPerDay,
    goToPrevMonth,
    goToNextMonth,
    handleDelete,
    handleSendReport,
  };
}

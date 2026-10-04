import { useState, useEffect, useCallback } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { sumAmounts } from '../utils/expenseFilters';
import { sendMonthlyReportEmail } from '../utils/notifications';
import { toast } from '../utils/toast';

export function useHistory() {
  const { settings, removeExpense, historyExpenses, fetchHistoryExpenses } = useExpenses();

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchHistoryExpenses(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, fetchHistoryExpenses]);

  const monthTotal = sumAmounts(historyExpenses);
  const avgPerDay =
    historyExpenses.length > 0
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

  const handleDelete = useCallback((id: string) => {
    setPendingDeleteId(id);
    setDeleteModalVisible(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (pendingDeleteId) {
      await removeExpense(pendingDeleteId);
      await fetchHistoryExpenses(selectedYear, selectedMonth);
    }
    setDeleteModalVisible(false);
    setPendingDeleteId(null);
  }, [pendingDeleteId, removeExpense, fetchHistoryExpenses, selectedYear, selectedMonth]);

  const dismissDeleteModal = useCallback(() => {
    setDeleteModalVisible(false);
    setPendingDeleteId(null);
  }, []);

  const handleSendReport = async () => {
    try {
      await sendMonthlyReportEmail(selectedMonth, selectedYear);
    } catch {
      toast.error('Could not open email composer.');
    }
  };

  return {
    filteredExpenses: historyExpenses,
    settings,
    selectedYear,
    selectedMonth,
    monthTotal,
    avgPerDay,
    goToPrevMonth,
    goToNextMonth,
    handleDelete,
    handleSendReport,
    deleteModalVisible,
    confirmDelete,
    dismissDeleteModal,
  };
}

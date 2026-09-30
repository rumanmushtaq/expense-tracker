import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MonthNavigator } from '../../components/MonthNavigator';
import { EmailReportButton } from '../../components/EmailReportButton';
import { ExpenseCard } from '../../components/ExpenseCard';
import { EmptyState } from '../../components/EmptyState';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Colors, Spacing } from '../../constants/theme';
import { useHistory } from '../../hooks/useHistory';

export default function HistoryScreen() {
  const {
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
    deleteModalVisible,
    confirmDelete,
    dismissDeleteModal,
  } = useHistory();

  return (
    <View className="flex-1 bg-background">
      <MonthNavigator
        year={selectedYear}
        month={selectedMonth}
        monthTotal={monthTotal}
        transactionCount={filteredExpenses.length}
        avgPerDay={avgPerDay}
        currency={settings.currency}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
      />

      <EmailReportButton onPress={handleSendReport} />

      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete Expense"
        message="This expense will be permanently removed. This action cannot be undone."
        icon="trash-outline"
        iconColor={Colors.danger}
        confirmLabel="Delete"
        confirmColor={Colors.danger}
        onConfirm={confirmDelete}
        onDismiss={dismissDeleteModal}
      />

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ExpenseCard
            expense={item}
            currency={settings.currency}
            onDelete={handleDelete}
            index={index}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-outline"
            title="No expenses this month"
            subtitle="Your expenses for this period will appear here"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
  },
});

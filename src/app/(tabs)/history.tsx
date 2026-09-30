import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MonthNavigator } from '../../components/MonthNavigator';
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

      <TouchableOpacity
        className="flex-row items-center justify-center mx-4 mb-4 py-2.5 rounded-theme-md border gap-2"
        style={{ borderColor: Colors.primary + '30', backgroundColor: Colors.primary + '08' }}
        onPress={handleSendReport}
        activeOpacity={0.7}
      >
        <Ionicons name="mail-outline" size={16} color={Colors.primary} />
        <Text className="text-primary text-sm font-bold flex-1">Send Monthly Report</Text>
        <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
      </TouchableOpacity>

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

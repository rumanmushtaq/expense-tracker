import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ExpenseCard } from '../components/ExpenseCard';
import { EmptyState } from '../components/EmptyState';
import { Colors, BorderRadius, Spacing } from '../constants/theme';
import { formatCurrency, getMonthLabel } from '../utils/helpers';
import { useHistory } from '../hooks/useHistory';

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
  } = useHistory();

  return (
    <View className="flex-1 bg-background">
      {/* Month Navigator */}
      <Animated.View entering={FadeInDown.duration(500)}>
        <LinearGradient
          colors={[Colors.primary + '15', Colors.primary + '05']}
          style={styles.monthNav}
        >
          <TouchableOpacity onPress={goToPrevMonth} className="w-10 h-10 rounded-theme-md bg-surface-light justify-center items-center border border-glass-border">
            <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <View className="items-center flex-1">
            <Text className="text-secondary text-xs font-semibold uppercase tracking-[1px]">
              {getMonthLabel(selectedYear, selectedMonth)}
            </Text>
            <Text className="text-white text-xxl font-black mt-1 tracking-[-1px]">
              {formatCurrency(monthTotal, settings.currency)}
            </Text>
            <View className="flex-row items-center mt-1.5 gap-1.5">
              <Text className="text-muted text-xs font-medium">
                {filteredExpenses.length} transactions
              </Text>
              <View className="w-[3px] h-[3px] rounded-sm bg-dim" />
              <Text className="text-muted text-xs font-medium">
                ~{formatCurrency(Math.round(avgPerDay), settings.currency)}/day
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={goToNextMonth} className="w-10 h-10 rounded-theme-md bg-surface-light justify-center items-center border border-glass-border">
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* Email Report Button */}
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

      {/* Expense List */}
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
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
  },
});

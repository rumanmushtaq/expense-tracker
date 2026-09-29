import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useExpenses } from '../context/ExpenseContext';
import { ExpenseCard } from '../components/ExpenseCard';
import { StatCard } from '../components/StatCard';
import { MonthlyChart } from '../components/MonthlyChart';
import { EmptyState } from '../components/EmptyState';
import { Colors, Spacing, FontSize } from '../constants/theme';
import { formatCurrency, getDailyTotals, getMonthLabel } from '../utils/helpers';

export default function DashboardScreen() {
  const router = useRouter();
  const { expenses, settings, currentMonthTotal, todayTotal, removeExpense } = useExpenses();

  const now = new Date();
  const budgetLeft = settings.monthlyBudget - currentMonthTotal;
  const budgetPercent = Math.min((currentMonthTotal / settings.monthlyBudget) * 100, 100);

  const recentExpenses = useMemo(() => {
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      })
      .slice(0, 5);
  }, [expenses]);

  const dailyTotals = useMemo(() => {
    const monthExpenses = expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
    return getDailyTotals(monthExpenses, now.getFullYear(), now.getMonth());
  }, [expenses]);

  const maxDaily = Math.max(...dailyTotals.map((d) => d.total), 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Month & Budget Header */}
      <View style={styles.header}>
        <Text style={styles.monthLabel}>{getMonthLabel(now.getFullYear(), now.getMonth())}</Text>
        <Text style={styles.totalAmount}>{formatCurrency(currentMonthTotal, settings.currency)}</Text>
        <Text style={styles.totalLabel}>spent this month</Text>

        {/* Budget Progress */}
        <View style={styles.budgetBar}>
          <View
            style={[
              styles.budgetFill,
              {
                width: `${budgetPercent}%`,
                backgroundColor: budgetPercent > 90 ? Colors.danger : budgetPercent > 70 ? Colors.warning : Colors.success,
              },
            ]}
          />
        </View>
        <Text style={styles.budgetText}>
          {budgetLeft >= 0
            ? `${formatCurrency(budgetLeft, settings.currency)} left of ${formatCurrency(settings.monthlyBudget, settings.currency)} budget`
            : `Over budget by ${formatCurrency(Math.abs(budgetLeft), settings.currency)}`}
        </Text>
      </View>

      {/* Stat Cards */}
      <View style={styles.statRow}>
        <StatCard
          title="Today"
          value={formatCurrency(todayTotal, settings.currency)}
          icon="today"
          color={Colors.primary}
        />
        <View style={{ width: Spacing.md }} />
        <StatCard
          title="Transactions"
          value={String(recentExpenses.length)}
          icon="swap-horizontal"
          color={Colors.success}
          subtitle="this month"
        />
      </View>

      {/* Daily Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Spending</Text>
        <View style={styles.chartCard}>
          <MonthlyChart data={dailyTotals} maxValue={maxDaily} />
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <TouchableOpacity onPress={() => router.push('/history')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              currency={settings.currency}
              onDelete={removeExpense}
            />
          ))
        ) : (
          <EmptyState
            icon="wallet-outline"
            title="No expenses yet"
            subtitle="Tap the + button to add your first expense"
          />
        )}
      </View>

      {/* Quick Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/add')}>
        <Ionicons name="add" size={28} color={Colors.text} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  monthLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  totalAmount: {
    color: Colors.text,
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    marginTop: Spacing.xs,
  },
  totalLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  budgetBar: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 3,
    marginTop: Spacing.md,
    overflow: 'hidden',
  },
  budgetFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetText: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  seeAll: {
    color: Colors.primary,
    fontSize: FontSize.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

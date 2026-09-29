import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useExpenses } from '../context/ExpenseContext';
import { ExpenseCard } from '../components/ExpenseCard';
import { StatCard } from '../components/StatCard';
import { MonthlyChart } from '../components/MonthlyChart';
import { EmptyState } from '../components/EmptyState';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { formatCurrency, getDailyTotals, getMonthLabel } from '../utils/helpers';
import { getCategoryInfo, CATEGORIES } from '../constants/categories';

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

  // Category breakdown for the donut visualization
  const categoryTotals = useMemo(() => {
    const monthExpenses = expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
    const totals: Record<string, number> = {};
    monthExpenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals)
      .map(([key, amount]) => ({ ...getCategoryInfo(key), amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  const budgetColor =
    budgetPercent > 90 ? Colors.danger : budgetPercent > 70 ? Colors.warning : Colors.success;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Hero Card with Gradient */}
      <Animated.View entering={FadeInDown.duration(600).springify()}>
        <LinearGradient
          colors={[Colors.primary + '25', Colors.primary + '08', Colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroInner}>
            <Text style={styles.monthLabel}>{getMonthLabel(now.getFullYear(), now.getMonth())}</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(currentMonthTotal, settings.currency)}
            </Text>
            <Text style={styles.totalLabel}>total spending</Text>

            {/* Premium Budget Bar */}
            <View style={styles.budgetSection}>
              <View style={styles.budgetBarBg}>
                <LinearGradient
                  colors={
                    budgetPercent > 90
                      ? (Colors.gradientDanger as unknown as readonly [string, string])
                      : budgetPercent > 70
                      ? [Colors.warning, Colors.warningDark]
                      : (Colors.gradientSuccess as unknown as readonly [string, string])
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.budgetFill, { width: `${budgetPercent}%` }]}
                />
              </View>
              <View style={styles.budgetLabels}>
                <Text style={[styles.budgetText, { color: budgetColor }]}>
                  {budgetPercent.toFixed(0)}% used
                </Text>
                <Text style={styles.budgetText}>
                  {budgetLeft >= 0
                    ? `${formatCurrency(budgetLeft, settings.currency)} left`
                    : `Over by ${formatCurrency(Math.abs(budgetLeft), settings.currency)}`}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Stat Cards Row */}
      <View style={styles.statRow}>
        <StatCard
          title="Today"
          value={formatCurrency(todayTotal, settings.currency)}
          icon="flash"
          color={Colors.primary}
          index={0}
        />
        <View style={{ width: Spacing.md }} />
        <StatCard
          title="Transactions"
          value={String(recentExpenses.length)}
          icon="swap-horizontal"
          color={Colors.success}
          subtitle="this month"
          index={1}
        />
      </View>

      {/* Category Breakdown */}
      {categoryTotals.length > 0 && (
        <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {categoryTotals.slice(0, 4).map((cat, i) => (
              <View key={cat.key} style={styles.categoryItem}>
                <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{cat.label}</Text>
                  <Text style={styles.categoryAmount}>
                    {formatCurrency(cat.amount, settings.currency)}
                  </Text>
                </View>
                <Text style={styles.categoryPercent}>
                  {((cat.amount / currentMonthTotal) * 100).toFixed(0)}%
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      )}

      {/* Daily Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Spending</Text>
        <View style={[styles.chartCard, Shadow.sm]}>
          <MonthlyChart data={dailyTotals} maxValue={maxDaily} />
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent</Text>
          <TouchableOpacity
            onPress={() => router.push('/history')}
            style={styles.seeAllBtn}
          >
            <Text style={styles.seeAll}>See All</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense, i) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              currency={settings.currency}
              onDelete={removeExpense}
              index={i}
            />
          ))
        ) : (
          <EmptyState
            icon="wallet-outline"
            title="No expenses yet"
            subtitle="Tap the + tab to add your first expense"
          />
        )}
      </View>

      <View style={{ height: 40 }} />
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
  heroCard: {
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  heroInner: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  monthLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  totalAmount: {
    color: Colors.text,
    fontSize: FontSize.hero,
    fontWeight: '900',
    marginTop: Spacing.xs,
    letterSpacing: -2,
  },
  totalLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  budgetSection: {
    width: '100%',
    marginTop: Spacing.lg,
  },
  budgetBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  budgetFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  budgetText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: '600',
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
    fontWeight: '800',
    marginBottom: Spacing.sm,
    letterSpacing: -0.3,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: Spacing.sm,
  },
  seeAll: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  categoryGrid: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    gap: 14,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  categoryName: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  categoryAmount: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
    marginTop: 1,
  },
  categoryPercent: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});

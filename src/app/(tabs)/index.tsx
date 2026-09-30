import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { ExpenseCard } from '../../components/ExpenseCard';
import { StatCard } from '../../components/StatCard';
import { MonthlyChart } from '../../components/MonthlyChart';
import { EmptyState } from '../../components/EmptyState';
import { Colors, Spacing, BorderRadius } from '../../constants/theme';
import { formatCurrency, getMonthLabel } from '../../utils/helpers';
import { useDashboard } from '../../hooks/useDashboard';
import { useChartFilter } from '../../hooks/useChartFilter';
import type { ChartFilter } from '../../types';

const CHART_FILTERS: { key: ChartFilter; label: string }[] = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: '7days', label: '7 Days' },
  { key: '30days', label: '30 Days' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const {
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
  } = useDashboard();

  const { filter, setFilter, chartData, maxValue, loading: chartLoading } = useChartFilter();

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Hero Card */}
      <Animated.View entering={FadeInDown.duration(600).springify()}>
        <LinearGradient
          colors={[Colors.primary + '25', Colors.primary + '08', Colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View className="p-6 items-center">
            <Text className="text-secondary text-xs font-semibold uppercase tracking-[1.5px]">
              {getMonthLabel(now.getFullYear(), now.getMonth())}
            </Text>
            <Text className="text-white text-hero font-black mt-1 tracking-[-2px]">
              {formatCurrency(currentMonthTotal, settings.currency)}
            </Text>
            <Text className="text-muted text-sm mt-0.5 tracking-[0.5px]">total spending</Text>

            <View className="w-full mt-6">
              <View className="w-full h-2 bg-surface-light rounded overflow-hidden">
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
                  style={{ height: '100%', width: `${budgetPercent}%`, borderRadius: 4 }}
                />
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-muted text-xs font-semibold" style={{ color: budgetColor }}>
                  {budgetPercent.toFixed(0)}% used
                </Text>
                <Text className="text-muted text-xs font-semibold">
                  {budgetLeft >= 0
                    ? `${formatCurrency(budgetLeft, settings.currency)} left`
                    : `Over by ${formatCurrency(Math.abs(budgetLeft), settings.currency)}`}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Stat Cards */}
      <View className="flex-row mb-4">
        <StatCard title="Today" value={formatCurrency(todayTotal, settings.currency)} icon="flash" color={Colors.primary} index={0} />
        <View className="w-4" />
        <StatCard title="Transactions" value={String(recentExpenses.length)} icon="swap-horizontal" color={Colors.success} subtitle="this month" index={1} />
      </View>

      {/* Category Breakdown */}
      {categoryTotals.length > 0 && (
        <Animated.View entering={FadeInUp.delay(200).duration(500)} className="mb-6">
          <Text className="text-white text-lg font-extrabold mb-2 tracking-[-0.3px]">Categories</Text>
          <View className="bg-surface rounded-theme-xl p-4 border border-glass-border gap-3.5">
            {categoryTotals?.slice(0, 4)?.map((cat) => (
              <View key={cat.key} className="flex-row items-center">
                <View className="w-2.5 h-2.5 rounded-md" style={{ backgroundColor: cat.color }} />
                <View className="flex-1 ml-4">
                  <Text className="text-secondary text-sm font-medium">{cat.label}</Text>
                  <Text className="text-white text-md font-bold mt-px">
                    {formatCurrency(cat.amount, settings.currency)}
                  </Text>
                </View>
                <Text className="text-muted text-sm font-bold">
                  {((cat.amount / currentMonthTotal) * 100).toFixed(0)}%
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      )}

      {/* Daily Spending Chart */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white text-lg font-extrabold tracking-[-0.3px]">Daily Spending</Text>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 4 }}
          className="mb-3"
        >
          {CHART_FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-full border ${
                filter === f.key
                  ? 'bg-primary border-primary'
                  : 'bg-surface-light border-app-border'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  filter === f.key ? 'text-white font-bold' : 'text-dim'
                }`}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="bg-surface rounded-theme-xl p-4 border border-glass-border">
          {chartLoading ? (
            <View className="h-[140px] justify-center items-center">
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <MonthlyChart data={chartData} maxValue={maxValue} />
          )}
        </View>
      </View>

      {/* Recent Expenses */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white text-lg font-extrabold tracking-[-0.3px]">Recent</Text>
          <TouchableOpacity onPress={() => router.push('/history')} className="flex-row items-center gap-0.5">
            <Text className="text-primary text-sm font-bold">See All</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {recentExpenses.length > 0 ? (
          recentExpenses?.map((expense, i) => (
            <ExpenseCard key={expense.id} expense={expense} currency={settings.currency} onDelete={removeExpense} index={i} />
          ))
        ) : (
          <EmptyState icon="wallet-outline" title="No expenses yet" subtitle="Tap the + tab to add your first expense" />
        )}
      </View>

      <View className="h-10" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
});

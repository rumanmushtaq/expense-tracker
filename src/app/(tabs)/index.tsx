import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatCard } from '../../components/StatCard';
import { DashboardHeroCard } from '../../components/DashboardHeroCard';
import { CategoryBreakdown } from '../../components/CategoryBreakdown';
import { DailySpendingChart } from '../../components/DailySpendingChart';
import { RecentExpenses } from '../../components/RecentExpenses';
import { Spacing } from '../../constants/theme';
import { formatCurrency, getMonthLabel } from '../../utils/helpers';
import { useDashboard } from '../../hooks/useDashboard';
import { useChartFilter } from '../../hooks/useChartFilter';
import { useRouter } from 'expo-router';

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

  const budgetLeftLabel = budgetLeft >= 0
    ? `${formatCurrency(budgetLeft, settings.currency)} left`
    : `Over by ${formatCurrency(Math.abs(budgetLeft), settings.currency)}`;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <DashboardHeroCard
        monthLabel={getMonthLabel(now.getFullYear(), now.getMonth())}
        total={formatCurrency(currentMonthTotal, settings.currency)}
        budgetPercent={budgetPercent}
        budgetColor={budgetColor}
        budgetLeft={budgetLeft}
        budgetLeftLabel={budgetLeftLabel}
      />

      <View className="flex-row mb-4">
        <StatCard
          title="Today"
          value={formatCurrency(todayTotal, settings.currency)}
          icon="flash"
          color="#7C5CFC"
          index={0}
        />
        <View className="w-4" />
        <StatCard
          title="Transactions"
          value={String(recentExpenses.length)}
          icon="swap-horizontal"
          color="#34D399"
          subtitle="this month"
          index={1}
        />
      </View>

      <CategoryBreakdown
        categoryTotals={categoryTotals}
        total={currentMonthTotal}
        currency={settings.currency}
      />

      <DailySpendingChart
        filter={filter}
        setFilter={setFilter}
        chartData={chartData}
        maxValue={maxValue}
        loading={chartLoading}
      />

      <RecentExpenses
        expenses={recentExpenses}
        currency={settings.currency}
        onDelete={removeExpense}
        onSeeAll={() => router.push('/history')}
      />

      <View className="h-10" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
});

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MonthlyChart } from './MonthlyChart';
import { Colors } from '../constants/theme';
import type { ChartFilter } from '../types';
import type { DailySpendingChartProps } from '@/types/DailySpendingChart';

const CHART_FILTERS: { key: ChartFilter; label: string }[] = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: '7days', label: '7 Days' },
  { key: '30days', label: '30 Days' },
];

export function DailySpendingChart({
  filter,
  setFilter,
  chartData,
  maxValue,
  loading,
}: DailySpendingChartProps) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white text-lg font-extrabold tracking-[-0.3px]">Daily Spending</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 4 }}
        className="mb-3"
      >
        {CHART_FILTERS?.map((f) => (
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
        {loading ? (
          <View className="h-[140px] justify-center items-center">
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : (
          <MonthlyChart data={chartData} maxValue={maxValue} />
        )}
      </View>
    </View>
  );
}

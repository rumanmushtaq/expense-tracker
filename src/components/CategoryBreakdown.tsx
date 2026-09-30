import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { formatCurrency } from '../utils/helpers';

interface CategoryTotal {
  key: string;
  label: string;
  color: string;
  amount: number;
}

interface CategoryBreakdownProps {
  categoryTotals: CategoryTotal[];
  total: number;
  currency: string;
}

export function CategoryBreakdown({ categoryTotals, total, currency }: CategoryBreakdownProps) {
  if (categoryTotals.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(500)} className="mb-6">
      <Text className="text-white text-lg font-extrabold mb-2 tracking-[-0.3px]">Categories</Text>
      <View className="bg-surface rounded-theme-xl p-4 border border-glass-border gap-3.5">
        {categoryTotals?.slice(0, 4)?.map((cat) => (
          <View key={cat.key} className="flex-row items-center">
            <View className="w-2.5 h-2.5 rounded-md" style={{ backgroundColor: cat.color }} />
            <View className="flex-1 ml-4">
              <Text className="text-secondary text-sm font-medium">{cat.label}</Text>
              <Text className="text-white text-md font-bold mt-px">
                {formatCurrency(cat.amount, currency)}
              </Text>
            </View>
            <Text className="text-muted text-sm font-bold">
              {((cat.amount / total) * 100).toFixed(0)}%
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

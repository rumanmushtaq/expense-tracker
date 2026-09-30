import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, BorderRadius, Spacing } from '../constants/theme';
import { formatCurrency, getMonthLabel } from '../utils/helpers';
import type { MonthNavigatorProps } from '@/types/MonthNavigator';

export function MonthNavigator({
  year,
  month,
  monthTotal,
  transactionCount,
  avgPerDay,
  currency,
  onPrev,
  onNext,
}: MonthNavigatorProps) {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <LinearGradient
        colors={[Colors.primary + '15', Colors.primary + '05']}
        style={styles.monthNav}
      >
        <TouchableOpacity
          onPress={onPrev}
          className="w-10 h-10 rounded-theme-md bg-surface-light justify-center items-center border border-glass-border"
        >
          <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <View className="items-center flex-1">
          <Text className="text-secondary text-xs font-semibold uppercase tracking-[1px]">
            {getMonthLabel(year, month)}
          </Text>
          <Text className="text-white text-xxl font-black mt-1 tracking-[-1px]">
            {formatCurrency(monthTotal, currency)}
          </Text>
          <View className="flex-row items-center mt-1.5 gap-1.5">
            <Text className="text-muted text-xs font-medium">{transactionCount} transactions</Text>
            <View className="w-[3px] h-[3px] rounded-sm bg-dim" />
            <Text className="text-muted text-xs font-medium">
              ~{formatCurrency(Math.round(avgPerDay), currency)}/day
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onNext}
          className="w-10 h-10 rounded-theme-md bg-surface-light justify-center items-center border border-glass-border"
        >
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
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
});

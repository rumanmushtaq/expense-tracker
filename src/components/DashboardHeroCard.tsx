import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, BorderRadius } from '../constants/theme';

interface DashboardHeroCardProps {
  monthLabel: string;
  total: string;
  budgetPercent: number;
  budgetColor: string;
  budgetLeft: number;
  budgetLeftLabel: string;
}

export function DashboardHeroCard({
  monthLabel,
  total,
  budgetPercent,
  budgetColor,
  budgetLeft,
  budgetLeftLabel,
}: DashboardHeroCardProps) {
  const barColors =
    budgetPercent > 90
      ? (Colors.gradientDanger as unknown as readonly [string, string])
      : budgetPercent > 70
      ? ([Colors.warning, Colors.warningDark] as const)
      : (Colors.gradientSuccess as unknown as readonly [string, string]);

  return (
    <Animated.View entering={FadeInDown.duration(600).springify()}>
      <LinearGradient
        colors={[Colors.primary + '25', Colors.primary + '08', Colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <View className="p-6 items-center">
          <Text className="text-secondary text-xs font-semibold uppercase tracking-[1.5px]">
            {monthLabel}
          </Text>
          <Text className="text-white text-hero font-black mt-1 tracking-[-2px]">{total}</Text>
          <Text className="text-muted text-sm mt-0.5 tracking-[0.5px]">total spending</Text>

          <View className="w-full mt-6">
            <View className="w-full h-2 bg-surface-light rounded overflow-hidden">
              <LinearGradient
                colors={barColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: '100%', width: `${budgetPercent}%`, borderRadius: 4 }}
              />
            </View>
            <View className="flex-row justify-between mt-1">
              <Text className="text-xs font-semibold" style={{ color: budgetColor }}>
                {budgetPercent.toFixed(0)}% used
              </Text>
              <Text className="text-muted text-xs font-semibold">{budgetLeftLabel}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    marginBottom: 16,
    overflow: 'hidden',
  },
});

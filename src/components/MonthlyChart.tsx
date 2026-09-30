import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import type { ChartDataPoint } from '../types';

interface Props {
  data: ChartDataPoint[];
  maxValue: number;
}

export const MonthlyChart = ({ data, maxValue }: Props) => {
  const chartMax = maxValue || 1;
  const showEveryN = data.length <= 7 ? 1 : 5;

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(600)} className="pt-2">
      <View className="flex-row items-end h-[140px] gap-0.5 pb-6">
        {data?.map((item, index) => {
          const heightPercent = (item.total / chartMax) * 100;
          const hasSpending = item.total > 0;

          return (
            <View key={index} className="flex-1 items-center justify-end h-full">
              <View className="w-[85%] h-full justify-end items-center">
                {hasSpending ? (
                  <LinearGradient
                    colors={
                      item.isToday
                        ? [Colors.primary, Colors.primaryLight]
                        : [Colors.primaryLight + '60', Colors.primaryLight + '30']
                    }
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={[styles.bar, { height: `${Math.max(heightPercent, 4)}%` }]}
                  />
                ) : (
                  <View className="w-full bg-surface-light rounded" style={{ height: 3 }} />
                )}
              </View>
              {index % showEveryN === 0 && (
                <Text
                  className="absolute bottom-0"
                  style={[styles.label, item.isToday && styles.labelActive]}
                >
                  {item.label}
                </Text>
              )}
              {item.isToday && (
                <View className="absolute w-1 h-1 rounded-sm bg-primary" style={{ bottom: 12 }} />
              )}
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 3,
  },
  label: {
    color: Colors.textDim,
    fontSize: 8,
    marginTop: 6,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 9,
  },
});

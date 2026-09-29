import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize } from '../constants/theme';

interface Props {
  data: { date: string; total: number }[];
  maxValue: number;
}

export const MonthlyChart = ({ data, maxValue }: Props) => {
  const chartMax = maxValue || 1;

  // Show every other label if too many days
  const showEveryN = data.length > 15 ? 3 : data.length > 10 ? 2 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const height = (item.total / chartMax) * 120;
          const isToday = index === new Date().getDate() - 1;

          return (
            <View key={item.date} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(height, 2),
                    backgroundColor: isToday ? Colors.primary : item.total > 0 ? Colors.primaryLight + '80' : Colors.surfaceLight,
                  },
                ]}
              />
              {index % showEveryN === 0 && (
                <Text style={[styles.label, isToday && styles.labelActive]}>{item.date}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.md,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    gap: 2,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '80%',
    borderRadius: 3,
    minHeight: 2,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 8,
    marginTop: 4,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

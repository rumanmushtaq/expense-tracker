import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  data: { date: string; total: number }[];
  maxValue: number;
}

export const MonthlyChart = ({ data, maxValue }: Props) => {
  const chartMax = maxValue || 1;
  const showEveryN = data.length > 15 ? 5 : data.length > 10 ? 3 : 2;

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.container}>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const heightPercent = (item.total / chartMax) * 100;
          const isToday = index === new Date().getDate() - 1;
          const hasSpending = item.total > 0;

          return (
            <View key={item.date} style={styles.barContainer}>
              <View style={styles.barTrack}>
                {hasSpending ? (
                  <LinearGradient
                    colors={
                      isToday
                        ? [Colors.primary, Colors.primaryLight]
                        : [Colors.primaryLight + '60', Colors.primaryLight + '30']
                    }
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={[
                      styles.bar,
                      {
                        height: `${Math.max(heightPercent, 4)}%`,
                      },
                    ]}
                  />
                ) : (
                  <View style={[styles.bar, styles.emptyBar]} />
                )}
              </View>
              {index % showEveryN === 0 && (
                <Text style={[styles.label, isToday && styles.labelActive]}>
                  {item.date}
                </Text>
              )}
              {isToday && <View style={styles.todayDot} />}
            </View>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.sm,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
    gap: 2,
    paddingBottom: 24,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  barTrack: {
    width: '85%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 3,
  },
  emptyBar: {
    height: 3,
    backgroundColor: Colors.surfaceLight,
  },
  label: {
    color: Colors.textDim,
    fontSize: 8,
    marginTop: 6,
    fontWeight: '500',
    position: 'absolute',
    bottom: 0,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 9,
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 12,
  },
});

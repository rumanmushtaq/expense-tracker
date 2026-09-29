import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';

interface Props {
  title: string;
  value: string;
  icon: string;
  color: string;
  subtitle?: string;
  index?: number;
}

export const StatCard = ({ title, value, icon, color, subtitle, index = 0 }: Props) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).duration(500).springify()}
      style={[styles.card, Shadow.md]}
    >
      <LinearGradient
        colors={[color + '15', color + '05']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={[styles.iconBg, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
          {value}
        </Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  gradient: {
    padding: Spacing.md,
    minHeight: 120,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  value: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
});

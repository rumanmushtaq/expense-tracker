import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { CategoryInfo } from '../types';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';

interface Props {
  category: CategoryInfo;
  selected?: boolean;
  onPress?: () => void;
  index?: number;
}

export const CategoryBadge = ({ category, selected, onPress, index = 0 }: Props) => {
  return (
    <Animated.View entering={FadeIn.delay(index * 40).duration(300)}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[
          styles.badge,
          {
            backgroundColor: selected ? category.color + '20' : Colors.surfaceLight,
            borderColor: selected ? category.color + '60' : Colors.glassBorder,
          },
          selected && Shadow.sm,
          selected && { ...Shadow.glow(category.color), shadowOpacity: 0.15 },
        ]}
      >
        <Ionicons
          name={category.icon as any}
          size={16}
          color={selected ? category.color : Colors.textMuted}
        />
        <Text
          style={[
            styles.label,
            { color: selected ? category.color : Colors.textSecondary },
            selected && styles.labelSelected,
          ]}
        >
          {category.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: 6,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  labelSelected: {
    fontWeight: '700',
  },
});

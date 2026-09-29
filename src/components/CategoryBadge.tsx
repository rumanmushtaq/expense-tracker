import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryInfo } from '../types';
import { Colors, Spacing, FontSize } from '../constants/theme';

interface Props {
  category: CategoryInfo;
  selected?: boolean;
  onPress?: () => void;
}

export const CategoryBadge = ({ category, selected, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.badge,
        {
          backgroundColor: selected ? category.color + '30' : Colors.surfaceLight,
          borderColor: selected ? category.color : 'transparent',
        },
      ]}
    >
      <Ionicons name={category.icon as any} size={18} color={selected ? category.color : Colors.textSecondary} />
      <Text style={[styles.label, { color: selected ? category.color : Colors.textSecondary }]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    gap: 6,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Colors, Shadow } from '../constants/theme';
import type { Props } from '@/types/CategoryBadge';

export const CategoryBadge = ({ category, selected, onPress, index = 0 }: Props) => (
  <Animated.View entering={FadeIn.delay(index * 40).duration(300)}>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center px-3.5 py-2.5 rounded-theme-xl border-2 mr-2 mb-2 gap-1.5"
      style={[
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
        className={`text-sm ${selected ? 'font-bold' : 'font-semibold'} tracking-[0.2px]`}
        style={{ color: selected ? category.color : Colors.textSecondary }}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  </Animated.View>
);

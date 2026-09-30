import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import type { Props } from '@/types/EmptyState';

export const EmptyState = ({ icon, title, subtitle }: Props) => (
  <Animated.View entering={FadeInUp.duration(500)} className="items-center justify-center py-12">
    <View className="w-20 h-20 rounded-full bg-surface-light justify-center items-center mb-4 border border-glass-border">
      <Ionicons name={icon as any} size={40} color={Colors.textMuted} />
    </View>
    <Text className="text-secondary text-lg font-semibold tracking-[0.2px]">{title}</Text>
    {subtitle && (
      <Text className="text-muted text-md mt-1 text-center px-8 leading-[22px]">{subtitle}</Text>
    )}
  </Animated.View>
);

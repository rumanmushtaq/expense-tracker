import React from 'react';
import { View } from 'react-native';
import type { Props } from '@/types/CardSection';

export const CardSection = ({ children, style }: Props) => (
  <View
    className="bg-surface rounded-theme-xl p-6 mb-4 border border-glass-border"
    style={style}
  >
    {children}
  </View>
);

import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardSection = ({ children, style }: Props) => (
  <View
    className="bg-surface rounded-theme-xl p-6 mb-4 border border-glass-border"
    style={style}
  >
    {children}
  </View>
);

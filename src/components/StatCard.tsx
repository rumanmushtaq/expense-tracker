import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Shadow } from '../constants/theme';

interface Props {
  title: string;
  value: string;
  icon: string;
  color: string;
  subtitle?: string;
  index?: number;
}

export const StatCard = ({ title, value, icon, color, subtitle, index = 0 }: Props) => (
  <Animated.View
    entering={FadeInUp.delay(index * 100).duration(500).springify()}
    className="flex-1 rounded-theme-xl overflow-hidden border border-glass-border"
    style={Shadow.md}
  >
    <LinearGradient
      colors={[color + '15', color + '05']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ padding: 16, minHeight: 120 }}
    >
      <View
        className="w-10 h-10 rounded-theme-md justify-center items-center mb-2"
        style={{ backgroundColor: color + '20' }}
      >
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text className="text-secondary text-sm font-medium tracking-[0.3px]">{title}</Text>
      <Text className="text-white text-xl font-extrabold mt-1 tracking-[-0.5px]" numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      {subtitle && <Text className="text-muted text-xs mt-0.5">{subtitle}</Text>}
    </LinearGradient>
  </Animated.View>
);

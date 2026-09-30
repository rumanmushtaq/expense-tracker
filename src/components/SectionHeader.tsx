import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: string;
  title: string;
  color: string;
}

export const SectionHeader = ({ icon, title, color }: Props) => (
  <View className="flex-row items-center gap-2.5 mb-6">
    <View
      className="w-9 h-9 rounded-theme-md justify-center items-center"
      style={{ backgroundColor: color + '15' }}
    >
      <Ionicons name={icon as any} size={18} color={color} />
    </View>
    <Text className="text-white text-lg font-extrabold tracking-[-0.3px]">{title}</Text>
  </View>
);

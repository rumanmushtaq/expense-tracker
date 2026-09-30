import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import type { EmailReportButtonProps } from '@/types/EmailReportButton';

export function EmailReportButton({ onPress }: EmailReportButtonProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center mx-4 mb-4 py-2.5 rounded-theme-md border gap-2"
      style={{ borderColor: Colors.primary + '30', backgroundColor: Colors.primary + '08' }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="mail-outline" size={16} color={Colors.primary} />
      <Text className="text-primary text-sm font-bold flex-1">Send Monthly Report</Text>
      <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
    </TouchableOpacity>
  );
}

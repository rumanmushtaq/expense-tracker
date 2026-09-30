import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft, Layout } from 'react-native-reanimated';
import { Expense } from '../types';
import { getCategoryInfo } from '../constants/categories';
import { Colors, Shadow } from '../constants/theme';
import { formatCurrency, formatDateShort } from '../utils/helpers';

interface Props {
  expense: Expense;
  currency: string;
  onDelete?: (id: string) => void;
  index?: number;
}

export const ExpenseCard = ({ expense, currency, onDelete, index = 0 }: Props) => {
  const category = getCategoryInfo(expense.category);

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 60).duration(400).springify()}
      exiting={FadeOutLeft.duration(300)}
      layout={Layout.springify()}
      className="flex-row items-center bg-surface rounded-theme-lg p-4 mb-2 border border-glass-border"
      style={Shadow.sm}
    >
      <View
        className="w-12 h-12 rounded-theme-md justify-center items-center"
        style={{ backgroundColor: category.color + '18' }}
      >
        <Ionicons name={category.icon as any} size={22} color={category.color} />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-white text-md font-semibold tracking-[0.1px]" numberOfLines={1}>
          {expense.title}
        </Text>
        <View className="flex-row items-center mt-1.5 gap-2">
          <View
            className="px-2 py-0.5 rounded-full"
            style={{ backgroundColor: category.color + '15' }}
          >
            <Text className="text-[9px] font-bold uppercase tracking-[0.5px]" style={{ color: category.color }}>
              {category.label}
            </Text>
          </View>
          <Text className="text-muted text-xs">{formatDateShort(expense.date)}</Text>
        </View>
      </View>

      <View className="items-end gap-1.5">
        <Text className="text-danger text-md font-bold tracking-[-0.3px]">
          -{formatCurrency(expense.amount, currency)}
        </Text>
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(expense.id)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            className="opacity-70"
          >
            <Ionicons name="close-circle" size={18} color={Colors.danger + '80'} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseCard } from './ExpenseCard';
import { EmptyState } from './EmptyState';
import { Colors } from '../constants/theme';
import type { Expense } from '../types';

interface RecentExpensesProps {
  expenses: Expense[];
  currency: string;
  onDelete: (id: string) => void;
  onSeeAll: () => void;
}

export function RecentExpenses({ expenses, currency, onDelete, onSeeAll }: RecentExpensesProps) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white text-lg font-extrabold tracking-[-0.3px]">Recent</Text>
        <TouchableOpacity onPress={onSeeAll} className="flex-row items-center gap-0.5">
          <Text className="text-primary text-sm font-bold">See All</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {expenses.length > 0 ? (
        expenses?.map((expense, i) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            currency={currency}
            onDelete={onDelete}
            index={i}
          />
        ))
      ) : (
        <EmptyState
          icon="wallet-outline"
          title="No expenses yet"
          subtitle="Tap the + tab to add your first expense"
        />
      )}
    </View>
  );
}

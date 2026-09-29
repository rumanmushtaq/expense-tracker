import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Expense } from '../types';
import { getCategoryInfo } from '../constants/categories';
import { Colors, Spacing, FontSize } from '../constants/theme';
import { formatCurrency, formatDateShort } from '../utils/helpers';

interface Props {
  expense: Expense;
  currency: string;
  onDelete?: (id: string) => void;
}

export const ExpenseCard = ({ expense, currency, onDelete }: Props) => {
  const category = getCategoryInfo(expense.category);

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
        <Ionicons name={category.icon as any} size={22} color={category.color} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {expense.title}
        </Text>
        <Text style={styles.meta}>
          {category.label} • {formatDateShort(expense.date)}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(expense.amount, currency)}</Text>
        {onDelete && (
          <TouchableOpacity onPress={() => onDelete(expense.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="trash-outline" size={16} color={Colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  meta: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});

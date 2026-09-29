import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft, Layout } from 'react-native-reanimated';
import { Expense } from '../types';
import { getCategoryInfo } from '../constants/categories';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
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
      style={[styles.card, Shadow.sm]}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color + '18' }]}>
        <Ionicons name={category.icon as any} size={22} color={category.color} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {expense.title}
        </Text>
        <View style={styles.metaRow}>
          <View style={[styles.categoryPill, { backgroundColor: category.color + '15' }]}>
            <Text style={[styles.categoryText, { color: category.color }]}>{category.label}</Text>
          </View>
          <Text style={styles.date}>{formatDateShort(expense.date)}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>-{formatCurrency(expense.amount, currency)}</Text>
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(expense.id)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.deleteBtn}
          >
            <Ionicons name="close-circle" size={18} color={Colors.danger + '80'} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.round,
  },
  categoryText: {
    fontSize: FontSize.xxs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  amount: {
    color: Colors.danger,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  deleteBtn: {
    opacity: 0.7,
  },
});

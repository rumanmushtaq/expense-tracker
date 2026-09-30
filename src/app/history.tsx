import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ExpenseCard } from '../components/ExpenseCard';
import { EmptyState } from '../components/EmptyState';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { formatCurrency, getMonthLabel } from '../utils/helpers';
import { useHistory } from '../hooks/useHistory';

export default function HistoryScreen() {
  const {
    filteredExpenses,
    settings,
    selectedYear,
    selectedMonth,
    monthTotal,
    avgPerDay,
    goToPrevMonth,
    goToNextMonth,
    handleDelete,
    handleSendReport,
  } = useHistory();

  return (
    <View style={styles.container}>
      {/* Month Navigator */}
      <Animated.View entering={FadeInDown.duration(500)}>
        <LinearGradient
          colors={[Colors.primary + '15', Colors.primary + '05']}
          style={styles.monthNav}
        >
          <TouchableOpacity onPress={goToPrevMonth} style={styles.navButton}>
            <Ionicons name="chevron-back" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.monthInfo}>
            <Text style={styles.monthLabel}>
              {getMonthLabel(selectedYear, selectedMonth)}
            </Text>
            <Text style={styles.monthTotal}>
              {formatCurrency(monthTotal, settings.currency)}
            </Text>
            <View style={styles.monthMeta}>
              <Text style={styles.monthMetaText}>
                {filteredExpenses.length} transactions
              </Text>
              <View style={styles.metaDot} />
              <Text style={styles.monthMetaText}>
                ~{formatCurrency(Math.round(avgPerDay), settings.currency)}/day
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {/* Email Report Button */}
      <TouchableOpacity style={styles.emailButton} onPress={handleSendReport} activeOpacity={0.7}>
        <Ionicons name="mail-outline" size={16} color={Colors.primary} />
        <Text style={styles.emailButtonText}>Send Monthly Report</Text>
        <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
      </TouchableOpacity>

      {/* Expense List */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ExpenseCard
            expense={item}
            currency={settings.currency}
            onDelete={handleDelete}
            index={index}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-outline"
            title="No expenses this month"
            subtitle="Your expenses for this period will appear here"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  monthInfo: {
    alignItems: 'center',
    flex: 1,
  },
  monthLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  monthTotal: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: '900',
    marginTop: 4,
    letterSpacing: -1,
  },
  monthMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  monthMetaText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.textDim,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    backgroundColor: Colors.primary + '08',
    gap: 8,
  },
  emailButtonText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    flex: 1,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 100,
  },
});

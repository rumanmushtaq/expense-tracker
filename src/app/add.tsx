import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { CategoryBadge } from '../components/CategoryBadge';
import { FormLabel } from '../components/FormLabel';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { CATEGORIES, getCategoryInfo } from '../constants/categories';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { useAddExpense } from '../hooks/useAddExpense';

export default function AddExpenseScreen() {
  const {
    title, setTitle,
    amount, setAmount,
    category, setCategory,
    note, setNote,
    saving,
    handleSave,
    settings,
  } = useAddExpense();

  const selectedCat = getCategoryInfo(category);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Amount Hero */}
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <LinearGradient
            colors={[selectedCat.color + '20', selectedCat.color + '05', Colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.amountCard}
          >
            <Text style={styles.currencyLabel}>{settings.currency}</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor={Colors.textDim}
              keyboardType="numeric"
              autoFocus
            />
            <View style={[styles.categoryIndicator, { backgroundColor: selectedCat.color + '20' }]}>
              <Ionicons name={selectedCat.icon as any} size={14} color={selectedCat.color} />
              <Text style={[styles.categoryIndicatorText, { color: selectedCat.color }]}>
                {selectedCat.label}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Title Field */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.field}>
          <FormLabel>What was it for?</FormLabel>
          <FormInput
            icon="pencil-outline"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Lunch at restaurant"
          />
        </Animated.View>

        {/* Category Grid */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.field}>
          <FormLabel>Category</FormLabel>
          <View style={styles.categories}>
            {CATEGORIES.map((cat, i) => (
              <CategoryBadge
                key={cat.key}
                category={cat}
                selected={category === cat.key}
                onPress={() => setCategory(cat.key)}
                index={i}
              />
            ))}
          </View>
        </Animated.View>

        {/* Note Field */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.field}>
          <FormLabel>Note (optional)</FormLabel>
          <FormInput
            value={note}
            onChangeText={setNote}
            placeholder="Add more details..."
            multiline
            numberOfLines={3}
          />
        </Animated.View>

        {/* Save Button */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)}>
          <PrimaryButton
            label={saving ? 'Saving...' : 'Add Expense'}
            icon={saving ? 'hourglass' : 'checkmark-circle'}
            onPress={handleSave}
            disabled={saving}
          />
        </Animated.View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  amountCard: {
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  currencyLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.lg,
    fontWeight: '700',
    letterSpacing: 1,
  },
  amountInput: {
    color: Colors.text,
    fontSize: 56,
    fontWeight: '900',
    minWidth: 120,
    textAlign: 'center',
    letterSpacing: -2,
    paddingVertical: Spacing.sm,
  },
  categoryIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    gap: 6,
    marginTop: Spacing.sm,
  },
  categoryIndicatorText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

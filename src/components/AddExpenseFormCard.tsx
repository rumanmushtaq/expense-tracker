import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { CategoryBadge } from './CategoryBadge';
import { FormLabel } from './FormLabel';
import { FormInput } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { CATEGORIES, getCategoryInfo } from '../constants/categories';
import { Colors } from '../constants/theme';
import { AddExpenseFormValues, AddExpenseOutput } from '../schemas/expenseSchema';

interface AddExpenseFormCardProps {
  control: Control<AddExpenseFormValues, unknown, AddExpenseOutput>;
  errors: FieldErrors<AddExpenseFormValues>;
  currency: string;
  selectedCategory: string;
  handleSave: () => void;
  saving: boolean;
}

export function AddExpenseFormCard({
  control,
  errors,
  currency,
  selectedCategory,
  handleSave,
  saving,
}: AddExpenseFormCardProps) {
  const selectedCat = getCategoryInfo(selectedCategory ?? 'food');

  return (
    <>
      {/* Amount Hero */}
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <LinearGradient
          colors={[selectedCat.color + '20', selectedCat.color + '05', Colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.amountCard}
        >
          <Text className="text-secondary text-lg font-bold tracking-[1px]">{currency}</Text>
          <Controller
            control={control}
            name="amount"
            render={({ field: { value, onChange } }) => (
              <TextInput
                style={styles.amountInput}
                value={value}
                onChangeText={onChange}
                placeholder="0"
                placeholderTextColor={Colors.textDim}
                keyboardType="numeric"
                autoFocus
              />
            )}
          />
          {errors.amount && (
            <Text className="text-danger text-xs font-semibold mt-1">{errors.amount.message}</Text>
          )}
          <View
            className="flex-row items-center px-3 py-1.5 rounded-full gap-1.5 mt-2"
            style={{ backgroundColor: selectedCat.color + '20' }}
          >
            <Ionicons name={selectedCat.icon as any} size={14} color={selectedCat.color} />
            <Text
              className="text-xs font-bold uppercase tracking-[0.5px]"
              style={{ color: selectedCat.color }}
            >
              {selectedCat.label}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Title */}
      <Animated.View entering={FadeInUp.delay(100).duration(400)} className="mb-6">
        <FormLabel>What was it for?</FormLabel>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              icon="pencil-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="e.g. Lunch at restaurant"
            />
          )}
        />
        {errors.title && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.title.message}</Text>
        )}
      </Animated.View>

      {/* Category */}
      <Animated.View entering={FadeInUp.delay(200).duration(400)} className="mb-6">
        <FormLabel>Category</FormLabel>
        <Controller
          control={control}
          name="category"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row flex-wrap">
              {CATEGORIES?.map((cat, i) => (
                <CategoryBadge
                  key={cat.key}
                  category={cat}
                  selected={value === cat.key}
                  onPress={() => onChange(cat.key)}
                  index={i}
                />
              ))}
            </View>
          )}
        />
      </Animated.View>

      {/* Note */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)} className="mb-6">
        <FormLabel>Note (optional)</FormLabel>
        <Controller
          control={control}
          name="note"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Add more details..."
              multiline
              numberOfLines={3}
            />
          )}
        />
        {errors.note && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.note.message}</Text>
        )}
      </Animated.View>

      {/* Save */}
      <Animated.View entering={FadeInUp.delay(400).duration(400)}>
        <PrimaryButton
          label="Add Expense"
          icon="checkmark-circle"
          onPress={handleSave}
          loading={saving}
        />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  amountCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  amountInput: {
    color: Colors.text,
    fontSize: 56,
    fontWeight: '900',
    minWidth: 120,
    textAlign: 'center',
    letterSpacing: -2,
    paddingVertical: 8,
  },
});

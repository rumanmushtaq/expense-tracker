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
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { CategoryBadge } from '../components/CategoryBadge';
import { FormLabel } from '../components/FormLabel';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { CATEGORIES, getCategoryInfo } from '../constants/categories';
import { Colors, BorderRadius, Spacing } from '../constants/theme';
import { useAddExpense } from '../hooks/useAddExpense';

export default function AddExpenseScreen() {
  const { form, handleSave, settings, saving } = useAddExpense();
  const { control, formState: { errors }, watch } = form;
  const selectedCat = getCategoryInfo(watch('category') ?? 'food');

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
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
            <Text className="text-secondary text-lg font-bold tracking-[1px]">
              {settings.currency}
            </Text>
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

        {/* Title Field */}
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

        {/* Category Grid */}
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

        {/* Note Field */}
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
  amountInput: {
    color: Colors.text,
    fontSize: 56,
    fontWeight: '900',
    minWidth: 120,
    textAlign: 'center',
    letterSpacing: -2,
    paddingVertical: Spacing.sm,
  },
});

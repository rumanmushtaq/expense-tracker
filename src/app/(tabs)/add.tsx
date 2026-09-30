import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AddExpenseFormCard } from '../../components/AddExpenseFormCard';
import { Spacing } from '../../constants/theme';
import { useAddExpense } from '../../hooks/useAddExpense';

export default function AddExpenseScreen() {
  const { form, handleSave, settings, saving } = useAddExpense();
  const { control, formState: { errors }, watch } = form;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AddExpenseFormCard
          control={control}
          errors={errors}
          currency={settings.currency}
          selectedCategory={watch('category') ?? 'food'}
          handleSave={handleSave}
          saving={saving}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
});

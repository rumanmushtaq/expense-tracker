import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useExpenses } from '../context/ExpenseContext';
import { ExpenseCategory } from '../types';
import { AddExpenseSchema, AddExpenseFormValues } from '../schemas/expenseSchema';

export function useAddExpense() {
  const router = useRouter();
  const { addExpense, settings } = useExpenses();

  const form = useForm<AddExpenseFormValues>({
    resolver: valibotResolver(AddExpenseSchema),
    defaultValues: {
      title: '',
      amount: '',
      category: 'food' as ExpenseCategory,
      note: '',
    },
  });

  const handleSave = form.handleSubmit(async (data) => {
    try {
      await addExpense({
        id: uuidv4(),
        title: data.title.trim(),
        amount: parseFloat(data.amount),
        category: data.category as ExpenseCategory,
        date: new Date().toISOString(),
        note: data.note?.trim() || undefined,
      });

      form.reset();

      Alert.alert(
        'Expense Added! ✅',
        `${data.title} — ${settings.currency} ${parseFloat(data.amount)}`,
        [
          { text: 'Add Another', style: 'default' },
          { text: 'Dashboard', onPress: () => router.push('/') },
        ],
      );
    } catch {
      Alert.alert('Error', 'Failed to save expense.');
    }
  });

  return {
    form,
    handleSave,
    settings,
    saving: form.formState.isSubmitting,
  };
}

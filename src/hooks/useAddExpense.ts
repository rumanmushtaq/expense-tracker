import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import { useExpenses } from '../context/ExpenseContext';
import { ExpenseCategory } from '../types';
import { parsePositiveFloat } from '../utils/expenseFilters';

export function useAddExpense() {
  const router = useRouter();
  const { addExpense, settings } = useExpenses();

  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [note, setNote] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter an expense title.');
      return;
    }

    const parsedAmount = parsePositiveFloat(amount);
    if (parsedAmount === null) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setSaving(true);
    try {
      await addExpense({
        id: uuidv4(),
        title: title.trim(),
        amount: parsedAmount,
        category,
        date: new Date().toISOString(),
        note: note.trim() || undefined,
      });

      setTitle('');
      setAmount('');
      setCategory('food');
      setNote('');

      Alert.alert('Expense Added! ✅', `${title} — ${settings.currency} ${parsedAmount}`, [
        { text: 'Add Another', style: 'default' },
        { text: 'Dashboard', onPress: () => router.push('/') },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to save expense.');
    } finally {
      setSaving(false);
    }
  };

  return {
    title,
    setTitle,
    amount,
    setAmount,
    category,
    setCategory,
    note,
    setNote,
    saving,
    handleSave,
    settings,
  };
}

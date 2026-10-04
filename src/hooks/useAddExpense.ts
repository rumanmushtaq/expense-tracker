import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useExpenses } from '../context/ExpenseContext';
import { AddExpenseSchema, AddExpenseFormValues, AddExpenseOutput } from '../schemas/expenseSchema';
import { toast } from '../utils/toast';

export function useAddExpense() {
  const { addExpense, settings } = useExpenses();

  const form = useForm<AddExpenseFormValues, unknown, AddExpenseOutput>({
    resolver: valibotResolver(AddExpenseSchema),
    defaultValues: {
      title: '',
      amount: '',
      category: 'food',
      note: '',
    },
  });

  const handleSave = form.handleSubmit(async (data) => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      await addExpense({
        title: data.title,
        amount: data.amount,
        category: data.category,
        date: today,
        note: data.note || undefined,
      });
      form.reset();
      toast.success(
        `${data.title} — ${settings.currency} ${data.amount.toLocaleString()}`,
        'Expense Added',
      );
    } catch (e: any) {
      console.error('[useAddExpense]', e);
      toast.error(e?.message || 'Failed to save expense.');
    }
  });

  return {
    form,
    handleSave,
    settings,
    saving: form.formState.isSubmitting,
  };
}

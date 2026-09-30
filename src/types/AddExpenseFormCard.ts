import { Control, FieldErrors } from 'react-hook-form';
import type { AddExpenseFormValues, AddExpenseOutput } from '../schemas/expenseSchema';

export interface AddExpenseFormCardProps {
  control: Control<AddExpenseFormValues, unknown, AddExpenseOutput>;
  errors: FieldErrors<AddExpenseFormValues>;
  currency: string;
  selectedCategory: string;
  handleSave: () => void;
  saving: boolean;
}

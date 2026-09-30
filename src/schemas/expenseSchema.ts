import * as v from 'valibot';
import type { ExpenseCategory } from '../types';

export const ExpenseCategoryValues = [
  'food', 'transport', 'shopping', 'bills',
  'entertainment', 'health', 'education', 'other',
] as const satisfies readonly ExpenseCategory[];

export const AddExpenseSchema = v.object({
  title: v.pipe(
    v.string(),
    v.check((val) => val.trim().length > 0, 'Title is required'),
    v.maxLength(60, 'Max 60 characters'),
  ),
  amount: v.pipe(
    v.string(),
    v.check((val) => {
      const n = parseFloat(val);
      return val.trim().length > 0 && !isNaN(n) && n > 0;
    }, 'Enter a valid amount greater than 0'),
  ),
  category: v.picklist(ExpenseCategoryValues, 'Select a category'),
  note: v.optional(v.pipe(v.string(), v.maxLength(200, 'Max 200 characters'))),
});

export type AddExpenseFormValues = v.InferInput<typeof AddExpenseSchema>;

import { Expense } from '../types';
import {
  getExpenses as getExpensesFromStorage,
  saveExpense as saveExpenseToStorage,
  deleteExpense as deleteExpenseFromStorage,
} from '../utils/storage';
// import { axiosInstance } from './axiosInstance'; // uncomment when backend is ready

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    // return (await axiosInstance.get<Expense[]>('/expenses')).data;
    return getExpensesFromStorage();
  },

  async create(expense: Expense): Promise<Expense> {
    // return (await axiosInstance.post<Expense>('/expenses', expense)).data;
    await saveExpenseToStorage(expense);
    return expense;
  },

  async remove(id: string): Promise<void> {
    // await axiosInstance.delete(`/expenses/${id}`);
    await deleteExpenseFromStorage(id);
  },
};

import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'food', label: 'Food & Drinks', icon: 'fast-food', color: '#FF6B6B' },
  { key: 'transport', label: 'Transport', icon: 'car', color: '#4ECDC4' },
  { key: 'shopping', label: 'Shopping', icon: 'cart', color: '#45B7D1' },
  { key: 'bills', label: 'Bills & Utilities', icon: 'receipt', color: '#96CEB4' },
  { key: 'entertainment', label: 'Entertainment', icon: 'game-controller', color: '#FFEAA7' },
  { key: 'health', label: 'Health', icon: 'medkit', color: '#DDA0DD' },
  { key: 'education', label: 'Education', icon: 'book', color: '#98D8C8' },
  { key: 'other', label: 'Other', icon: 'ellipsis-horizontal', color: '#B8B8B8' },
];

export const getCategoryInfo = (key: string): CategoryInfo => {
  return CATEGORIES.find((c) => c.key === key) || CATEGORIES[CATEGORIES.length - 1];
};

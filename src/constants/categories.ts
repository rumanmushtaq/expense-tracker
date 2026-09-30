import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'food', label: 'Food & Drinks', icon: 'fast-food', color: '#F87171' },
  { key: 'transport', label: 'Transport', icon: 'car', color: '#34D399' },
  { key: 'shopping', label: 'Shopping', icon: 'bag-handle', color: '#60A5FA' },
  { key: 'bills', label: 'Bills', icon: 'receipt', color: '#A78BFA' },
  { key: 'entertainment', label: 'Fun', icon: 'game-controller', color: '#FBBF24' },
  { key: 'health', label: 'Health', icon: 'heart', color: '#F472B6' },
  { key: 'education', label: 'Education', icon: 'book', color: '#2DD4BF' },
  { key: 'other', label: 'Other', icon: 'ellipsis-horizontal-circle', color: '#94A3B8' },
];

export const getCategoryInfo = (key: string): CategoryInfo => {
  return CATEGORIES?.find((c) => c.key === key) || CATEGORIES[CATEGORIES.length - 1];
};

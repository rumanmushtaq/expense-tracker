import { CategoryInfo } from '../types';
import { Colors } from './theme';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'food',          label: 'Food & Drinks', icon: 'fast-food',                  color: Colors.danger },
  { key: 'transport',     label: 'Transport',     icon: 'car',                        color: Colors.success },
  { key: 'shopping',      label: 'Shopping',      icon: 'bag-handle',                 color: Colors.info },
  { key: 'bills',         label: 'Bills',         icon: 'receipt',                    color: Colors.purple },
  { key: 'entertainment', label: 'Fun',           icon: 'game-controller',            color: Colors.warning },
  { key: 'health',        label: 'Health',        icon: 'heart',                      color: Colors.pink },
  { key: 'education',     label: 'Education',     icon: 'book',                       color: Colors.teal },
  { key: 'other',         label: 'Other',         icon: 'ellipsis-horizontal-circle', color: Colors.slate },
];

export const getCategoryInfo = (key: string): CategoryInfo => {
  return CATEGORIES?.find((c) => c.key === key) || CATEGORIES[CATEGORIES.length - 1];
};

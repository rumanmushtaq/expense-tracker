export interface CategoryTotal {
  key: string;
  label: string;
  color: string;
  amount: number;
}

export interface CategoryBreakdownProps {
  categoryTotals: CategoryTotal[];
  total: number;
  currency: string;
}

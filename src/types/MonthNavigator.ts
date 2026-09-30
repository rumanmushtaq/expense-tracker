export interface MonthNavigatorProps {
  year: number;
  month: number;
  monthTotal: number;
  transactionCount: number;
  avgPerDay: number;
  currency: string;
  onPrev: () => void;
  onNext: () => void;
}

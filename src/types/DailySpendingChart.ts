import type { ChartFilter, ChartDataPoint } from './index';

export interface DailySpendingChartProps {
  filter: ChartFilter;
  setFilter: (filter: ChartFilter) => void;
  chartData: ChartDataPoint[];
  maxValue: number;
  loading: boolean;
}

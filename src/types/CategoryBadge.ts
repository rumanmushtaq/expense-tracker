import type { CategoryInfo } from './index';

export interface Props {
  category: CategoryInfo;
  selected?: boolean;
  onPress?: () => void;
  index?: number;
}

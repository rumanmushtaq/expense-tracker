export interface Props {
  label: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  gradientColors?: [string, string];
}

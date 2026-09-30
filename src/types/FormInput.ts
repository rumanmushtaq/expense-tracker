import { TextInputProps } from 'react-native';

export interface Props extends TextInputProps {
  icon?: string;
  prefix?: string;
  containerStyle?: object;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

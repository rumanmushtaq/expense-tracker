import { Control, FieldErrors } from 'react-hook-form';
import type { LoginFormValues } from '../schemas/authSchema';

export interface LoginFormCardProps {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  showPassword: boolean;
  togglePassword: () => void;
  handleLogin: () => void;
  isSubmitting: boolean;
  biometricEnabled: boolean;
  biometricAvailable: boolean;
  handleBiometricLogin: () => void;
  onForgotPassword: () => void;
}

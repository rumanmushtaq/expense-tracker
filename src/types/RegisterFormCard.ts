import { Control, FieldErrors } from 'react-hook-form';
import type { RegisterFormValues } from '../schemas/authSchema';

export interface RegisterFormCardProps {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirm: boolean;
  toggleConfirm: () => void;
  handleRegister: () => void;
  isSubmitting: boolean;
}

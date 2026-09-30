import { Control, FieldErrors } from 'react-hook-form';
import type { ResetPasswordFormValues } from '../schemas/authSchema';

export interface ResetPasswordFormCardProps {
  control: Control<ResetPasswordFormValues>;
  errors: FieldErrors<ResetPasswordFormValues>;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirm: boolean;
  toggleConfirm: () => void;
  handleReset: () => void;
  isSubmitting: boolean;
}

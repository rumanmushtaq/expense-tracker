import { Control, FieldErrors } from 'react-hook-form';
import type { ForgotPasswordFormValues } from '../schemas/authSchema';

export interface ForgotPasswordFormCardProps {
  control: Control<ForgotPasswordFormValues>;
  errors: FieldErrors<ForgotPasswordFormValues>;
  sent: boolean;
  handleSend: () => void;
  isSubmitting: boolean;
}

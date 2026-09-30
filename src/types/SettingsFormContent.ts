import { Control, FieldErrors } from 'react-hook-form';
import type { SettingsFormValues } from '../schemas/settingsSchema';
import type { AuthUser } from '../context/AuthContext';

export interface SettingsFormContentProps {
  control: Control<SettingsFormValues>;
  errors: FieldErrors<SettingsFormValues>;
  currency: string;
  user: AuthUser | null;
  biometricEnabled: boolean;
  handleBiometricToggle: (value: boolean) => void;
  handleSave: () => void;
  isSubmitting: boolean;
  requestSignOut: () => void;
}

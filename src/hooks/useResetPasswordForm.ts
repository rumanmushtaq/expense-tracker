import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';
import { ResetPasswordSchema, ResetPasswordFormValues } from '../schemas/authSchema';

export function useResetPasswordForm() {
  const { setNewPassword } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: valibotResolver(ResetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const handleReset = form.handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    try {
      await setNewPassword(data.password);
      toast.success('Your password has been updated.', 'Password Reset');
      router.replace('/(auth)/login');
    } catch (e: any) {
      toast.error(e?.message || 'Reset failed. Request a new reset link.');
    }
  });

  return {
    form,
    handleReset,
    showPassword,
    showConfirm,
    togglePassword: () => setShowPassword((v) => !v),
    toggleConfirm: () => setShowConfirm((v) => !v),
  };
}

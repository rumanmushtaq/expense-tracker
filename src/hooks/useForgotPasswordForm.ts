import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import * as Linking from 'expo-linking';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';
import { ForgotPasswordSchema, ForgotPasswordFormValues } from '../schemas/authSchema';

export function useForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const [sent, setSent] = useState<boolean>(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: valibotResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleSend = form.handleSubmit(async (data) => {
    try {
      const redirectTo = Linking.createURL('reset-password');
      await resetPassword(data.email, redirectTo);
      setSent(true);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to send reset email.');
    }
  });

  return { form, handleSend, sent };
}

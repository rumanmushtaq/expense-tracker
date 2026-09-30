import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAuth } from '../context/AuthContext';
import { LoginSchema, LoginFormValues } from '../schemas/authSchema';
import { useBiometric } from './useBiometric';
import { authApi } from '../api/auth';
import { toast } from '../utils/toast';

export function useLoginForm() {
  const { login, biometricEnabled, restoreSession } = useAuth();
  const biometric = useBiometric();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    const tryBiometric = async () => {
      if (!biometricEnabled) return;
      const session = await authApi.getSession();
      if (!session) return;
      const available = await biometric.isAvailable();
      if (!available) return;
      setBiometricAvailable(true);
      const success = await biometric.authenticate();
      if (success) await restoreSession();
    };
    tryBiometric();
  }, [biometricEnabled]);

  const handleLogin = form.handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      form.reset();
    } catch (e: any) {
      toast.error(e?.message || 'Something went wrong.', 'Login Failed');
    }
  });

  const handleBiometricLogin = useCallback(async () => {
    const available = await biometric.isAvailable();
    if (!available) {
      toast.info('Biometric authentication is not set up on this device.', 'Not Available');
      return;
    }
    const success = await biometric.authenticate();
    if (success) {
      const restored = await restoreSession();
      if (!restored) toast.info('Please sign in with your password.', 'Session Expired');
    }
  }, [biometric, restoreSession]);

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);

  return { form, handleLogin, handleBiometricLogin, showPassword, togglePassword, biometricAvailable };
}

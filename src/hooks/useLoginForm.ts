import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAuth } from '../context/AuthContext';
import { LoginSchema, LoginFormValues } from '../schemas/authSchema';
import { useBiometric } from './useBiometric';
import { authApi } from '../api/auth';

export function useLoginForm() {
  const { login, biometricEnabled, restoreSession } = useAuth();
  const biometric = useBiometric();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: valibotResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Auto-trigger biometric on mount if a Supabase session already exists
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
    } catch (e: any) {
      Alert.alert('Login Failed', e.message ?? 'Something went wrong.');
    }
  });

  const handleBiometricLogin = useCallback(async () => {
    const available = await biometric.isAvailable();
    if (!available) {
      Alert.alert('Not Available', 'Biometric authentication is not set up on this device.');
      return;
    }
    const success = await biometric.authenticate();
    if (success) {
      const restored = await restoreSession();
      if (!restored) Alert.alert('Session Expired', 'Please sign in with your password.');
    }
  }, [biometric, restoreSession]);

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);

  return { form, handleLogin, handleBiometricLogin, showPassword, togglePassword, biometricAvailable };
}

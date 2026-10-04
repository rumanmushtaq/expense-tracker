import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAuth } from '../context/AuthContext';
import { useBiometric } from './useBiometric';
import { RegisterSchema, RegisterFormValues } from '../schemas/authSchema';
import { toast } from '../utils/toast';

export function useRegisterForm() {
  const { register, setBiometricEnabled } = useAuth();
  const biometric = useBiometric();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [biometricModalVisible, setBiometricModalVisible] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: valibotResolver(RegisterSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const handleRegister = form.handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    try {
      const response = await register(data.name, data.email, data.password);
      console.log("test it ", response)
      // form.reset();
      const available = await biometric.isAvailable();
      console.log("available", available)
      if (available) setBiometricModalVisible(true);
    } catch (e: any) {
      toast.error(e?.message || 'Something went wrong.', 'Registration Failed');
    }
  });

  const confirmBiometric = useCallback(async () => {
    await setBiometricEnabled(true);
    setBiometricModalVisible(false);
  }, [setBiometricEnabled]);

  const dismissBiometric = useCallback(() => setBiometricModalVisible(false), []);

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);
  const toggleConfirm = useCallback(() => setShowConfirm((p) => !p), []);

  return {
    form,
    handleRegister,
    showPassword,
    togglePassword,
    showConfirm,
    toggleConfirm,
    biometricModalVisible,
    confirmBiometric,
    dismissBiometric,
  };
}

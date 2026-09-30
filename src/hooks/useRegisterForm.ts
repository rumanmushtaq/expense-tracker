import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useAuth } from '../context/AuthContext';
import { useBiometric } from './useBiometric';
import { RegisterSchema, RegisterFormValues } from '../schemas/authSchema';

export function useRegisterForm() {
  const { register, setBiometricEnabled } = useAuth();
  const biometric = useBiometric();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

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
      await register(data.name, data.email, data.password);
      form.reset();
      // Offer biometric after successful registration if available
      const available = await biometric.isAvailable();
      if (available) {
        Alert.alert(
          'Enable Biometric Login?',
          'Use Face ID or fingerprint to sign in faster next time.',
          [
            { text: 'Not Now', style: 'cancel' },
            { text: 'Enable', onPress: () => setBiometricEnabled(true) },
          ],
        );
      }
    } catch (e: any) {
      Alert.alert('Registration Failed', e.message ?? 'Something went wrong.');
    }
  });

  const togglePassword = useCallback(() => setShowPassword((p) => !p), []);
  const toggleConfirm = useCallback(() => setShowConfirm((p) => !p), []);

  return { form, handleRegister, showPassword, togglePassword, showConfirm, toggleConfirm };
}

import { useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { useBiometric } from './useBiometric';
import { SettingsSchema, SettingsFormValues, CURRENCIES } from '../schemas/settingsSchema';

export { CURRENCIES };

export function useSettingsForm() {
  const { settings, updateSettings } = useExpenses();
  const { biometricEnabled, setBiometricEnabled, logout } = useAuth();
  const biometric = useBiometric();

  const form = useForm<SettingsFormValues>({
    resolver: valibotResolver(SettingsSchema),
    defaultValues: {
      emailAddress: settings.emailAddress,
      monthlyBudget: String(settings.monthlyBudget),
      currency: settings.currency as SettingsFormValues['currency'],
      emailNotifications: settings.emailNotifications,
    },
  });

  useEffect(() => {
    form.reset({
      emailAddress: settings.emailAddress,
      monthlyBudget: String(settings.monthlyBudget),
      currency: settings.currency as SettingsFormValues['currency'],
      emailNotifications: settings.emailNotifications,
    });
  }, [settings]);

  const handleSave = form.handleSubmit(async (data) => {
    const saved = {
      emailAddress: data.emailAddress.trim(),
      currency: data.currency,
      monthlyBudget: parseFloat(data.monthlyBudget),
      emailNotifications: data.emailNotifications,
    };
    await updateSettings(saved);
    form.reset({
      emailAddress: saved.emailAddress,
      monthlyBudget: String(saved.monthlyBudget),
      currency: saved.currency as SettingsFormValues['currency'],
      emailNotifications: saved.emailNotifications,
    });
    Alert.alert('Saved! ✅', 'Your settings have been updated.');
  });

  const handleBiometricToggle = useCallback(async (value: boolean) => {
    if (value) {
      const available = await biometric.isAvailable();
      if (!available) {
        Alert.alert('Not Available', 'Biometric authentication is not set up on this device.');
        return;
      }
      const success = await biometric.authenticate();
      if (success) await setBiometricEnabled(true);
    } else {
      await setBiometricEnabled(false);
    }
  }, [biometric, setBiometricEnabled]);

  const handleLogout = useCallback(async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  }, [logout]);

  return { form, handleSave, biometricEnabled, handleBiometricToggle, handleLogout };
}

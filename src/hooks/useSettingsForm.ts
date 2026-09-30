import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';
import { useBiometric } from './useBiometric';
import { toast } from '../utils/toast';
import { SettingsSchema, SettingsFormValues, CURRENCIES } from '../schemas/settingsSchema';

export { CURRENCIES };

export function useSettingsForm() {
  const { settings, updateSettings } = useExpenses();
  const { biometricEnabled, setBiometricEnabled, logout } = useAuth();
  const biometric = useBiometric();
  const [signOutModalVisible, setSignOutModalVisible] = useState<boolean>(false);

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
    toast.success('Your settings have been updated.');
  });

  const handleBiometricToggle = useCallback(async (value: boolean) => {
    if (value) {
      const available = await biometric.isAvailable();
      if (!available) {
        toast.info('Biometric authentication is not set up on this device.', 'Not Available');
        return;
      }
      const success = await biometric.authenticate();
      if (success) await setBiometricEnabled(true);
    } else {
      await setBiometricEnabled(false);
    }
  }, [biometric, setBiometricEnabled]);

  const requestSignOut = useCallback(() => setSignOutModalVisible(true), []);
  const confirmSignOut = useCallback(async () => {
    setSignOutModalVisible(false);
    await logout();
  }, [logout]);
  const dismissSignOut = useCallback(() => setSignOutModalVisible(false), []);

  return {
    form,
    handleSave,
    biometricEnabled,
    handleBiometricToggle,
    signOutModalVisible,
    requestSignOut,
    confirmSignOut,
    dismissSignOut,
  };
}

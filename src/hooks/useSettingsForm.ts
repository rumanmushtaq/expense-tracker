import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useExpenses } from '../context/ExpenseContext';
import { SettingsSchema, SettingsFormValues, CURRENCIES } from '../schemas/settingsSchema';

export { CURRENCIES };

export function useSettingsForm() {
  const { settings, updateSettings } = useExpenses();

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
    await updateSettings({
      emailAddress: data.emailAddress.trim(),
      currency: data.currency,
      monthlyBudget: parseFloat(data.monthlyBudget),
      emailNotifications: data.emailNotifications,
    });
    Alert.alert('Saved! ✅', 'Your settings have been updated.');
  });

  return { form, handleSave };
}

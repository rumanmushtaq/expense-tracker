import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { parsePositiveFloat } from '../utils/expenseFilters';

export const CURRENCIES = ['PKR', 'USD', 'EUR', 'GBP', 'INR', 'AED'] as const;

export function useSettingsForm() {
  const { settings, updateSettings } = useExpenses();

  const [email, setEmail] = useState<string>(settings.emailAddress);
  const [budget, setBudget] = useState<string>(String(settings.monthlyBudget));
  const [currency, setCurrency] = useState<string>(settings.currency);
  const [emailNotifs, setEmailNotifs] = useState<boolean>(settings.emailNotifications);

  useEffect(() => {
    setEmail(settings.emailAddress);
    setBudget(String(settings.monthlyBudget));
    setCurrency(settings.currency);
    setEmailNotifs(settings.emailNotifications);
  }, [settings]);

  const handleSave = async () => {
    const parsedBudget = parsePositiveFloat(budget);
    if (parsedBudget === null) {
      Alert.alert('Invalid Budget', 'Please enter a valid budget amount.');
      return;
    }
    await updateSettings({
      emailAddress: email.trim(),
      currency: currency.trim() || 'PKR',
      monthlyBudget: parsedBudget,
      emailNotifications: emailNotifs,
    });
    Alert.alert('Saved! ✅', 'Your settings have been updated.');
  };

  return {
    email,
    setEmail,
    budget,
    setBudget,
    currency,
    setCurrency,
    emailNotifs,
    setEmailNotifs,
    handleSave,
  };
}

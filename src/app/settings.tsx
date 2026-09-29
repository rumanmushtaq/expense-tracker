import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpenseContext';
import { Colors, Spacing, FontSize } from '../constants/theme';

export default function SettingsScreen() {
  const { settings, updateSettings } = useExpenses();

  const [email, setEmail] = useState(settings.emailAddress);
  const [budget, setBudget] = useState(String(settings.monthlyBudget));
  const [currency, setCurrency] = useState(settings.currency);
  const [emailNotifs, setEmailNotifs] = useState(settings.emailNotifications);

  useEffect(() => {
    setEmail(settings.emailAddress);
    setBudget(String(settings.monthlyBudget));
    setCurrency(settings.currency);
    setEmailNotifs(settings.emailNotifications);
  }, [settings]);

  const handleSave = async () => {
    const parsedBudget = parseFloat(budget);
    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      Alert.alert('Invalid Budget', 'Please enter a valid budget amount.');
      return;
    }

    await updateSettings({
      emailAddress: email.trim(),
      currency: currency.trim() || 'PKR',
      monthlyBudget: parsedBudget,
      emailNotifications: emailNotifs,
    });

    Alert.alert('Saved!', 'Settings updated successfully.');
  };

  const currencies = ['PKR', 'USD', 'EUR', 'GBP', 'INR', 'AED'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Email Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="mail" size={20} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Email Report</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.hint}>
            Monthly expense report will be sent to this email on the 1st of each month at 12:00 AM
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Email Notifications</Text>
          <Switch
            value={emailNotifs}
            onValueChange={setEmailNotifs}
            trackColor={{ false: Colors.surfaceLight, true: Colors.primary + '60' }}
            thumbColor={emailNotifs ? Colors.primary : Colors.textMuted}
          />
        </View>
      </View>

      {/* Budget Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="wallet" size={20} color={Colors.success} />
          <Text style={styles.sectionTitle}>Budget</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Monthly Budget</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="50000"
            placeholderTextColor={Colors.textMuted}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Currency</Text>
          <View style={styles.currencyRow}>
            {currencies.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.currencyChip,
                  currency === c && styles.currencyChipActive,
                ]}
                onPress={() => setCurrency(c)}
              >
                <Text
                  style={[
                    styles.currencyChipText,
                    currency === c && styles.currencyChipTextActive,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="information-circle" size={20} color={Colors.warning} />
          <Text style={styles.sectionTitle}>About</Text>
        </View>
        <Text style={styles.aboutText}>
          Expense Tracker v1.0.0{'\n'}
          Built with React Native + Expo{'\n'}
          Track your expenses and get monthly email reports.
        </Text>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="checkmark-circle" size={20} color={Colors.text} />
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  hint: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
    lineHeight: 16,
  },
  input: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    padding: Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  rowLabel: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  currencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  currencyChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  currencyChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '20',
  },
  currencyChipText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  currencyChipTextActive: {
    color: Colors.primary,
  },
  aboutText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
  saveButtonText: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
});

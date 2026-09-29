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
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useExpenses } from '../context/ExpenseContext';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';

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

    Alert.alert('Saved! ✅', 'Your settings have been updated.');
  };

  const currencies = ['PKR', 'USD', 'EUR', 'GBP', 'INR', 'AED'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Email Section */}
      <Animated.View entering={FadeInUp.delay(0).duration(400)} style={[styles.section, Shadow.sm]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: Colors.primary + '15' }]}>
            <Ionicons name="mail" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.sectionTitle}>Email Reports</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="at" size={16} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={Colors.textDim}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.hint}>
            Monthly expense report sent on the 1st of each month
          </Text>
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>Email Notifications</Text>
            <Text style={styles.toggleHint}>Auto-send monthly reports</Text>
          </View>
          <Switch
            value={emailNotifs}
            onValueChange={setEmailNotifs}
            trackColor={{ false: Colors.surfaceElevated, true: Colors.primary + '50' }}
            thumbColor={emailNotifs ? Colors.primary : Colors.textMuted}
          />
        </View>
      </Animated.View>

      {/* Budget Section */}
      <Animated.View entering={FadeInUp.delay(100).duration(400)} style={[styles.section, Shadow.sm]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: Colors.success + '15' }]}>
            <Ionicons name="wallet" size={18} color={Colors.success} />
          </View>
          <Text style={styles.sectionTitle}>Budget</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Monthly Budget</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencyPrefix}>{currency}</Text>
            <TextInput
              style={styles.input}
              value={budget}
              onChangeText={setBudget}
              placeholder="50000"
              placeholderTextColor={Colors.textDim}
              keyboardType="numeric"
            />
          </View>
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
                activeOpacity={0.7}
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
      </Animated.View>

      {/* About Section */}
      <Animated.View entering={FadeInUp.delay(200).duration(400)} style={[styles.section, Shadow.sm]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: Colors.warning + '15' }]}>
            <Ionicons name="sparkles" size={18} color={Colors.warning} />
          </View>
          <Text style={styles.sectionTitle}>About</Text>
        </View>
        <View style={styles.aboutGrid}>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>2.0.0</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Built with</Text>
            <Text style={styles.aboutValue}>React Native + Expo</Text>
          </View>
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Developer</Text>
            <Text style={styles.aboutValue}>Ruman Mushtaq</Text>
          </View>
        </View>
      </Animated.View>

      {/* Save Button */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)}>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.saveButton, Shadow.glow(Colors.primary)]}
          >
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ height: 40 }} />
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
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  field: {
    marginBottom: Spacing.md,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  hint: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 6,
    lineHeight: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  inputIcon: {
    paddingLeft: Spacing.md,
  },
  currencyPrefix: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
    fontWeight: '700',
    paddingLeft: Spacing.md,
    letterSpacing: 0.5,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
    marginTop: Spacing.sm,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  toggleHint: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  currencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  currencyChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
  },
  currencyChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '15',
  },
  currencyChipText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  currencyChipTextActive: {
    color: Colors.primary,
  },
  aboutGrid: {
    gap: 12,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  aboutValue: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

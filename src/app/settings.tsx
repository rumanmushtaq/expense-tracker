import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { FormLabel } from '../components/FormLabel';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { CardSection } from '../components/CardSection';
import { SectionHeader } from '../components/SectionHeader';
import { useSettingsForm, CURRENCIES } from '../hooks/useSettingsForm';

export default function SettingsScreen() {
  const {
    email, setEmail,
    budget, setBudget,
    currency, setCurrency,
    emailNotifs, setEmailNotifs,
    handleSave,
  } = useSettingsForm();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Email Section */}
      <Animated.View entering={FadeInUp.delay(0).duration(400)}>
        <CardSection>
          <SectionHeader icon="mail" title="Email Reports" color={Colors.primary} />

          <View style={styles.field}>
            <FormLabel>Email Address</FormLabel>
            <FormInput
              icon="at"
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={{ backgroundColor: Colors.surfaceLight, borderColor: Colors.border }}
            />
            <Text style={styles.hint}>Monthly expense report sent on the 1st of each month</Text>
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
        </CardSection>
      </Animated.View>

      {/* Budget Section */}
      <Animated.View entering={FadeInUp.delay(100).duration(400)}>
        <CardSection>
          <SectionHeader icon="wallet" title="Budget" color={Colors.success} />

          <View style={styles.field}>
            <FormLabel>Monthly Budget</FormLabel>
            <FormInput
              prefix={currency}
              value={budget}
              onChangeText={setBudget}
              placeholder="50000"
              keyboardType="numeric"
              containerStyle={{ backgroundColor: Colors.surfaceLight, borderColor: Colors.border }}
            />
          </View>

          <View style={styles.field}>
            <FormLabel>Currency</FormLabel>
            <View style={styles.currencyRow}>
              {CURRENCIES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.currencyChip, currency === c && styles.currencyChipActive]}
                  onPress={() => setCurrency(c)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.currencyChipText, currency === c && styles.currencyChipTextActive]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </CardSection>
      </Animated.View>

      {/* About Section */}
      <Animated.View entering={FadeInUp.delay(200).duration(400)}>
        <CardSection>
          <SectionHeader icon="sparkles" title="About" color={Colors.warning} />
          <View style={styles.aboutGrid}>
            {[
              { label: 'Version', value: '2.0.0' },
              { label: 'Built with', value: 'React Native + Expo' },
              { label: 'Developer', value: 'Ruman Mushtaq' },
            ].map(({ label, value }) => (
              <View key={label} style={styles.aboutItem}>
                <Text style={styles.aboutLabel}>{label}</Text>
                <Text style={styles.aboutValue}>{value}</Text>
              </View>
            ))}
          </View>
        </CardSection>
      </Animated.View>

      {/* Save Button */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)}>
        <PrimaryButton
          label="Save Settings"
          icon="checkmark-circle"
          onPress={handleSave}
        />
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
  field: {
    marginBottom: Spacing.md,
  },
  hint: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 6,
    lineHeight: 16,
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
});

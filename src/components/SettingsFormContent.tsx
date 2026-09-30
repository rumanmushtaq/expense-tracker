import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Controller } from 'react-hook-form';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { CardSection } from './CardSection';
import { SectionHeader } from './SectionHeader';
import { FormLabel } from './FormLabel';
import { FormInput } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { Colors } from '../constants/theme';
import { CURRENCIES } from '../schemas/settingsSchema';
import type { SettingsFormContentProps } from '@/types/SettingsFormContent';

export function SettingsFormContent({
  control,
  errors,
  currency,
  user,
  biometricEnabled,
  handleBiometricToggle,
  handleSave,
  isSubmitting,
  requestSignOut,
}: SettingsFormContentProps) {
  return (
    <>
      {/* Account */}
      <Animated.View entering={FadeInUp.delay(0).duration(400)}>
        <CardSection>
          <SectionHeader icon="person-circle" title="Account" color={Colors.primary} />
          <View className="flex-row items-center gap-4">
            <View
              className="w-12 h-12 rounded-full justify-center items-center"
              style={{ backgroundColor: Colors.primary + '20' }}
            >
              <Ionicons name="person" size={22} color={Colors.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-md font-bold">{user?.name ?? 'User'}</Text>
              <Text className="text-muted text-xs mt-0.5">{user?.email ?? ''}</Text>
            </View>
          </View>
        </CardSection>
      </Animated.View>

      {/* Email Reports */}
      <Animated.View entering={FadeInUp.delay(50).duration(400)}>
        <CardSection>
          <SectionHeader icon="mail" title="Email Reports" color={Colors.info} />
          <View className="mb-4">
            <FormLabel>Report Email</FormLabel>
            <Controller
              control={control}
              name="emailAddress"
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  icon="at"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={{ backgroundColor: Colors.surfaceLight, borderColor: Colors.border }}
                />
              )}
            />
            {errors.emailAddress && (
              <Text className="text-danger text-xs font-semibold mt-1">{errors.emailAddress.message}</Text>
            )}
            <Text className="text-muted text-xs mt-1.5 leading-4">
              Monthly expense report sent on the 1st of each month
            </Text>
          </View>
          <View className="flex-row justify-between items-center pt-2 border-t border-glass-border mt-2">
            <View className="flex-1">
              <Text className="text-white text-md font-semibold">Email Notifications</Text>
              <Text className="text-muted text-xs mt-0.5">Auto-send monthly reports</Text>
            </View>
            <Controller
              control={control}
              name="emailNotifications"
              render={({ field: { value, onChange } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: Colors.surfaceElevated, true: Colors.primary + '50' }}
                  thumbColor={value ? Colors.primary : Colors.textMuted}
                />
              )}
            />
          </View>
        </CardSection>
      </Animated.View>

      {/* Budget */}
      <Animated.View entering={FadeInUp.delay(100).duration(400)}>
        <CardSection>
          <SectionHeader icon="wallet" title="Budget" color={Colors.success} />
          <View className="mb-4">
            <FormLabel>Monthly Budget</FormLabel>
            <Controller
              control={control}
              name="monthlyBudget"
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  prefix={currency}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="50000"
                  keyboardType="numeric"
                  containerStyle={{ backgroundColor: Colors.surfaceLight, borderColor: Colors.border }}
                />
              )}
            />
            {errors.monthlyBudget && (
              <Text className="text-danger text-xs font-semibold mt-1">{errors.monthlyBudget.message}</Text>
            )}
          </View>
          <View className="mb-4">
            <FormLabel>Currency</FormLabel>
            <Controller
              control={control}
              name="currency"
              render={({ field: { value, onChange } }) => (
                <View className="flex-row flex-wrap gap-2">
                  {CURRENCIES?.map((c) => (
                    <TouchableOpacity
                      key={c}
                      className="px-[18px] py-2.5 rounded-full border-[1.5px]"
                      style={{
                        backgroundColor: value === c ? Colors.primary + '15' : Colors.surfaceLight,
                        borderColor: value === c ? Colors.primary : Colors.glassBorder,
                      }}
                      onPress={() => onChange(c)}
                      activeOpacity={0.7}
                    >
                      <Text
                        className="text-sm font-bold tracking-[0.5px]"
                        style={{ color: value === c ? Colors.primary : Colors.textSecondary }}
                      >
                        {c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>
        </CardSection>
      </Animated.View>

      {/* Security */}
      <Animated.View entering={FadeInUp.delay(150).duration(400)}>
        <CardSection>
          <SectionHeader icon="shield-checkmark" title="Security" color={Colors.success} />
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-white text-md font-semibold">Biometric Login</Text>
              <Text className="text-muted text-xs mt-0.5">Face ID or fingerprint unlock</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: Colors.surfaceElevated, true: Colors.success + '50' }}
              thumbColor={biometricEnabled ? Colors.success : Colors.textMuted}
            />
          </View>
        </CardSection>
      </Animated.View>

      {/* About */}
      <Animated.View entering={FadeInUp.delay(200).duration(400)}>
        <CardSection>
          <SectionHeader icon="sparkles" title="About" color={Colors.warning} />
          <View className="gap-3">
            {[
              { label: 'Version', value: '2.0.0' },
              { label: 'Built with', value: 'React Native + Expo' },
              { label: 'Developer', value: 'Ruman Mushtaq' },
            ]?.map(({ label, value }) => (
              <View key={label} className="flex-row justify-between items-center">
                <Text className="text-muted text-sm font-medium">{label}</Text>
                <Text className="text-secondary text-sm font-semibold">{value}</Text>
              </View>
            ))}
          </View>
        </CardSection>
      </Animated.View>

      {/* Save */}
      <Animated.View entering={FadeInUp.delay(250).duration(400)}>
        <PrimaryButton
          label={isSubmitting ? 'Saving...' : 'Save Settings'}
          icon="checkmark-circle"
          onPress={handleSave}
          disabled={isSubmitting}
        />
      </Animated.View>

      {/* Sign Out */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)} className="mt-3">
        <TouchableOpacity
          className="flex-row items-center justify-center py-3.5 rounded-theme-lg border gap-2"
          style={{ borderColor: Colors.danger + '40', backgroundColor: Colors.danger + '08' }}
          onPress={requestSignOut}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.danger} />
          <Text className="text-danger text-md font-bold">Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}


import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Controller } from 'react-hook-form';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import { FormLabel } from '../components/FormLabel';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { CardSection } from '../components/CardSection';
import { SectionHeader } from '../components/SectionHeader';
import { useSettingsForm, CURRENCIES } from '../hooks/useSettingsForm';

export default function SettingsScreen() {
  const { form, handleSave } = useSettingsForm();
  const { control, formState: { errors }, watch } = form;
  const currency = watch('currency');

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >

      {/* Email Section */}
      <Animated.View entering={FadeInUp.delay(0).duration(400)}>
        <CardSection>
          <SectionHeader icon="mail" title="Email Reports" color={Colors.primary} />

          <View className="mb-4">
            <FormLabel>Email Address</FormLabel>
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

      {/* Budget Section */}
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
                  {CURRENCIES.map((c) => (
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

      {/* About Section */}
      <Animated.View entering={FadeInUp.delay(200).duration(400)}>
        <CardSection>
          <SectionHeader icon="sparkles" title="About" color={Colors.warning} />
          <View className="gap-3">
            {[
              { label: 'Version', value: '2.0.0' },
              { label: 'Built with', value: 'React Native + Expo' },
              { label: 'Developer', value: 'Ruman Mushtaq' },
            ].map(({ label, value }) => (
              <View key={label} className="flex-row justify-between items-center">
                <Text className="text-muted text-sm font-medium">{label}</Text>
                <Text className="text-secondary text-sm font-semibold">{value}</Text>
              </View>
            ))}
          </View>
        </CardSection>
      </Animated.View>

      {/* Save Button */}
      <Animated.View entering={FadeInUp.delay(300).duration(400)}>
        <PrimaryButton
          label={form.formState.isSubmitting ? 'Saving...' : 'Save Settings'}
          icon="checkmark-circle"
          onPress={handleSave}
          disabled={form.formState.isSubmitting}
        />
      </Animated.View>

      <View className="h-10" />
    </ScrollView>
  );
}

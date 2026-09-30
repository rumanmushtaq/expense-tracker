import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { FormInput } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { Colors, Shadow } from '../constants/theme';
import type { ForgotPasswordFormCardProps } from '@/types/ForgotPasswordFormCard';

export function ForgotPasswordFormCard({
  control,
  errors,
  sent,
  handleSend,
  isSubmitting,
}: ForgotPasswordFormCardProps) {
  return (
    <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>
      {sent ? (
        <View className="items-center py-3">
          <View className="mb-4">
            <Ionicons name="checkmark-circle" size={52} color={Colors.success} />
          </View>
          <Text className="text-white text-xl font-extrabold mb-2.5" style={styles.titleTracking}>
            Check Your Email
          </Text>
          <Text className="text-muted text-sm text-center" style={styles.successBody}>
            We've sent a password reset link to your email address. Tap the link to set a new password.
          </Text>
        </View>
      ) : (
        <>
          <View className="mb-[18px]">
            <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
              Email Address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <FormInput
                  icon="mail-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  containerStyle={errors.email ? styles.inputError : undefined}
                />
              )}
            />
            {errors.email && (
              <Text className="text-danger text-xs font-semibold mt-1">{errors.email.message}</Text>
            )}
          </View>

          <View className="mt-1.5">
            <PrimaryButton
              label="Send Reset Link"
              icon="send-outline"
              onPress={handleSend}
              loading={isSubmitting}
            />
          </View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.lg,
  },
  titleTracking: { letterSpacing: -0.8 },
  labelTracking: { letterSpacing: 0.3 },
  inputError: { borderColor: Colors.danger + '90' },
  successBody: { lineHeight: 22 },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { FormInput } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { Colors, Shadow } from '../constants/theme';
import type { ResetPasswordFormCardProps } from '@/types/ResetPasswordFormCard';

export function ResetPasswordFormCard({
  control,
  errors,
  showPassword,
  togglePassword,
  showConfirm,
  toggleConfirm,
  handleReset,
  isSubmitting,
}: ResetPasswordFormCardProps) {
  return (
    <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

      {/* New Password */}
      <View className="mb-[18px]">
        <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
          New Password
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              icon="lock-closed-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Min 6 characters"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={togglePassword}
              containerStyle={errors.password ? styles.inputError : undefined}
            />
          )}
        />
        {errors.password && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.password.message}</Text>
        )}
      </View>

      {/* Confirm Password */}
      <View className="mb-[18px]">
        <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
          Confirm Password
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              icon="lock-open-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Repeat your password"
              secureTextEntry={!showConfirm}
              rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={toggleConfirm}
              containerStyle={errors.confirmPassword ? styles.inputError : undefined}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.confirmPassword.message}</Text>
        )}
      </View>

      <View className="mt-1.5">
        <PrimaryButton
          label="Set New Password"
          icon="checkmark-circle-outline"
          onPress={handleReset}
          loading={isSubmitting}
        />
      </View>
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
  labelTracking: { letterSpacing: 0.3 },
  inputError: { borderColor: Colors.danger + '90' },
});

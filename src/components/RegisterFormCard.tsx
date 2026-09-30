import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { FormInput } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { Colors, Shadow } from '../constants/theme';
import type { RegisterFormCardProps } from '@/types/RegisterFormCard';

export function RegisterFormCard({
  control,
  errors,
  showPassword,
  togglePassword,
  showConfirm,
  toggleConfirm,
  handleRegister,
  isSubmitting,
}: RegisterFormCardProps) {
  return (
    <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

      {/* Name */}
      <View className="mb-4">
        <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
          Full Name
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              icon="person-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="John Doe"
              autoCapitalize="words"
              autoComplete="name"
              containerStyle={errors.name ? styles.inputError : undefined}
            />
          )}
        />
        {errors.name && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.name.message}</Text>
        )}
      </View>

      {/* Email */}
      <View className="mb-4">
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

      {/* Password */}
      <View className="mb-4">
        <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
          Password
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
              placeholder="Min. 6 characters"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={togglePassword}
              autoComplete="new-password"
              containerStyle={errors.password ? styles.inputError : undefined}
            />
          )}
        />
        {errors.password && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.password.message}</Text>
        )}
      </View>

      {/* Confirm Password */}
      <View className="mb-4">
        <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
          Confirm Password
        </Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              icon="shield-checkmark-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Re-enter password"
              secureTextEntry={!showConfirm}
              rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={toggleConfirm}
              autoComplete="new-password"
              containerStyle={errors.confirmPassword ? styles.inputError : undefined}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.confirmPassword.message}</Text>
        )}
      </View>

      <View className="mt-2">
        <PrimaryButton
          label="Create Account"
          icon="checkmark-circle"
          onPress={handleRegister}
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
  labelTracking: {
    letterSpacing: 0.3,
  },
  inputError: {
    borderColor: Colors.danger + '90',
  },
});

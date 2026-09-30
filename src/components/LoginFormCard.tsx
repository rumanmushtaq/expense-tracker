import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { FormInput } from './FormInput';
import { PrimaryButton } from './PrimaryButton';
import { Colors, Shadow } from '../constants/theme';
import { LoginFormValues } from '../schemas/authSchema';

interface LoginFormCardProps {
  control: Control<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  showPassword: boolean;
  togglePassword: () => void;
  handleLogin: () => void;
  isSubmitting: boolean;
  biometricEnabled: boolean;
  biometricAvailable: boolean;
  handleBiometricLogin: () => void;
  onForgotPassword: () => void;
}

export function LoginFormCard({
  control,
  errors,
  showPassword,
  togglePassword,
  handleLogin,
  isSubmitting,
  biometricEnabled,
  biometricAvailable,
  handleBiometricLogin,
  onForgotPassword,
}: LoginFormCardProps) {
  return (
    <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

      {/* Email */}
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

      {/* Password */}
      <View className="mb-[18px]">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-secondary text-sm font-semibold" style={styles.labelTracking}>
            Password
          </Text>
          <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
            <Text className="text-primary text-sm font-bold">Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormInput
              icon="lock-closed-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightIconPress={togglePassword}
              autoComplete="current-password"
              containerStyle={errors.password ? styles.inputError : undefined}
            />
          )}
        />
        {errors.password && (
          <Text className="text-danger text-xs font-semibold mt-1">{errors.password.message}</Text>
        )}
      </View>

      {/* Sign In */}
      <View className="mt-1.5">
        <PrimaryButton
          label="Sign In"
          icon="arrow-forward-circle"
          onPress={handleLogin}
          loading={isSubmitting}
        />
      </View>

      {/* Biometric */}
      {biometricEnabled && biometricAvailable && (
        <>
          <View className="flex-row items-center my-5 gap-2.5">
            <View className="flex-1 h-px bg-app-border" />
            <Text className="text-dim text-xs font-medium">or continue with</Text>
            <View className="flex-1 h-px bg-app-border" />
          </View>

          <TouchableOpacity style={styles.biometricBtn} onPress={handleBiometricLogin} activeOpacity={0.75}>
            <LinearGradient
              colors={[Colors.primary + '18', Colors.primaryDark + '0A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.biometricInner}
            >
              <View style={styles.biometricIconWrap}>
                <Ionicons name="finger-print" size={22} color={Colors.primary} />
              </View>
              <Text className="flex-1 text-primary text-md font-bold">Unlock with Biometric</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.primary + '70'} />
            </LinearGradient>
          </TouchableOpacity>
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
  labelTracking: {
    letterSpacing: 0.3,
  },
  inputError: {
    borderColor: Colors.danger + '90',
  },
  biometricBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary + '35',
  },
  biometricInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  biometricIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.primary + '18',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

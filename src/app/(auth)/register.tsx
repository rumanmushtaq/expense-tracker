import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Controller } from 'react-hook-form';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { FormLabel } from '../../components/FormLabel';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CardSection } from '../../components/CardSection';
import { useRegisterForm } from '../../hooks/useRegisterForm';

export default function RegisterScreen() {
  const router = useRouter();
  const { form, handleRegister, showPassword, togglePassword, showConfirm, toggleConfirm } = useRegisterForm();
  const { control, formState: { errors } } = form;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingTop: 70, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(500)} className="mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-1 mb-6"
            activeOpacity={0.7}
          >
            <Text className="text-primary text-sm font-bold">← Back to Login</Text>
          </TouchableOpacity>
          <Text className="text-white text-xxl font-black tracking-[-1px]">Create Account</Text>
          <Text className="text-muted text-sm mt-1">Start tracking your expenses today</Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)}>
          <CardSection>
            <View className="mb-4">
              <FormLabel>Full Name</FormLabel>
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
                  />
                )}
              />
              {errors.name && (
                <Text className="text-danger text-xs font-semibold mt-1">{errors.name.message}</Text>
              )}
            </View>

            <View className="mb-4">
              <FormLabel>Email Address</FormLabel>
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
                  />
                )}
              />
              {errors.email && (
                <Text className="text-danger text-xs font-semibold mt-1">{errors.email.message}</Text>
              )}
            </View>

            <View className="mb-4">
              <FormLabel>Password</FormLabel>
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
                    autoComplete="new-password"
                  />
                )}
              />
              {errors.password && (
                <Text className="text-danger text-xs font-semibold mt-1">{errors.password.message}</Text>
              )}
            </View>

            <View>
              <FormLabel>Confirm Password</FormLabel>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormInput
                    icon="lock-closed-outline"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="••••••••"
                    secureTextEntry={!showConfirm}
                    rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                    onRightIconPress={toggleConfirm}
                    autoComplete="new-password"
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-danger text-xs font-semibold mt-1">{errors.confirmPassword.message}</Text>
              )}
            </View>
          </CardSection>
        </Animated.View>

        {/* Create Account Button */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} className="mt-2">
          <PrimaryButton
            label={form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
            icon="checkmark-circle"
            onPress={handleRegister}
            disabled={form.formState.isSubmitting}
          />
        </Animated.View>

        {/* Login Link */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)} className="flex-row justify-center mt-8">
          <Text className="text-muted text-sm">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')} activeOpacity={0.7}>
            <Text className="text-primary text-sm font-bold">Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { FormLabel } from '../../components/FormLabel';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CardSection } from '../../components/CardSection';
import { Colors } from '../../constants/theme';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { biometricEnabled } = useAuth();
  const { form, handleLogin, handleBiometricLogin, showPassword, togglePassword, biometricAvailable } = useLoginForm();
  const { control, formState: { errors } } = form;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingTop: 80, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-10">
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: 80, height: 80, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}
          >
            <Ionicons name="wallet" size={38} color="#fff" />
          </LinearGradient>
          <Text className="text-white text-xxl font-black tracking-[-1px]">Welcome Back</Text>
          <Text className="text-muted text-sm mt-1">Sign in to your account</Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)}>
          <CardSection>
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

            <View>
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
                    autoComplete="current-password"
                  />
                )}
              />
              {errors.password && (
                <Text className="text-danger text-xs font-semibold mt-1">{errors.password.message}</Text>
              )}
            </View>
          </CardSection>
        </Animated.View>

        {/* Sign In Button */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} className="mt-2">
          <PrimaryButton
            label={form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
            icon="arrow-forward-circle"
            onPress={handleLogin}
            disabled={form.formState.isSubmitting}
          />
        </Animated.View>

        {/* Biometric Button */}
        {biometricEnabled && biometricAvailable && (
          <Animated.View entering={FadeInUp.delay(280).duration(400)} className="mt-3">
            <TouchableOpacity
              className="flex-row items-center justify-center py-3.5 rounded-theme-lg border gap-2"
              style={{ borderColor: Colors.primary + '40', backgroundColor: Colors.primary + '0A' }}
              onPress={handleBiometricLogin}
              activeOpacity={0.7}
            >
              <Ionicons name="finger-print" size={20} color={Colors.primary} />
              <Text className="text-primary text-md font-bold">Unlock with Biometric</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Register Link */}
        <Animated.View entering={FadeInUp.delay(350).duration(400)} className="flex-row justify-center mt-8">
          <Text className="text-muted text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.7}>
            <Text className="text-primary text-sm font-bold">Create Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

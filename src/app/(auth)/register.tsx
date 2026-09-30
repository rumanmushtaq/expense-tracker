import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, SlideInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors, Shadow } from '../../constants/theme';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { ConfirmModal } from '../../components/ConfirmModal';

export default function RegisterScreen() {
  const router = useRouter();
  const {
    form, handleRegister, showPassword, togglePassword, showConfirm, toggleConfirm,
    biometricModalVisible, confirmBiometric, dismissBiometric,
  } = useRegisterForm();
  const { control, formState: { errors } } = form;

  return (
    <View className="flex-1 bg-background">
      <LinearGradient colors={Colors.gradientAuth} style={StyleSheet.absoluteFill} />
      <View style={styles.glowBlob} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
        {/* Hero */}
        <Animated.View entering={FadeInDown.duration(500)} className="items-center mb-8">
          <View style={styles.iconGlow} />
          <LinearGradient
            colors={[Colors.accent, Colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name="person-add" size={36} color="#fff" />
          </LinearGradient>
          <Text className="text-white text-xxl font-black mb-1.5" style={styles.titleTracking}>
            Create Account
          </Text>
          <Text className="text-muted text-sm font-medium">Start tracking your expenses today</Text>
        </Animated.View>

        {/* Card */}
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
              loading={form.formState.isSubmitting}
            />
          </View>
        </Animated.View>

        <ConfirmModal
          visible={biometricModalVisible}
          title="Enable Biometric Login?"
          message="Use Face ID or fingerprint to sign in faster next time."
          icon="finger-print"
          iconColor={Colors.success}
          confirmLabel="Enable"
          cancelLabel="Not Now"
          confirmColor={Colors.success}
          onConfirm={confirmBiometric}
          onDismiss={dismissBiometric}
        />

        {/* Footer */}
        <Animated.View
          entering={FadeInUp.delay(380).duration(400)}
          className="flex-row justify-center mt-7 items-center"
        >
          <Text className="text-muted text-sm">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')} activeOpacity={0.7}>
            <Text className="text-primary text-sm font-black"> Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  glowBlob: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: Colors.accent + '18',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: { padding: 24, paddingTop: 70, paddingBottom: 120 },
  iconGlow: {
    position: 'absolute',
    top: 20,
    width: 130,
    height: 130,
    borderRadius: 999,
    backgroundColor: Colors.accent + '20',
    transform: [{ scale: 1.5 }],
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...Shadow.glow(Colors.accent),
  },
  titleTracking: { letterSpacing: -0.6 },
  labelTracking: { letterSpacing: 0.3 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.lg,
  },
  inputError: { borderColor: Colors.danger + '90' },
});

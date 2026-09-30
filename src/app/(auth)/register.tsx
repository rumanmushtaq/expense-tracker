import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, SlideInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors, BorderRadius, Shadow } from '../../constants/theme';
import { useRegisterForm } from '../../hooks/useRegisterForm';

export default function RegisterScreen() {
  const router = useRouter();
  const { form, handleRegister, showPassword, togglePassword, showConfirm, toggleConfirm } =
    useRegisterForm();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <View style={styles.root}>
      <LinearGradient colors={Colors.gradientAuth} style={StyleSheet.absoluteFill} />
      <View style={styles.glowBlob} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
      >
          {/* ── Header ── */}
          <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
            <View style={styles.iconGlow} />
            <LinearGradient
              colors={[Colors.accent, Colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconWrap}
            >
              <Ionicons name="person-add" size={36} color="#fff" />
            </LinearGradient>
            <Text style={styles.heroTitle}>Create Account</Text>
            <Text style={styles.heroSub}>Start tracking your expenses today</Text>
          </Animated.View>

          {/* ── Card ── */}
          <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

            {/* Name */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
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
                    containerStyle={[styles.input, errors.name && styles.inputError]}
                  />
                )}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>
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
                    containerStyle={[styles.input, errors.email && styles.inputError]}
                  />
                )}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
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
                    containerStyle={[styles.input, errors.password && styles.inputError]}
                  />
                )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>

            {/* Confirm Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Confirm Password</Text>
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
                    containerStyle={[styles.input, errors.confirmPassword && styles.inputError]}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
              )}
            </View>

            {/* Create Account Button */}
            <View style={styles.btnWrap}>
              <PrimaryButton
                label="Create Account"
                icon="checkmark-circle"
                onPress={handleRegister}
                loading={form.formState.isSubmitting}
              />
            </View>
          </Animated.View>

          {/* ── Footer ── */}
          <Animated.View entering={FadeInUp.delay(380).duration(400)} style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')} activeOpacity={0.7}>
              <Text style={styles.footerLink}> Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  scroll: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 120,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
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
  heroTitle: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  heroSub: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },

  // Card
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xxl,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.lg,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {},
  inputError: {
    borderColor: Colors.danger + '90',
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  btnWrap: {
    marginTop: 8,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
});

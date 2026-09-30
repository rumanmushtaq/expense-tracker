import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, SlideInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { FormInput } from '../../components/FormInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors, BorderRadius, Shadow } from '../../constants/theme';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { biometricEnabled } = useAuth();
  const { form, handleLogin, handleBiometricLogin, showPassword, togglePassword, biometricAvailable } =
    useLoginForm();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <View style={styles.root}>
      {/* Layered background */}
      <LinearGradient colors={Colors.gradientAuth} style={StyleSheet.absoluteFill} />
      <View style={styles.glowBlob} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Hero ── */}
          <Animated.View entering={FadeInDown.duration(600)} style={styles.hero}>
            <View style={styles.iconGlow} />
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconWrap}
            >
              <Ionicons name="wallet" size={42} color="#fff" />
            </LinearGradient>
            <Text style={styles.heroTitle}>Welcome Back</Text>
            <Text style={styles.heroSub}>Sign in to your account</Text>
          </Animated.View>

          {/* ── Card ── */}
          <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

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
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity
                  onPress={() => router.push('/(auth)/forgot-password' as any)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.forgotLink}>Forgot password?</Text>
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
                    containerStyle={[styles.input, errors.password && styles.inputError]}
                  />
                )}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>

            {/* Sign In */}
            <View style={styles.btnWrap}>
              <PrimaryButton
                label={form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                icon="arrow-forward-circle"
                onPress={handleLogin}
                disabled={form.formState.isSubmitting}
              />
            </View>

            {/* Biometric */}
            {biometricEnabled && biometricAvailable && (
              <>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.biometricBtn}
                  onPress={handleBiometricLogin}
                  activeOpacity={0.75}
                >
                  <LinearGradient
                    colors={[Colors.primary + '18', Colors.primaryDark + '0A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.biometricInner}
                  >
                    <View style={styles.biometricIconWrap}>
                      <Ionicons name="finger-print" size={22} color={Colors.primary} />
                    </View>
                    <Text style={styles.biometricText}>Unlock with Biometric</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.primary + '70'} />
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>

          {/* ── Footer ── */}
          <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.7}>
              <Text style={styles.footerLink}> Create Account</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: Colors.primary + '22',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: {
    padding: 24,
    paddingTop: 90,
    paddingBottom: 60,
  },

  // Hero
  hero: {
    alignItems: 'center',
    marginBottom: 36,
  },
  iconGlow: {
    position: 'absolute',
    top: -10,
    width: 130,
    height: 130,
    borderRadius: 999,
    backgroundColor: Colors.primary + '28',
    transform: [{ scale: 1.6 }],
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...Shadow.glow(Colors.primary),
  },
  heroTitle: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginBottom: 6,
  },
  heroSub: {
    color: Colors.textMuted,
    fontSize: 15,
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
    marginBottom: 18,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotLink: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
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
    marginTop: 6,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.textDim,
    fontSize: 12,
    fontWeight: '500',
  },

  // Biometric
  biometricBtn: {
    borderRadius: BorderRadius.lg,
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
  biometricText: {
    flex: 1,
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '700',
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

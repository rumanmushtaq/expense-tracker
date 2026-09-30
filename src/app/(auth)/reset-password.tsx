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
import { Colors, BorderRadius, Shadow } from '../../constants/theme';
import { useResetPasswordForm } from '../../hooks/useResetPasswordForm';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const {
    form,
    handleReset,
    showPassword,
    showConfirm,
    togglePassword,
    toggleConfirm,
  } = useResetPasswordForm();
  const { control, formState: { errors } } = form;

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
        {/* Hero */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.hero}>
          <View style={styles.iconGlow} />
          <LinearGradient
            colors={[Colors.success, Colors.successDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name="shield-checkmark" size={42} color="#fff" />
          </LinearGradient>
          <Text style={styles.heroTitle}>Set New Password</Text>
          <Text style={styles.heroSub}>Choose a strong password for your account</Text>
        </Animated.View>

        {/* Card */}
        <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

          {/* New Password */}
          <View style={styles.field}>
            <Text style={styles.label}>New Password</Text>
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
                  containerStyle={errors.password && styles.inputError}
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
                  icon="lock-open-outline"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Repeat your password"
                  secureTextEntry={!showConfirm}
                  rightIcon={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  onRightIconPress={toggleConfirm}
                  containerStyle={errors.confirmPassword && styles.inputError}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}
          </View>

          <View style={styles.btnWrap}>
            <PrimaryButton
              label="Set New Password"
              icon="checkmark-circle-outline"
              onPress={handleReset}
              loading={form.formState.isSubmitting}
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.footer}>
          <Text style={styles.footerText}>Remember your password?</Text>
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}> Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  glowBlob: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: Colors.success + '18',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: { padding: 24, paddingTop: 90, paddingBottom: 60 },

  hero: { alignItems: 'center', marginBottom: 36 },
  iconGlow: {
    position: 'absolute',
    top: -10,
    width: 130,
    height: 130,
    borderRadius: 999,
    backgroundColor: Colors.success + '22',
    transform: [{ scale: 1.6 }],
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...Shadow.glow(Colors.success),
  },
  heroTitle: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
    marginBottom: 6,
  },
  heroSub: { color: Colors.textMuted, fontSize: 15, fontWeight: '500' },

  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xxl,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.lg,
  },
  field: { marginBottom: 18 },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  inputError: { borderColor: Colors.danger + '90' },
  errorText: { color: Colors.danger, fontSize: 12, fontWeight: '600', marginTop: 5 },
  btnWrap: { marginTop: 6 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    alignItems: 'center',
  },
  footerText: { color: Colors.textMuted, fontSize: 14 },
  footerLink: { color: Colors.primary, fontSize: 14, fontWeight: '800' },
});

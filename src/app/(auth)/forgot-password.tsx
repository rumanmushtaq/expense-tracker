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
import { useForgotPasswordForm } from '../../hooks/useForgotPasswordForm';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { form, handleSend, sent } = useForgotPasswordForm();
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
            colors={[Colors.warning, Colors.warningDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name="lock-open-outline" size={42} color="#fff" />
          </LinearGradient>
          <Text style={styles.heroTitle}>Forgot Password?</Text>
          <Text style={styles.heroSub}>We'll send a reset link to your email</Text>
        </Animated.View>

        {/* Card */}
        <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>
          {sent ? (
            /* Success state */
            <View style={styles.successWrap}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={52} color={Colors.success} />
              </View>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successBody}>
                We've sent a password reset link to your email address. Tap the link to set a new password.
              </Text>
            </View>
          ) : (
            <>
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
                      containerStyle={errors.email && styles.inputError}
                    />
                  )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </View>

              <View style={styles.btnWrap}>
                <PrimaryButton
                  label="Send Reset Link"
                  icon="send-outline"
                  onPress={handleSend}
                  loading={form.formState.isSubmitting}
                />
              </View>
            </>
          )}
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)} style={styles.footer}>
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={16} color={Colors.primary} />
            <Text style={styles.backText}>Back to Sign In</Text>
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
    backgroundColor: Colors.warning + '18',
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
    backgroundColor: Colors.warning + '22',
    transform: [{ scale: 1.6 }],
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    ...Shadow.glow(Colors.warning),
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

  successWrap: { alignItems: 'center', paddingVertical: 12 },
  successIcon: { marginBottom: 16 },
  successTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.4,
  },
  successBody: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: Colors.primary, fontSize: 14, fontWeight: '700' },
});

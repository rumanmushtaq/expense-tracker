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
import { useForgotPasswordForm } from '../../hooks/useForgotPasswordForm';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { form, handleSend, sent } = useForgotPasswordForm();
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
        <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-9">
          <View style={styles.iconGlow} />
          <LinearGradient
            colors={[Colors.warning, Colors.warningDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name="lock-open-outline" size={42} color="#fff" />
          </LinearGradient>
          <Text className="text-white text-xxl font-black mb-1.5" style={styles.titleTracking}>
            Forgot Password?
          </Text>
          <Text className="text-muted text-md font-medium">We'll send a reset link to your email</Text>
        </Animated.View>

        {/* Card */}
        <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>
          {sent ? (
            <View className="items-center py-3">
              <View className="mb-4">
                <Ionicons name="checkmark-circle" size={52} color={Colors.success} />
              </View>
              <Text className="text-white text-xl font-extrabold mb-2.5" style={styles.titleTracking}>
                Check Your Email
              </Text>
              <Text className="text-muted text-sm text-center" style={styles.successBody}>
                We've sent a password reset link to your email address. Tap the link to set a new password.
              </Text>
            </View>
          ) : (
            <>
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

              <View className="mt-1.5">
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
        <Animated.View entering={FadeInUp.delay(400).duration(400)} className="flex-row justify-center mt-7">
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            className="flex-row items-center gap-1.5"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={16} color={Colors.primary} />
            <Text className="text-primary text-sm font-bold">Back to Sign In</Text>
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
    backgroundColor: Colors.warning + '18',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: { padding: 24, paddingTop: 90, paddingBottom: 60 },
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
  titleTracking: { letterSpacing: -0.8 },
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
  successBody: { lineHeight: 22 },
});

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
import { useResetPasswordForm } from '../../hooks/useResetPasswordForm';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { form, handleReset, showPassword, showConfirm, togglePassword, toggleConfirm } =
    useResetPasswordForm();
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
            colors={[Colors.success, Colors.successDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}
          >
            <Ionicons name="shield-checkmark" size={42} color="#fff" />
          </LinearGradient>
          <Text className="text-white text-xxl font-black mb-1.5" style={styles.titleTracking}>
            Set New Password
          </Text>
          <Text className="text-muted text-md font-medium">
            Choose a strong password for your account
          </Text>
        </Animated.View>

        {/* Card */}
        <Animated.View entering={SlideInUp.delay(180).duration(500)} style={styles.card}>

          {/* New Password */}
          <View className="mb-[18px]">
            <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
              New Password
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
                  placeholder="Min 6 characters"
                  secureTextEntry={!showPassword}
                  rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  onRightIconPress={togglePassword}
                  containerStyle={errors.password ? styles.inputError : undefined}
                />
              )}
            />
            {errors.password && (
              <Text className="text-danger text-xs font-semibold mt-1">{errors.password.message}</Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="mb-[18px]">
            <Text className="text-secondary text-sm font-semibold mb-2" style={styles.labelTracking}>
              Confirm Password
            </Text>
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
                  containerStyle={errors.confirmPassword ? styles.inputError : undefined}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-danger text-xs font-semibold mt-1">{errors.confirmPassword.message}</Text>
            )}
          </View>

          <View className="mt-1.5">
            <PrimaryButton
              label="Set New Password"
              icon="checkmark-circle-outline"
              onPress={handleReset}
              loading={form.formState.isSubmitting}
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          entering={FadeInUp.delay(400).duration(400)}
          className="flex-row justify-center mt-7 items-center"
        >
          <Text className="text-muted text-sm">Remember your password?</Text>
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
    backgroundColor: Colors.success + '18',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: { padding: 24, paddingTop: 90, paddingBottom: 60 },
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
});

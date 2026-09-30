import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AuthHero } from '../../components/AuthHero';
import { ResetPasswordFormCard } from '../../components/ResetPasswordFormCard';
import { AuthFooterLink } from '../../components/AuthFooterLink';
import { Colors } from '../../constants/theme';
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
        <AuthHero
          icon="shield-checkmark"
          gradientColors={[Colors.success, Colors.successDark]}
          glowColor={Colors.success}
          title="Set New Password"
          subtitle="Choose a strong password for your account"
        />

        <ResetPasswordFormCard
          control={control}
          errors={errors}
          showPassword={showPassword}
          togglePassword={togglePassword}
          showConfirm={showConfirm}
          toggleConfirm={toggleConfirm}
          handleReset={handleReset}
          isSubmitting={form.formState.isSubmitting}
        />

        <AuthFooterLink
          prompt="Remember your password?"
          linkText="Sign In"
          onPress={() => router.replace('/(auth)/login')}
        />
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
});

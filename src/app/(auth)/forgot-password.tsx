import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AuthHero } from '../../components/AuthHero';
import { ForgotPasswordFormCard } from '../../components/ForgotPasswordFormCard';
import { AuthFooterLink } from '../../components/AuthFooterLink';
import { Colors } from '../../constants/theme';
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
        <AuthHero
          icon="lock-open-outline"
          gradientColors={[Colors.warning, Colors.warningDark]}
          glowColor={Colors.warning}
          title="Forgot Password?"
          subtitle="We'll send a reset link to your email"
        />

        <ForgotPasswordFormCard
          control={control}
          errors={errors}
          sent={sent}
          handleSend={handleSend}
          isSubmitting={form.formState.isSubmitting}
        />

        <AuthFooterLink
          icon="arrow-back"
          linkText="Back to Sign In"
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
    backgroundColor: Colors.warning + '18',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: { padding: 24, paddingTop: 90, paddingBottom: 60 },
});

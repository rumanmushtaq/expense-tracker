import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AuthHero } from '../../components/AuthHero';
import { RegisterFormCard } from '../../components/RegisterFormCard';
import { ConfirmModal } from '../../components/ConfirmModal';
import { Colors } from '../../constants/theme';
import { useRegisterForm } from '../../hooks/useRegisterForm';

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
        <AuthHero
          icon="person-add"
          gradientColors={[Colors.accent, Colors.primary]}
          glowColor={Colors.accent}
          title="Create Account"
          subtitle="Start tracking your expenses today"
        />

        <RegisterFormCard
          control={control}
          errors={errors}
          showPassword={showPassword}
          togglePassword={togglePassword}
          showConfirm={showConfirm}
          toggleConfirm={toggleConfirm}
          handleRegister={handleRegister}
          isSubmitting={form.formState.isSubmitting}
        />

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
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AuthHero } from '../../components/AuthHero';
import { LoginFormCard } from '../../components/LoginFormCard';
import { Colors } from '../../constants/theme';
import { useLoginForm } from '../../hooks/useLoginForm';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { biometricEnabled } = useAuth();
  const { form, handleLogin, handleBiometricLogin, showPassword, togglePassword, biometricAvailable } =
    useLoginForm();
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
          icon="wallet"
          gradientColors={[Colors.primaryLight, Colors.primaryDark]}
          glowColor={Colors.primary}
          title="Welcome Back"
          subtitle="Sign in to your account"
        />

        <LoginFormCard
          control={control}
          errors={errors}
          showPassword={showPassword}
          togglePassword={togglePassword}
          handleLogin={handleLogin}
          isSubmitting={form.formState.isSubmitting}
          biometricEnabled={biometricEnabled}
          biometricAvailable={biometricAvailable}
          handleBiometricLogin={handleBiometricLogin}
          onForgotPassword={() => router.push('/(auth)/forgot-password' as any)}
        />

        <Animated.View
          entering={FadeInUp.delay(400).duration(400)}
          className="flex-row justify-center mt-7 items-center"
        >
          <Text className="text-muted text-sm">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')} activeOpacity={0.7}>
            <Text className="text-primary text-sm font-black"> Create Account</Text>
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
    backgroundColor: Colors.primary + '22',
    transform: [{ scaleX: 1.6 }],
  },
  scroll: {
    padding: 24,
    paddingTop: 90,
    paddingBottom: 60,
  },
});

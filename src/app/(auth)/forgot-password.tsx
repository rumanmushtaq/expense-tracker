import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { AuthHero } from '../../components/AuthHero';
import { ForgotPasswordFormCard } from '../../components/ForgotPasswordFormCard';
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
});

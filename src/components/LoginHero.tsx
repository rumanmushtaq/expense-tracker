import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Shadow } from '../constants/theme';

export function LoginHero() {
  return (
    <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-9">
      <View style={styles.iconGlow} />
      <LinearGradient
        colors={[Colors.primaryLight, Colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconWrap}
      >
        <Ionicons name="wallet" size={42} color="#fff" />
      </LinearGradient>
      <Text className="text-white text-xxl font-black mb-1.5" style={styles.heroTitle}>
        Welcome Back
      </Text>
      <Text className="text-muted text-md font-medium">Sign in to your account</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
    letterSpacing: -0.8,
  },
});

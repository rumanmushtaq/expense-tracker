import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Shadow } from '../constants/theme';

interface AuthHeroProps {
  icon: string;
  gradientColors: readonly [string, string];
  glowColor: string;
  title: string;
  subtitle: string;
}

export function AuthHero({ icon, gradientColors, glowColor, title, subtitle }: AuthHeroProps) {
  return (
    <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-9">
      <View
        style={[
          styles.iconGlow,
          { backgroundColor: glowColor + '28' },
        ]}
      />
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.iconWrap, Shadow.glow(glowColor)]}
      >
        <Ionicons name={icon as any} size={42} color="#fff" />
      </LinearGradient>
      <Text className="text-white text-xxl font-black mb-1.5" style={styles.titleTracking}>
        {title}
      </Text>
      <Text className="text-muted text-md font-medium">{subtitle}</Text>
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
    transform: [{ scale: 1.6 }],
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleTracking: {
    letterSpacing: -0.8,
  },
});

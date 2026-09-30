import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Shadow, BorderRadius, Spacing } from '../constants/theme';

interface Props {
  label: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
  gradientColors?: [string, string];
}

export const PrimaryButton = ({
  label,
  icon,
  onPress,
  disabled = false,
  gradientColors = [Colors.primary, Colors.primaryLight],
}: Props) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
    <LinearGradient
      colors={disabled ? [Colors.textMuted, Colors.textMuted] : gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.button, !disabled && Shadow.glow(gradientColors[0])]}
    >
      <Ionicons name={icon as any} size={22} color="#fff" />
      <Text className="text-white text-lg font-extrabold tracking-[0.3px]">{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
});

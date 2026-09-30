import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Shadow, BorderRadius, Spacing } from '../constants/theme';

interface Props {
  label: string;
  icon: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  gradientColors?: [string, string];
}

export const PrimaryButton = ({
  label,
  icon,
  onPress,
  disabled = false,
  loading = false,
  gradientColors = [Colors.primary, Colors.primaryLight],
}: Props) => (
  <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
    <LinearGradient
      colors={(disabled || loading) ? [Colors.textDim, Colors.textMuted] : gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.button, !(disabled || loading) && Shadow.glow(gradientColors[0])]}
    >
      {loading
        ? <ActivityIndicator size={22} color={Colors.text} />
        : <Ionicons name={icon as any} size={22} color={Colors.text} />
      }
      <Text style={styles.label}>{label}</Text>
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
  label: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});

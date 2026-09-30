import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props {
  icon: string;
  title: string;
  color: string;
}

export const SectionHeader = ({ icon, title, color }: Props) => (
  <View style={styles.header}>
    <View style={[styles.iconBadge, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon as any} size={18} color={color} />
    </View>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
});

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../constants/theme';

interface Props {
  children: string;
}

export const FormLabel = ({ children }: Props) => (
  <Text style={styles.label}>{children}</Text>
);

const styles = StyleSheet.create({
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

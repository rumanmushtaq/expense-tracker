import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';

interface Props extends TextInputProps {
  icon?: string;
  prefix?: string;
  containerStyle?: object;
}

export const FormInput = ({ icon, prefix, multiline, style, containerStyle, ...rest }: Props) => (
  <View style={[styles.container, multiline && styles.multilineContainer, containerStyle]}>
    {icon && (
      <Ionicons name={icon as any} size={16} color={Colors.textMuted} style={styles.icon} />
    )}
    {prefix && <Text style={styles.prefix}>{prefix}</Text>}
    <TextInput
      style={[styles.input, multiline && styles.multilineInput, style]}
      placeholderTextColor={Colors.textDim}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : undefined}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  multilineContainer: {
    alignItems: 'flex-start',
  },
  icon: {
    paddingLeft: Spacing.md,
  },
  prefix: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
    fontWeight: '700',
    paddingLeft: Spacing.md,
    letterSpacing: 0.5,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  multilineInput: {
    height: 80,
  },
});

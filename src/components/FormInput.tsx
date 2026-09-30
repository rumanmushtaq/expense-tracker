import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface Props extends TextInputProps {
  icon?: string;
  prefix?: string;
  containerStyle?: object;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export const FormInput = ({
  icon,
  prefix,
  multiline,
  style,
  containerStyle,
  rightIcon,
  onRightIconPress,
  ...rest
}: Props) => (
  <View
    style={[
      styles.container,
      multiline && styles.multiline,
      containerStyle,
    ]}
  >
    {icon && (
      <Ionicons
        name={icon as any}
        size={18}
        color={Colors.textMuted}
        style={styles.iconLeft}
      />
    )}
    {prefix && (
      <Text style={styles.prefix}>{prefix}</Text>
    )}
    <TextInput
      style={[styles.input, multiline && styles.multilineInput, style]}
      placeholderTextColor={Colors.textDim}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      {...rest}
    />
    {rightIcon && (
      <TouchableOpacity onPress={onRightIconPress} style={styles.iconRight} activeOpacity={0.7}>
        <Ionicons name={rightIcon as any} size={19} color={Colors.textMuted} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
    minHeight: 52,
  },
  multiline: {
    alignItems: 'flex-start',
    minHeight: 88,
  },
  iconLeft: {
    paddingLeft: 14,
    paddingRight: 2,
  },
  prefix: {
    color: Colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 14,
    paddingRight: 4,
    letterSpacing: 0.5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    color: Colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  multilineInput: {
    paddingTop: 14,
    height: 88,
  },
  iconRight: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
});

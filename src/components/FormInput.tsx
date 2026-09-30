import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface Props extends TextInputProps {
  icon?: string;
  prefix?: string;
  containerStyle?: object;
}

export const FormInput = ({ icon, prefix, multiline, style, containerStyle, ...rest }: Props) => (
  <View
    className={`flex-row bg-surface border border-glass-border rounded-theme-lg overflow-hidden ${multiline ? 'items-start' : 'items-center'}`}
    style={containerStyle}
  >
    {icon && (
      <Ionicons name={icon as any} size={16} color={Colors.textMuted} style={styles.icon} />
    )}
    {prefix && (
      <Text className="text-muted text-md font-bold pl-4 tracking-[0.5px]">{prefix}</Text>
    )}
    <TextInput
      className={`flex-1 p-4 text-white text-md ${multiline ? 'h-20' : ''}`}
      placeholderTextColor={Colors.textDim}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : undefined}
      style={style}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  icon: { paddingLeft: 16 },
});

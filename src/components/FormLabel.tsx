import React from 'react';
import { Text } from 'react-native';

interface Props {
  children: string;
}

export const FormLabel = ({ children }: Props) => (
  <Text className="text-secondary text-xs font-bold mb-2 uppercase tracking-[0.8px]">
    {children}
  </Text>
);

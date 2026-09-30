import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import type { AuthFooterLinkProps } from '@/types/AuthFooterLink';

export function AuthFooterLink({ prompt, linkText, onPress, delay = 400, icon }: AuthFooterLinkProps) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay).duration(400)}
      className="flex-row justify-center mt-7 items-center"
    >
      {icon ? (
        <TouchableOpacity onPress={onPress} className="flex-row items-center gap-1.5" activeOpacity={0.7}>
          <Ionicons name={icon as any} size={16} color={Colors.primary} />
          <Text className="text-primary text-sm font-bold">{linkText}</Text>
        </TouchableOpacity>
      ) : (
        <>
          {prompt && <Text className="text-muted text-sm">{prompt}</Text>}
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <Text className="text-primary text-sm font-black"> {linkText}</Text>
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
}

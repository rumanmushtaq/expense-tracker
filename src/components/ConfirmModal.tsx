import React from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, BorderRadius } from '../constants/theme';
import type { ConfirmModalProps } from '@/types/ConfirmModal';

export const ConfirmModal = ({
  visible,
  title,
  message,
  icon = 'alert-circle-outline',
  iconColor = Colors.primary,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmColor = Colors.primary,
  onConfirm,
  onDismiss,
}: ConfirmModalProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onDismiss}
    statusBarTranslucent
  >
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
      <Animated.View entering={FadeInDown.duration(280).springify()} style={styles.card}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: iconColor + '15', borderColor: iconColor + '28' },
          ]}
        >
          <Ionicons name={icon as any} size={28} color={iconColor} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onDismiss} activeOpacity={0.7}>
            <Text style={styles.cancelText}>{cancelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.confirmBtn, { backgroundColor: confirmColor }]}
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xxl,
    padding: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

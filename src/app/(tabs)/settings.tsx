import React from 'react';
import { ScrollView } from 'react-native';
import { ConfirmModal } from '../../components/ConfirmModal';
import { SettingsFormContent } from '../../components/SettingsFormContent';
import { Colors } from '../../constants/theme';
import { useSettingsForm, CURRENCIES } from '../../hooks/useSettingsForm';
import { useAuth } from '../../context/AuthContext';

export { CURRENCIES };

export default function SettingsScreen() {
  const {
    form, handleSave, biometricEnabled, handleBiometricToggle,
    signOutModalVisible, requestSignOut, confirmSignOut, dismissSignOut,
  } = useSettingsForm();
  const { user } = useAuth();
  const { control, formState: { errors }, watch } = form;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <SettingsFormContent
        control={control}
        errors={errors}
        currency={watch('currency')}
        user={user}
        biometricEnabled={biometricEnabled}
        handleBiometricToggle={handleBiometricToggle}
        handleSave={handleSave}
        isSubmitting={form.formState.isSubmitting}
        requestSignOut={requestSignOut}
      />

      <ConfirmModal
        visible={signOutModalVisible}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        icon="log-out-outline"
        iconColor={Colors.danger}
        confirmLabel="Sign Out"
        confirmColor={Colors.danger}
        onConfirm={confirmSignOut}
        onDismiss={dismissSignOut}
      />
    </ScrollView>
  );
}

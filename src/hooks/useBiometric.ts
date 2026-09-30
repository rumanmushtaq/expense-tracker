import { useCallback } from 'react';
import * as LocalAuth from 'expo-local-authentication';

export function useBiometric() {
  const isAvailable = useCallback(async (): Promise<boolean> => {
    const hardware = await LocalAuth.hasHardwareAsync();
    const enrolled = await LocalAuth.isEnrolledAsync();
    return hardware && enrolled;
  }, []);

  const authenticate = useCallback(async (): Promise<boolean> => {
    try {
      const result = await LocalAuth.authenticateAsync({
        promptMessage: 'Verify your identity',
        fallbackLabel: 'Use Password',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });
      return result.success;
    } catch {
      return false;
    }
  }, []);

  return { isAvailable, authenticate };
}

import { useEffect } from 'react';
import { registerBackgroundTask, requestNotificationPermissions } from '../utils/notifications';

export function useAppSetup() {
  useEffect(() => {
    requestNotificationPermissions();
    registerBackgroundTask();
  }, []);
}

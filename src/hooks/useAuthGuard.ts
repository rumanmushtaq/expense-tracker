import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth';

export function useAuthGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // PASSWORD_RECOVERY deep-link → reset-password screen
  useEffect(() => {
    const { data: { subscription } } = authApi.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        router.replace('/(auth)/reset-password');
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  // Route guard — once auth resolves, navigate to the correct screen and reveal the app
  useEffect(() => {
    if (loading) return;

    const inAuth = segments[0] === '(auth)';
    const onResetPassword = segments[1] === 'reset-password';

    if (!user && !inAuth) router.replace('/(auth)/login');
    else if (user && inAuth && !onResetPassword) router.replace('/(tabs)');

    SplashScreen.hideAsync();
  }, [user, loading, segments, router]);
}

import '../../global.css';
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { ExpenseProvider } from '../context/ExpenseContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { authApi } from '../api/auth';
import { supabase } from '../config/supabase';

// Keep the native splash visible until auth state is known — prevents login flash on refresh
SplashScreen.preventAutoHideAsync();

function AuthGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Handle Supabase PASSWORD_RECOVERY event → navigate to reset-password
  useEffect(() => {
    const { data: { subscription } } = authApi.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        router.replace('/(auth)/reset-password');
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  // Auth guard — runs once loading is resolved, then hides the splash
  useEffect(() => {
    if (loading) return;

    const inAuth = segments[0] === '(auth)';
    const onResetPassword = segments[1] === 'reset-password';

    if (!user && !inAuth) router.replace('/(auth)/login');
    else if (user && inAuth && !onResetPassword) router.replace('/(tabs)');

    // Navigation state is set — safe to reveal the app now
    SplashScreen.hideAsync();
  }, [user, loading, segments, router]);

  return null;
}

export default function RootLayout() {
  // Handle Supabase deep links for password recovery
  useEffect(() => {
    const handleUrl = async (url: string) => {
      if (!url.includes('reset-password')) return;
      const fragment = url.split('#')[1];
      if (!fragment) return;
      const params = new URLSearchParams(fragment);
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');
      const type = params.get('type');
      if (type === 'recovery' && access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
      }
    };

    Linking.getInitialURL().then((url) => { if (url) handleUrl(url); });
    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  return (
    <AuthProvider>
      <ExpenseProvider>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <AuthGuard />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </ExpenseProvider>
    </AuthProvider>
  );
}

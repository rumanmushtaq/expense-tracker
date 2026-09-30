import '../../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { ExpenseProvider } from '../context/ExpenseContext';
import { AuthProvider } from '../context/AuthContext';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useDeepLink } from '../hooks/useDeepLink';

SplashScreen.preventAutoHideAsync();

function AuthGuard() {
  useAuthGuard();
  useDeepLink();
  return null;
}

export default function RootLayout() {
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

import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../api/auth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  biometricEnabled: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<boolean>;
  setBiometricEnabled: (value: boolean) => Promise<void>;
  resetPassword: (email: string, redirectTo?: string) => Promise<void>;
  setNewPassword: (newPassword: string) => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const BIO_KEY = 'biometric_enabled';

function toAuthUser(supabaseUser: any): AuthUser {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name ?? supabaseUser.email?.split('@')[0] ?? 'User',
    email: supabaseUser.email ?? '',
  };
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  biometricEnabled: false,

  login: async (email, password) => {
    await authApi.signIn(email, password);
  },
  register: async (name, email, password) => {
    await authApi.signUp(name, email, password);
  },
  logout: async () => {
    await authApi.signOut();
  },
  restoreSession: async () => {
    const session = await authApi.getSession();
    if (!session?.user) return false;
    set({ user: toAuthUser(session.user) });
    return true;
  },
  setBiometricEnabled: async (value) => {
    await SecureStore.setItemAsync(BIO_KEY, String(value));
    set({ biometricEnabled: value });
  },
  resetPassword: async (email, redirectTo) => {
    await authApi.resetPassword(email, redirectTo);
  },
  setNewPassword: async (newPassword) => {
    await authApi.setNewPassword(newPassword);
  },
  updateProfile: async (name) => {
    const updatedUser = await authApi.updateProfile(name);
    if (updatedUser) set({ user: toAuthUser(updatedUser) });
  },
  updatePassword: async (currentPassword, newPassword) => {
    const { user } = get();
    if (!user?.email) throw new Error('Not authenticated.');
    await authApi.updatePassword(user.email, currentPassword, newPassword);
  },
}));

// Initialize store once
SecureStore.getItemAsync(BIO_KEY).then((val) => {
  useAuth.setState({ biometricEnabled: val === 'true' });
});

authApi.onAuthStateChange((_event, session) => {
  useAuth.setState({
    user: session?.user ? toAuthUser(session.user) : null,
    loading: false,
  });
});

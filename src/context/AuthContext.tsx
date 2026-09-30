import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { authApi } from '../api/auth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  biometricEnabled: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<boolean>;
  setBiometricEnabled: (value: boolean) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (name: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const BIO_KEY = '@biometric_enabled';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAuthUser(supabaseUser: any): AuthUser {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.name ?? supabaseUser.email?.split('@')[0] ?? 'User',
    email: supabaseUser.email ?? '',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [biometricEnabled, setBioState] = useState<boolean>(false);

  useEffect(() => {
    SecureStore.getItemAsync(BIO_KEY).then((val) => setBioState(val === 'true'));

    const { data: { subscription } } = authApi.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toAuthUser(session.user) : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await authApi.signIn(email, password);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await authApi.signUp(name, email, password);
  }, []);

  const logout = useCallback(async () => {
    await authApi.signOut();
  }, []);

  const restoreSession = useCallback(async (): Promise<boolean> => {
    const session = await authApi.getSession();
    if (!session?.user) return false;
    setUser(toAuthUser(session.user));
    return true;
  }, []);

  const setBiometricEnabled = useCallback(async (value: boolean) => {
    await SecureStore.setItemAsync(BIO_KEY, String(value));
    setBioState(value);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await authApi.resetPassword(email);
  }, []);

  const updateProfile = useCallback(async (name: string) => {
    const updatedUser = await authApi.updateProfile(name);
    if (updatedUser) setUser(toAuthUser(updatedUser));
  }, []);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    if (!user?.email) throw new Error('Not authenticated.');
    await authApi.updatePassword(user.email, currentPassword, newPassword);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, loading, biometricEnabled, login, register, logout, restoreSession, setBiometricEnabled, resetPassword, updateProfile, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

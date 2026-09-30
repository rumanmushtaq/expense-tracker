import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  password: string;
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
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = '@auth_user';
const USERS_KEY = '@auth_users';
const BIO_KEY = '@biometric_enabled';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [biometricEnabled, setBioState] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          const raw = await AsyncStorage.getItem(USER_KEY);
          if (raw) setUser(JSON.parse(raw));
        }
        const bio = await AsyncStorage.getItem(BIO_KEY);
        setBioState(bio === 'true');
      } catch {
        // silently ignore
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users: StoredUser[] = raw ? JSON.parse(raw) : [];
    const found = users?.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    );
    if (!found) throw new Error('Invalid email or password.');
    const { password: _, ...safeUser } = found;
    await SecureStore.setItemAsync(TOKEN_KEY, uuidv4());
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users: StoredUser[] = raw ? JSON.parse(raw) : [];
    if (users?.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: StoredUser = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _, ...safeUser } = newUser;
    await SecureStore.setItemAsync(TOKEN_KEY, uuidv4());
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
  }, []);

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // Called after successful biometric — skips password, re-uses stored session
  const restoreSession = useCallback(async (): Promise<boolean> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) return false;
      const raw = await AsyncStorage.getItem(USER_KEY);
      if (!raw) return false;
      setUser(JSON.parse(raw));
      return true;
    } catch {
      return false;
    }
  }, []);

  const setBiometricEnabled = useCallback(async (value: boolean) => {
    await AsyncStorage.setItem(BIO_KEY, String(value));
    setBioState(value);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, biometricEnabled, login, register, logout, restoreSession, setBiometricEnabled }}
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

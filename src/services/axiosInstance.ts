import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.expense-tracker.dev/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request interceptor ────────────────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Attach auth token if available (swap in SecureStore / AsyncStorage later)
    const token: string | null = null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response interceptor ───────────────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired — refresh or force logout here
      console.warn('[API] Unauthorized — token may be expired');
    }

    if (status === 403) {
      console.warn('[API] Forbidden — insufficient permissions');
    }

    if (status && status >= 500) {
      console.error('[API] Server error', status, error.response?.data);
    }

    return Promise.reject(error);
  },
);

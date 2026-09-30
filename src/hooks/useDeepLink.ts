import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { supabase } from '../config/supabase';

async function handleRecoveryUrl(url: string) {
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
}

export function useDeepLink() {
  useEffect(() => {
    Linking.getInitialURL().then((url) => { if (url) handleRecoveryUrl(url); });
    const sub = Linking.addEventListener('url', ({ url }) => handleRecoveryUrl(url));
    return () => sub.remove();
  }, []);
}

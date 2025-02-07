import { ACCESS_TOKEN_KEY } from '@/constants/auth';

import PersistCache from '.';

export const setAccessToken = (accessToken: string) => {
  if (accessToken) {
    PersistCache.save(ACCESS_TOKEN_KEY, accessToken);
  }
};

export const getAccessToken = (): string | null => {
  const token = PersistCache.read(ACCESS_TOKEN_KEY);
  console.log({ token });
  return token || null;
};

export const clearAccessToken = (): void => {
  PersistCache.remove(ACCESS_TOKEN_KEY);
};

import { ACCESS_TOKEN_KEY } from '@/constants/auth';

import PersistCache from '.';

export const setAccessToken = (accessToken: string) => {
  PersistCache.save(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
};

export const getAccessToken = (): { accessToken: string } => {
  let response;
  try {
    response = JSON.parse(PersistCache.read(ACCESS_TOKEN_KEY) || '');
  } catch {
    response = { accessToken: '' };
  }

  return response;
};

export const clearAccessToken = (): void => {
  PersistCache.remove(ACCESS_TOKEN_KEY);
};

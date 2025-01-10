import { CurrentUserType } from '@/types/user';
import PersistCache from '.';
import { USER_INFO_KEY } from '@/constants/auth';

export const setUserToCache = (data: CurrentUserType) => {
  PersistCache.save(USER_INFO_KEY, JSON.stringify(data));
};

export const getUserFromCache = () => {
  const user = PersistCache.read(USER_INFO_KEY);

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const clearUserFromCache = (): void => {
  PersistCache.remove(USER_INFO_KEY);
};

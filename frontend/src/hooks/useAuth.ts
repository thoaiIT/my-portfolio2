import { setUserToCache, clearUserFromCache } from '@/lib/persistCache/auth';
import { clearAccessToken, setAccessToken } from '@/lib/persistCache/token';
import useAuthStore from '@/store/auth.store';
import { CurrentUserType } from '@/types/user';

export const useAuth = () => {
  const { currentUser, setCurrentUser } = useAuthStore();
  const login = (user: CurrentUserType, token: string) => {
    updateUserInfo(user);
    setAccessToken(token);
  };

  const logout = () => {
    setCurrentUser(null);
    clearUserFromCache();
    clearAccessToken();
  };

  const updateUserInfo = (user: CurrentUserType) => {
    setCurrentUser(user);
    setUserToCache(user);
  };

  const updateToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };

  return {
    currentUser,
    login,
    logout,
    updateUserInfo,
    updateToken,
  };
};

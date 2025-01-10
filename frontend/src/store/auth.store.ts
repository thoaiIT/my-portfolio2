import { getUserFromCache } from '@/lib/persistCache/auth';
import { CurrentUserType } from '@/types/user';
import { create } from 'zustand';

type AuthStateType = {
  currentUser: CurrentUserType | null;
  setCurrentUser: (userInfo: CurrentUserType | null) => void;
  getCurrentUser: () => CurrentUserType | null;
  isAuthenticated: () => boolean;
};

const useAuthStore = create<AuthStateType>((set, get) => ({
  currentUser: null,
  setCurrentUser: (userInfo: CurrentUserType | null) =>
    set({ currentUser: userInfo }),
  getCurrentUser: () => get().currentUser,
  isAuthenticated: () => {
    const user = getUserFromCache();
    return !!user && JSON.stringify(user) !== '{}';
  },
}));

const userInfo = getUserFromCache();
useAuthStore.setState({ currentUser: userInfo });

export default useAuthStore;

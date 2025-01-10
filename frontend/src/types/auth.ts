import { CurrentUserType } from './user';

export type LoginResponse = {
  login: {
    token: string;
    user: CurrentUserType;
  };
};

export type LoginInput = {
  email: string;
  password: string;
};

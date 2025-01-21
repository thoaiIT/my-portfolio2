import { CurrentUserType } from './user';

export type LoginResponseType = {
  login: {
    token: string;
    user: CurrentUserType;
  };
};

export type LoginInputType = {
  email: string;
  password: string;
};

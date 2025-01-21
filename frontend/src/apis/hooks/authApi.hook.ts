import { MutationTuple, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../queries/auth';
import { LoginInputType, LoginResponseType } from '@/types/auth';

export const useLoginApi = (): MutationTuple<
  LoginResponseType,
  LoginInputType
> => {
  return useMutation(LOGIN_MUTATION);
};

import { MutationTuple, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../queries/auth';
import { LoginInput, LoginResponse } from '@/types/auth';

export const useLoginApi = (): MutationTuple<LoginResponse, LoginInput> => {
  return useMutation(LOGIN_MUTATION);
};

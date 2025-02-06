import {
  CreateSocialInputType,
  CreateSocialResponseType,
  GetSocialsResponseType,
} from '@/types/social';
import {
  MutationTuple,
  QueryResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import { CREATE_SOCIAL_MUTATION, GET_SOCIALS } from '../queries/social';

export const useCreateSocialApi = (): MutationTuple<
  CreateSocialResponseType,
  CreateSocialInputType
> => {
  return useMutation(CREATE_SOCIAL_MUTATION);
};

export const useGetSocialsApi = (): QueryResult<GetSocialsResponseType> => {
  return useQuery(GET_SOCIALS);
};

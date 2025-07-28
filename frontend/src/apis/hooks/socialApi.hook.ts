import {
  CreateSocialInputType,
  CreateSocialResponseType,
  DeleteSocialInputType,
  DeleteSocialResponseType,
  GetSocialsResponseType,
  UpdateSocialInputType,
  UpdateSocialResponseType,
} from '@/types/social';
import {
  MutationTuple,
  QueryResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  CREATE_SOCIAL_MUTATION,
  DELETE_SOCIAL_MUTATION,
  GET_SOCIALS,
  UPDATE_SOCIAL_MUTATION,
} from '../queries/social';

export const useCreateSocialApi = (): MutationTuple<
  CreateSocialResponseType,
  CreateSocialInputType
> => {
  return useMutation(CREATE_SOCIAL_MUTATION);
};

export const useGetSocialsApi = (): QueryResult<GetSocialsResponseType> => {
  return useQuery(GET_SOCIALS);
};

export const useUpdateSocialApi = (): MutationTuple<
  UpdateSocialResponseType,
  UpdateSocialInputType
> => {
  return useMutation(UPDATE_SOCIAL_MUTATION);
};

export const useDeleteSocialApi = (): MutationTuple<
  DeleteSocialResponseType,
  DeleteSocialInputType
> => {
  return useMutation(DELETE_SOCIAL_MUTATION);
};

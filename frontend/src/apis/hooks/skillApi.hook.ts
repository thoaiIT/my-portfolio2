import {
  MutationTuple,
  QueryResult,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  CREATE_SKILL_MUTATION,
  DELETE_SKILL_MUTATION,
  GET_SKILLS,
  UPDATE_SKILL_MUTATION,
} from '../queries/skill';
import {
  CreateSkillInputType,
  CreateSkillResponseType,
  DeleteSkillInputType,
  DeleteSkillResponseType,
  GetSkillsResponseType,
  UpdateSkillInputType,
  UpdateSkillResponseType,
} from '@/types/skill';

export const useCreateSkillApi = (): MutationTuple<
  CreateSkillResponseType,
  CreateSkillInputType
> => {
  return useMutation(CREATE_SKILL_MUTATION);
};

export const useGetSkillsApi = (): QueryResult<GetSkillsResponseType> => {
  return useQuery(GET_SKILLS);
};

export const useDeleteSkillApi = (): MutationTuple<
  DeleteSkillResponseType,
  DeleteSkillInputType
> => {
  return useMutation(DELETE_SKILL_MUTATION);
};

export const useUpdateSkillApi = (): MutationTuple<
  UpdateSkillResponseType,
  UpdateSkillInputType
> => {
  return useMutation(UPDATE_SKILL_MUTATION);
};

import { gql } from '@apollo/client';

export const CREATE_SKILL_MUTATION = gql`
  mutation CreateSkill($name: String!, $icon: Upload!, $description: String) {
    createSkill(name: $name, icon: $icon, description: $description) {
      id
      name
      icon
      description
    }
  }
`;

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      description
      icon
    }
  }
`;

export const DELETE_SKILL_MUTATION = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_SKILL_MUTATION = gql`
  mutation UpdateSkill(
    $id: ID!
    $name: String!
    $icon: Upload!
    $description: String
  ) {
    updateSkill(id: $id, name: $name, icon: $icon, description: $description) {
      id
      name
      icon
      description
    }
  }
`;

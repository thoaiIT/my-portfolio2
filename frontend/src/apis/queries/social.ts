import { gql } from '@apollo/client';

export const CREATE_SOCIAL_MUTATION = gql`
  mutation CreateSocial($platform: String!, $icon: Upload!, $url: String) {
    createSocial(platform: $platform, icon: $icon, url: $url) {
      id
      platform
      icon
      url
    }
  }
`;

export const GET_SOCIALS = gql`
  query GetSocials {
    socials {
      id
      platform
      url
      icon
    }
  }
`;

export const UPDATE_SOCIAL_MUTATION = gql`
  mutation UpdateSocial(
    $id: ID!
    $platform: String!
    $icon: Upload!
    $url: String!
  ) {
    updateSocial(id: $id, platform: $platform, icon: $icon, url: $url) {
      id
      platform
      icon
      url
    }
  }
`;

export const DELETE_SOCIAL_MUTATION = gql`
  mutation DeleteSocial($id: ID!) {
    deleteSocial(id: $id) {
      id
    }
  }
`;

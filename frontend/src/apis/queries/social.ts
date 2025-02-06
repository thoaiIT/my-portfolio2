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

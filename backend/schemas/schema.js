import { buildSchema } from 'graphql';

const schema = buildSchema(`
  scalar Upload
  type User {
    id: ID!
    name: String!
    email: String!
    profile_picture: String
    bio: String
    created_at: String
    updated_at: String
  }

  type Skill {
    id: ID!
    name: String!
    icon: String!
    level: String
    description: String
    created_at: String
    updated_at: String
  }

  type Social {
    id: ID!
    platform: String!
    url: String!
    icon: String!
    created_at: String
    updated_at: String
  }
  
  type AuthPayload {
    user: User
    token: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    skills: [Skill]
    skill(id: ID!): Skill
    skillByName(name: String!): Skill
    social(id: ID!): Social
    socials: [Social]
    socialByName(name: String!): Social
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      profile_picture: String
      bio: String
    ): User

    login(email: String!, password: String!): AuthPayload

    createSkill(
      name: String!
      icon: Upload!
      level: String
      description: String
    ): Skill

    updateSkill(
      id: ID!
      name: String!
      icon: Upload!
      level: String
      description: String
    ): Skill

    deleteSkill(id: ID!): Skill

    createSocial(
      platform: String!
      url: String!
      icon: Upload!
    ): Social
  }
`);

export default schema;

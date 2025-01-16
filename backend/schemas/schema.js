import { buildSchema } from 'graphql';

const schema = buildSchema(`
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
      icon: String!
      level: String
      description: String
    ): Skill

    updateSkill(
      id: ID!
      name: String!
      icon: String!
      level: String
      description: String
    ): Skill

    deleteSkill(id: ID!): Skill
  }
`);

export default schema;

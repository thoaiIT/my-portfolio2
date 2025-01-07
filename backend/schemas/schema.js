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

  type AuthPayload {
    user: User
    token: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
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
  }
`);

export default schema;

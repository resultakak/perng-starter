const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int!
    username: String
    email: String!
    name: String
    surname: String
  }

  input UserInput {
    email: String!
    password: String!
    name: String
    surname: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    registerUser(input: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateMe(input: UserInput!): User!
  }
`;

module.exports = typeDefs;

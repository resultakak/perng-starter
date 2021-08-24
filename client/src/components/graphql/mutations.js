import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
  mutation UserRegister($input: UserInput!) {
    registerUser(input: $input) {
      token
      user {
        id
        name
        surname
        email
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation UserLogin($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        email
        name
        surname
        username
      }
    }
  }
`;

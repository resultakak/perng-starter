import { gql } from "@apollo/client";

export const PROFILE = gql`
  query Me{
    me {
      email
      name
      surname
    }
  }
`;

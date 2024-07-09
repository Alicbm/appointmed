import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteUsersRequest ($id: ID!) {
    deleteUsersRequest(id: $id)
  }
`

import { gql } from "@apollo/client";

export const DELETE_GYNECOLOGY = gql`
  mutation deleteGynecologyRequest ($id: ID!) {
    deleteGynecologyRequest(id: $id)
  }
`

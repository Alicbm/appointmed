import { gql } from "@apollo/client";

export const DELETE_ODONTOLOGY = gql`
  mutation deleteOdontologyRequest ($id: ID!) {
    deleteOdontologyRequest(id: $id)
  }
`

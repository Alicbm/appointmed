import { gql } from "@apollo/client";

export const DELETE_OPTOMETRY = gql`
  mutation deleteOptometryRequest ($id: ID!) {
    deleteOptometryRequest(id: $id)
  }
`

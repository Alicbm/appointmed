import { gql } from "@apollo/client";

export const DELETE_PEDIATRICS = gql`
  mutation deletePediatricsRequest ($id: ID!) {
    deletePediatricsRequest(id: $id)
  }
`

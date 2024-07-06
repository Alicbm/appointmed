import { gql } from "@apollo/client";

export const DELETE_PSYCHIATRY = gql`
  mutation deletePsychiatryRequest ($id: ID!) {
    deletePsychiatryRequest(id: $id)
  }
`

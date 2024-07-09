import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateUsersRequest ($id: ID!, $dto: UpdateUserRequest!) {
    updateUsersRequest(id: $id, dto: $dto)
  }
`


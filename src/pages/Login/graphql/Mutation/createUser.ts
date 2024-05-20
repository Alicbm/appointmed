import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation createUsersRequest(
    $name: String!,
    $email: String!,
    $password: String!,
    $createdAt: String!,
    $role: String!,
  ) {
    createUsersRequest(
      dto: {
        name: $name
        email: $email
        password: $password
        createdAt: $createdAt
        role: $role
      }
    ) {
      name
      email
      password
      createdAt
      role
    }
  }
`

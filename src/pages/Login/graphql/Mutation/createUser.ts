import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation createUsersRequest(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $createdAt: String!,
    $role: String!,
    $eps: String!,
  ) {
    createUsersRequest(
      dto: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        createdAt: $createdAt
        role: $role
        eps: $eps
      }
    ) {
      access_token
      user {
        id
        firstName
        lastName
        email
        createdAt        
        role
        eps
      }
    }
  }
`

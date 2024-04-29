import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login(
    $email: String!, 
    $password: String!
  ) {
    login(
      email: $email, 
      password: $password
    ) {
      access_token
      user {
        id
        name
        email
        createdAt        
        role
      }
    }
  }
`

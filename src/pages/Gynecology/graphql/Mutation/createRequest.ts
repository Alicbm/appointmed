import { gql } from "@apollo/client";

export const CREATE_GYNECOLOGY = gql`
  mutation createGynecologyRequest(
    $typeService: String!
    $registryNumber: Int!
    $firstName: String!
    $lastName: String!
    $email: String!
    $eps: String!
    $department: String!
    $city: String!
    $medicalCenter: String!
    $date: String!
    $hour: String!
    $doctor: String!
    $patientStatus: String!
  ) {
    createGynecologyRequest(
      typeService: $typeService
      registryNumber: $registryNumber
      firstName: $firstName
      lastName: $lastName
      email: $email
      eps: $eps
      department: $department
      city: $city
      medicalCenter: $medicalCenter
      date: $date
      hour: $hour
      doctor: $doctor
      patientStatus: $patientStatus
    ) {
      id
      typeService
      registryNumber
      firstName
      lastName
      email
      eps
      department
      city
      medicalCenter
      date
      hour
      doctor
      patientStatus
      status
    }
  }
`;
import { gql } from "@apollo/client";

export const GET_ALL_GYNECOLOGY = gql`
  query getAllGynecologyRequest {
    getAllGynecologyRequest {
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

import { gql } from "@apollo/client";

export const GET_ALL_PEDIATRICS = gql`
  query getAllPediatricsRequest {
    getAllPediatricsRequest {
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

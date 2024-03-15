import { gql } from "@apollo/client";

export const GET_ALL_PSYCHIATRY = gql`
  query getAllPsychiatryRequest {
    getAllPsychiatryRequest {
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

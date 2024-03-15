import { gql } from "@apollo/client";

export const GET_ALL_ODONTOLOGY = gql`
  query getAllOdontologyRequest {
    getAllOdontologyRequest {
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

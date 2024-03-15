import { gql } from "@apollo/client";

export const GET_ALL_OPTOMETRY = gql`
  query getAllOptometryRequest {
    getAllOptometryRequest {
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

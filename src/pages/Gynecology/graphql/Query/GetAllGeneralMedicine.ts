import { gql } from "@apollo/client";

export const GET_ALL_GENERAL_MEDICINE = gql`
  query getAllGeneralMedicineRequest {
    getAllGeneralMedicineRequest {
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

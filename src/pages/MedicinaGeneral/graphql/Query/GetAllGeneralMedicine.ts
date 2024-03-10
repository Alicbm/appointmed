import { gql } from "@apollo/client";

export const GET_ALL_GENERAL_MEDICINE = gql`
  query getAllGeneralMedicineRequest {
    getAllGeneralMedicineRequest {
      id
      firsName
      lastName
      typeService
      eps
      registryNumber
      email
      departament
      city
      medicalCenter
      date
      hour
      doctor
    }
  }
`;

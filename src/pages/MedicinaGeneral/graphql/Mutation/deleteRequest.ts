import { gql } from "@apollo/client";

export const DELETE_GENERAL_MEDICINE = gql`
  mutation deleteGeneralMedicineRequest ($id: ID!) {
    deleteGeneralMedicineRequest(id: $id)
  }
`

import { gql } from "@apollo/client";

export const UPDATE_GENERAL_MEDICINE = gql`
  mutation updateGeneralMedicineRequest(
    $id: ID!
    $department: String
    $city: String
    $medicalCenter: String
    $date: String
    $hour: String
    $doctor: String
    $patientStatus: String
  ) {
    updateGeneralMedicineRequest(
      id: $id,
      dto: {
        department: $department
        city: $city
        medicalCenter: $medicalCenter
        date: $date
        hour: $hour
        doctor: $doctor
        patientStatus: $patientStatus
      }
    )
  }
`;

import { gql } from "@apollo/client";

export const UPDATE_ODONTOLOGY = gql`
  mutation updateOdontologyRequest(
    $id: ID!
    $department: String
    $city: String
    $medicalCenter: String
    $date: String
    $hour: String
    $doctor: String
    $patientStatus: String
  ) {
    updateOdontologyRequest(
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

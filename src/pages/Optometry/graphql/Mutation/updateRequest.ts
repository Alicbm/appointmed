import { gql } from "@apollo/client";

export const UPDATE_OPTOMETRY = gql`
  mutation updateOptometryRequest(
    $id: ID!
    $department: String
    $city: String
    $medicalCenter: String
    $date: String
    $hour: String
    $doctor: String
    $patientStatus: String
  ) {
    updateOptometryRequest(
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

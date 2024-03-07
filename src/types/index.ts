export interface GeneralMedicineIT {
  id: number,
  registry_number: string,
  first_name: string,
  last_name: string,
  department: null | string,
  city: string,
  email: string,
  eps: string,
  name_hospital: string,
  date: string,
  hour: number,
  doctor: string,
  patient_status: boolean,
  status: boolean
}

export type GeneralMedicineFilter = Pick<GeneralMedicineIT, 'registry_number' | 'first_name' | 'last_name' | 'eps'>
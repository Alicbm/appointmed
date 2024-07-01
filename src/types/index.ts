export interface BaseIT {
  id: string;
  typeService: string;
  registryNumber: number | string;
  firstName: string;
  lastName: string;
  email: string;
  eps: string;
  department: string;
  city: string;
  medicalCenter: string;
  date: string;
  hour: string;
  doctor: string;
  patientStatus: string;
  status: string;
}

export type FilterItemType = Pick<
  BaseIT,
  "registryNumber" | "firstName" | "lastName" | "eps"
>;

export type CreateRequestIT = Omit<
  BaseIT,
  "id"
>;

export type LoginType = {
  email: string;
  password: string;
}

export enum TypeButton {
  button = 'button',
  reset = 'reset',
  submit =  "submit",
}

export type CreateUserDto = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  repeatPassword: string
  createdAt: string,
  role: string,
  eps: string,
}
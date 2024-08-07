/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

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

export interface UpdateBaseIT {
  id?: string;
  department?: string;
  city?: string;
  medicalCenter?: string;
  date?: string;
  hour?: string;
  doctor?: string;
  patientStatus?: string;
}

export type FilterItemType = Pick<
  BaseIT,
  "registryNumber" | "firstName" | "lastName" | "eps"
>;

export type CreateRequestIT = Omit<BaseIT, "id">;

export type LoginType = {
  email: string;
  password: string;
};

export type UpdateUser = {
  firstName: string;
  lastName: string;
  email: string;
  eps: string;
  actualPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  passwordDeleteAccount: string;
};

export enum TypeButton {
  button = "button",
  reset = "reset",
  submit = "submit",
}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  createdAt: string;
  role: string;
  eps: string;
};

export type RoutesType = {
  label: string;
  route: string;
  icon: JSX.Element;
  selected: boolean;
};

export type stateRequest = {
  id: string;
  typeService: string;
  registryNumber: string | number;
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
};

export type MutationType = {
  (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ): Promise<FetchResult<any>>;
};

export interface CityList {
  [key: string]: string[];
}

export interface DoctorList {
  [key: string]: {
    [key: string]: string[];
  };
}

export interface LocationData {
  department: string;
  city: string;
  medicalCenter: string;
  doctor: string;
}
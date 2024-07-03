import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn, useWatch  } from "react-hook-form";
import { data as cityList } from "../data/ciudades.json";
import { data as medicalCentersList } from "../data/medicalCenters.json";
import { data as doctorList } from "../data/doctors.json";

interface CityList {
  [key: string]: string[];
}

interface DoctorList {
  [key: string]: {
    [key: string]: string[];
  };
}

interface LocationData {
  department: string;
  city: string;
  medicalCenter: string;
  doctor: string;
}

export const useLocationRequest = (allForm: UseFormReturn<FieldValues>) => {
  const[locationData, setLocationData] = useState <LocationData>({
    department: '',
    city: '',
    medicalCenter: '',
    doctor: ''
  })

  const watchedInputValue = useWatch({
    control: allForm?.control,
    name: ['department', 'city', 'medicalCenter', 'doctor'],
  });

  const dataCityList: CityList = cityList
  const dataMedicalCenter: CityList = medicalCentersList
  const dataDoctor: DoctorList = doctorList[0]

  useEffect(() => {
    setLocationData({
      department: watchedInputValue[0],
      city: watchedInputValue[1],
      medicalCenter: watchedInputValue[2],
      doctor: watchedInputValue[3]
    })
  }, [watchedInputValue]);

  return {
    locationData,
    dataCityList,
    dataMedicalCenter,
    dataDoctor
  }
}
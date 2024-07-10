import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn, useWatch  } from "react-hook-form";
import { data as cityList } from "../data/ciudades.json";
import { data as medicalCentersList } from "../data/medicalCenters.json";
import { data as doctorList } from "../data/doctors.json";
import { BaseIT, CityList, DoctorList, LocationData } from "../types";

export const useLocationRequest = (allForm: UseFormReturn<FieldValues>, data?: BaseIT) => {
  const[locationData, setLocationData] = useState <LocationData>({
    department: data?.department || '',
    city: data?.city || '',
    medicalCenter: data?.medicalCenter || '',
    doctor: data?.doctor || ''
  })

  const watchedInputValue = useWatch({
    control: allForm?.control,
    name: ['department', 'city', 'medicalCenter', 'doctor'],
  });

  const dataCityList: CityList = cityList
  const dataMedicalCenter: CityList = medicalCentersList
  const dataDoctor: DoctorList = doctorList[0]

  useEffect(() => {
    if(data) {
      if(
        watchedInputValue[0]?.length > 0 &&
        watchedInputValue[1]?.length > 0 &&
        watchedInputValue[2]?.length > 0 &&
        watchedInputValue[3]?.length > 0
      ) {
        setLocationData({
          department: watchedInputValue[0],
          city: watchedInputValue[1],
          medicalCenter: watchedInputValue[2],
          doctor: watchedInputValue[3]
        })
      }
    }else {
      setLocationData({
        department: watchedInputValue[0],
        city: watchedInputValue[1],
        medicalCenter: watchedInputValue[2],
        doctor: watchedInputValue[3]
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedInputValue]);


  return {
    locationData,
    dataCityList,
    dataMedicalCenter,
    dataDoctor
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from "react-hook-form";
import { stateRequest, MutationType, UpdateBaseIT } from "../types";
import { useState } from "react";

export const useUpdateRequest = (
  allForm: UseFormReturn<FieldValues>,
  data: stateRequest,
  updateGeneralMedicineRequest: MutationType,
  setCorrect: (arg: boolean) => void,
  setDataSent: (arg: boolean) => void
) => {
  const [newData, setNewData] = useState(data);

  const onUpdateRequest = allForm?.handleSubmit(
    async (getData: UpdateBaseIT | FieldValues) => {
      try {
        setCorrect(false);
        await updateGeneralMedicineRequest({
          variables: {
            id: data?.id,
            department: getData?.department,
            city: getData?.city,
            medicalCenter: getData?.medicalCenter,
            date: getData?.date,
            hour: getData?.hour,
            doctor: getData?.doctor,
            patientStatus: getData?.patientStatus,
          },
        });

        setNewData({
          ...newData,
          department: getData?.department || data?.department,
          city: getData?.city || data?.city,
          medicalCenter: getData?.medicalCenter || data?.medicalCenter, 
          date: getData?.date || data?.date,
          hour: getData?.hour || data?.hour,
          doctor: getData?.doctor || data?.doctor,
          patientStatus: getData?.patientStatus || data?.patientStatus,
        })

        setDataSent(true);
      } catch (err) {
        setCorrect(true);
        setDataSent(true);
      }
    }
  );

  return { onUpdateRequest, newData }

}
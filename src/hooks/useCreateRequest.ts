import { FieldValues, UseFormReturn } from "react-hook-form";
import { BaseIT, CreateRequestIT, MutationType } from "../types";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export const useCreateRequest = (
  dataRequest: BaseIT | undefined,
  requeriments: boolean,
  setClearForm: (arg: boolean) => void,
  setDownloadRequest: (arg: boolean) => void,
  setRequeriments: (arg: boolean) => void,
  setCorrect: (arg: boolean) => void,
  setDataSent: (arg: boolean) => void,
  setDataRequest: (arg: BaseIT) => void,
  createRequest: MutationType,
  allForm: UseFormReturn<FieldValues>
) => {
  const context = useContext(AuthContext)

  const onDownloadRequest = () => {
    if (!dataRequest) {
      if (!requeriments) {
        alert("Es necesario que acepte los terminos y condiciones");
      } else {
        setClearForm(false);
        setDownloadRequest(true);
      }
    }
  };

  const onClearForm = () => {
    setDownloadRequest(false);
    setClearForm(true);
    setRequeriments(false);
  };

  const onSubmit = allForm?.handleSubmit(
    async (getData: CreateRequestIT | FieldValues) => {
      try {
        if (requeriments) {
          setCorrect(false);
          const { data } = await createRequest({
            variables: {
              typeService: "EPS",
              registryNumber: Number(context?.user?.user?.id),
              firstName: context?.user?.user?.firstName,
              lastName: context?.user?.user?.lastName,
              email: context?.user?.user?.email,
              eps: context?.user?.user?.eps,
              department: getData?.department,
              city: getData?.city,
              medicalCenter: getData?.medicalCenter,
              date: getData?.date,
              hour: getData?.hour,
              doctor: getData?.doctor,
              patientStatus: getData?.patientStatus,
              status: "Pendiente",
            },
          });

          setDataRequest(data?.createGeneralMedicineRequest);
          setDataSent(true);
          setRequeriments(false);
        } else {
          alert("Es necesario que acepte los terminos y condiciones");
        }
      } catch (err) {
        setCorrect(true);
        setDataSent(true);
      }
    }
  ); 

  return {
    onDownloadRequest,
    onClearForm,
    onSubmit
  }
}
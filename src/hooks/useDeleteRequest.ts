import { MutationType, stateRequest } from "../types";

export const useDeleteRequest = (
  state: stateRequest,
  deleteGeneralMedicineRequest: MutationType,
  setModal: (arg: boolean) => void
) => {

  const onDeleteRequest = async () => {
    try {
      await deleteGeneralMedicineRequest({
        variables: {
          id: state.id,
        },
      });
  
      setModal(false)
    } catch (error) {
      alert("Error al tratar de eliminar la consulta");
    }
  }

  return { onDeleteRequest }
};

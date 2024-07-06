/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { stateRequest } from "../types";

export const useDeleteRequest = (
  state: stateRequest,
  deleteGeneralMedicineRequest: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<FetchResult<any>>,
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

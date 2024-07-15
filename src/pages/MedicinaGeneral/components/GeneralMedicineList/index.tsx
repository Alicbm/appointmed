import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Pagination } from "../../../../components/Pagination";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_GENERAL_MEDICINE } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { UPDATE_GENERAL_MEDICINE } from "../../graphql/Mutation/updateRequest";
import { DELETE_GENERAL_MEDICINE } from "../../graphql/Mutation/deleteRequest";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { BaseList } from '../../../../components/mainComponents/BaseList'

export function GeneralMedicineList() {
  const { data: fetchData, loading: loadingGet } = useQuery(GET_ALL_GENERAL_MEDICINE);
  const [updateGeneralMedicineRequest, { loading: loadingUpdate }] = useMutation(UPDATE_GENERAL_MEDICINE);
  const [deleteGeneralMedicineRequest, { loading: loadingDelete }] = useMutation(DELETE_GENERAL_MEDICINE);

  const newData: BaseIT[] = fetchData?.getAllGeneralMedicineRequest;

  const [filterData, setFilterData] = useState(newData);
  const [modalRequest, setModalRequest] = useState(false);
  const [idRequest, setIdRequest] = useState("");

  const requestSelected = newData?.filter((item) => item.id == idRequest);

  useEffect(() => {
    setFilterData(newData);
  }, [newData]);

  return (
    <div className="grid justify-center gap-6 lg:justify-normal">
      <TemplatePage
        title="Medicina General: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de medicina general"
        route="/dashboard/medicina-general/create"
        buttonText="Nueva Solicitud"
        data={newData}
      />

      <BaseList 
        newData={newData}
        setFilterData={setFilterData}
        filterData={filterData}
        setModalRequest={setModalRequest}
        setIdRequest={setIdRequest}
        routeCreateRequest='/dashboard/medicina-general/create'
        loading={loadingGet}
      />

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalWatchRequest 
          nameService='Medicina General'
          data={requestSelected} 
          setModal={setModalRequest} 
          updateRequest={updateGeneralMedicineRequest}
          deleteRequest={deleteGeneralMedicineRequest}
          loadingUpdate={loadingUpdate}
          loadingDelete={loadingDelete}          
        />
      )}
    </div>
  );
}

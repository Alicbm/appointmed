import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Pagination } from "../../../../components/Pagination";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_PEDIATRICS } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { UPDATE_PEDIATRICS } from "../../graphql/Mutation/updateRequest";
import { DELETE_PEDIATRICS } from "../../graphql/Mutation/deleteRequest";
import { BaseList } from "../../../../components/mainComponents/BaseList";

export function PediatricsList() {
  const { data: fetchData } = useQuery(GET_ALL_PEDIATRICS);
  const [updatePediatricsRequest] = useMutation(UPDATE_PEDIATRICS);
  const [deletePediatricsRequest] = useMutation(DELETE_PEDIATRICS);

  const newData: BaseIT[] = fetchData?.getAllPediatricsRequest;

  const [filterData, setFilterData] = useState(newData);
  const [modalRequest, setModalRequest] = useState(false);
  const [idRequest, setIdRequest] = useState("");

  const requestSelected = newData?.filter((item) => item.id == idRequest);

  useEffect(() => {
    setFilterData(newData);
  }, [newData]);

  return (
    <div className="grid justify-center gap-6">
      <TemplatePage
        title="Pediatría: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de pediatría"
        route="/dashboard/pediatria/create"
        buttonText="Nueva Solicitud"
        data={newData}
      />

      <BaseList
        newData={newData}
        setFilterData={setFilterData}
        filterData={filterData}
        setModalRequest={setModalRequest}
        setIdRequest={setIdRequest}
        routeCreateRequest="/dashboard/pediatria/create"
      />

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalWatchRequest
          nameService="Pediatría"
          data={requestSelected}
          setModal={setModalRequest}
          updateRequest={updatePediatricsRequest}
          deleteRequest={deletePediatricsRequest}
        />
      )}
    </div>
  );
}

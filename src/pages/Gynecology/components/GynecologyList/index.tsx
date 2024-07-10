import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Pagination } from "../../../../components/Pagination";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_GYNECOLOGY } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { UPDATE_GYNECOLOGY } from "../../graphql/Mutation/updateRequest";
import { DELETE_GYNECOLOGY } from "../../graphql/Mutation/deleteRequest";
import { BaseList } from "../../../../components/mainComponents/BaseList";

export function GynecologyList() {
  const { data: fetchData } = useQuery(GET_ALL_GYNECOLOGY);
  const [updateGynecologyRequest] = useMutation(UPDATE_GYNECOLOGY);
  const [deleteGynecologyRequest] = useMutation(DELETE_GYNECOLOGY);

  const newData: BaseIT[] = fetchData?.getAllGynecologyRequest;

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
        title="Ginecología: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de ginecología"
        route="/dashboard/ginecologia/create"
        buttonText="Nueva Solicitud"
        data={newData}
      />

      <BaseList
        newData={newData}
        setFilterData={setFilterData}
        filterData={filterData}
        setModalRequest={setModalRequest}
        setIdRequest={setIdRequest}
        routeCreateRequest="/dashboard/ginecologia/create"
      />

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalWatchRequest
          nameService="Ginecología"
          data={requestSelected}
          setModal={setModalRequest}
          updateRequest={updateGynecologyRequest}
          deleteRequest={deleteGynecologyRequest}
        />
      )}
    </div>
  );
}

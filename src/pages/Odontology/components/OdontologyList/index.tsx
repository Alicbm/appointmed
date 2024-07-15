import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Pagination } from "../../../../components/Pagination";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_ODONTOLOGY } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { UPDATE_ODONTOLOGY } from "../../graphql/Mutation/updateRequest";
import { DELETE_ODONTOLOGY } from "../../graphql/Mutation/deleteRequest";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { BaseList } from "../../../../components/mainComponents/BaseList";

export function OdontologyList() {
  const { data: fetchData, loading: loadingGet} = useQuery(GET_ALL_ODONTOLOGY);
  const [updateOdontologyRequest, { loading: loadingUpdate }] = useMutation(UPDATE_ODONTOLOGY);
  const [deleteOdontologyRequest, { loading: loadingDelete }] = useMutation(DELETE_ODONTOLOGY);

  const newData: BaseIT[] = fetchData?.getAllOdontologyRequest;

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
        title="Odontología: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de odontología"
        route="/dashboard/odontologia/create"
        buttonText="Nueva Solicitud"
        data={newData}
      />

      <BaseList
        newData={newData}
        setFilterData={setFilterData}
        filterData={filterData}
        setModalRequest={setModalRequest}
        setIdRequest={setIdRequest}
        routeCreateRequest="/dashboard/odontologia/create"
        loading={loadingGet}
      />

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalWatchRequest
          nameService="Odontología"
          data={requestSelected}
          setModal={setModalRequest}
          updateRequest={updateOdontologyRequest}
          deleteRequest={deleteOdontologyRequest}
          loadingUpdate={loadingUpdate}
          loadingDelete={loadingDelete}          
        />
      )}
    </div>
  );
}

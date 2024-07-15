import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Pagination } from "../../../../components/Pagination";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_OPTOMETRY } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { UPDATE_OPTOMETRY } from "../../graphql/Mutation/updateRequest";
import { DELETE_OPTOMETRY } from "../../graphql/Mutation/deleteRequest";
import { BaseList } from "../../../../components/mainComponents/BaseList";

export function OptometryList() {
  const { data: fetchData, loading: loadingGet } = useQuery(GET_ALL_OPTOMETRY);
  const [updateOptometryRequest, { loading: loadingUpdate }] = useMutation(UPDATE_OPTOMETRY);
  const [deleteOptometryRequest, { loading: loadingDelete }] = useMutation(DELETE_OPTOMETRY);

  const newData: BaseIT[] = fetchData?.getAllOptometryRequest;

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
        title="Optometría: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de optometría"
        route="/dashboard/optometria/create"
        buttonText="Nueva Solicitud"
        data={newData}
      />

      <BaseList
        newData={newData}
        setFilterData={setFilterData}
        filterData={filterData}
        setModalRequest={setModalRequest}
        setIdRequest={setIdRequest}
        routeCreateRequest="/dashboard/optometria/create"
        loading={loadingGet}
      />

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalWatchRequest
          nameService="Optometría"
          data={requestSelected}
          setModal={setModalRequest}
          updateRequest={updateOptometryRequest}
          deleteRequest={deleteOptometryRequest}
          loadingUpdate={loadingUpdate}
          loadingDelete={loadingDelete}          
        />
      )}
    </div>
  );
}

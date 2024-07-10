import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Pagination } from "../../../../components/Pagination";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_PSYCHIATRY } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { UPDATE_PSYCHIATRY } from "../../graphql/Mutation/updateRequest";
import { DELETE_PSYCHIATRY } from "../../graphql/Mutation/deleteRequest";
import { BaseList } from "../../../../components/mainComponents/BaseList";

export function PsychiatryList() {
  const { data: fetchData } = useQuery(GET_ALL_PSYCHIATRY);
  const [updatePsychiatryRequest] = useMutation(UPDATE_PSYCHIATRY);
  const [deletePsychiatryRequest] = useMutation(DELETE_PSYCHIATRY);

  const newData: BaseIT[] = fetchData?.getAllPsychiatryRequest;

  const [filterData, setFilterData] = useState(newData);
  const [modalRequest, setModalRequest] = useState(false);
  const [idRequest, setIdRequest] = useState("");

  const requestSelected = newData?.filter((item) => item?.id == idRequest);

  useEffect(() => {
    setFilterData(newData);
  }, [newData]);

  return (
    <div className="grid justify-center gap-6">
      <TemplatePage
        title="Psiquiatría: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de psiquiatría"
        route="/dashboard/psiquiatria/create"
        buttonText="Nueva Solicitud"
        data={newData}
      />

      <BaseList
        newData={newData}
        setFilterData={setFilterData}
        filterData={filterData}
        setModalRequest={setModalRequest}
        setIdRequest={setIdRequest}
        routeCreateRequest="/dashboard/psiquiatria/create"
      />

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalWatchRequest
          nameService="Psiquiatría"
          data={requestSelected}
          setModal={setModalRequest}
          updateRequest={updatePsychiatryRequest}
          deleteRequest={deletePsychiatryRequest}
        />
      )}
    </div>
  );
}

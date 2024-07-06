import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FilterItem } from "../../../../components/FilterItem";
import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_PEDIATRICS } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { NotResults } from "../../../../components/NotResults";
import { IoEye } from "react-icons/io5";
import { ModalWatchRequest } from "../../../../components/mainComponents/ModalWatchRequest";
import { UPDATE_PEDIATRICS } from '../../graphql/Mutation/updateRequest'
import { DELETE_PEDIATRICS } from '../../graphql/Mutation/deleteRequest'

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

      <div>
        <FilterItem
          listData={[
            { label: "Nro Expediente", value: "registryNumber" },
            { label: "Nombre", value: "firstName" },
            { label: "Apellido", value: "lastName" },
            { label: "EPS", value: "eps" },
          ]}
          data={newData}
          setData={setFilterData}
        />
      </div>

      <div className="w-full bg-slate-100 rounded-lg overflow-hidden">
        {filterData?.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Nro Expediente</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>EPS</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filterData?.map((item: BaseIT, index: number) => (
                <tr
                  key={index}
                  className={`${index % 2 == 0 && "bg-slate-50"}`}
                >
                  <td>{item?.registryNumber}</td>
                  <td>{item?.firstName}</td>
                  <td>{item?.lastName}</td>
                  <td>{item?.eps}</td>
                  <td>{item?.medicalCenter}</td>
                  <td
                    className="flex justify-center items-center text-sky-800 text-xl cursor-pointer hover:text-sky-900"
                    onClick={() => {
                      setModalRequest(true);
                      setIdRequest(item.id);
                    }}
                  >
                    <IoEye />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NotResults
            route="/dashboard/pediatria/create"
            text={
              newData?.length === 0
                ? "No hay elementos en esta sección"
                : "No hay resultados para la busqueda"
            }
          />
        )}
      </div>

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

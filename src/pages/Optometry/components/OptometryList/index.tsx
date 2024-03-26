import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FilterItem } from "../../../../components/FilterItem";
import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_OPTOMETRY } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { NotResults } from "../../../../components/NotResults";
import { IoEye } from "react-icons/io5";
import { ModalRequest } from "../ModalRequest";

export function OptometryList() {
  const { data: fetchData } = useQuery(GET_ALL_OPTOMETRY);
  const newData: BaseIT[] = fetchData?.getAllOptometryRequest;

  const [filterData, setFilterData] = useState(newData);
  const [modalRequest, setModalRequest] = useState(false);
  const [idRequest, setIdRequest] = useState("");

  const requestSelected = newData?.filter((item) => item.id == idRequest);

  useEffect(() => {
    setFilterData(newData);
  }, [newData]);

  return (
    <div className="grid gap-6">
      <TemplatePage
        title="Optometría: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de optometría"
        route="/dashboard/optometria/create"
        buttonText="Nueva Solicitud"
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
        <Table>
          {filterData?.length > 0 ? (
            <>
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
            </>
          ) : (
            <NotResults
              route="/dashboard/optometria/create"
              text={
                newData?.length === 0
                  ? "No hay elementos en esta sección"
                  : "No hay resultados para la busqueda"
              }
            />
          )}
        </Table>
      </div>

      <Pagination data={newData} setData={setFilterData} />

      {modalRequest && (
        <ModalRequest data={requestSelected} setModal={setModalRequest} />
      )}
    </div>
  );
}

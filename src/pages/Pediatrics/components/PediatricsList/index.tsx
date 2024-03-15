import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FilterItem } from "../../../../components/FilterItem";
import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import { GET_ALL_PEDIATRICS } from "../../graphql/Query/getAll";
import { BaseIT } from "../../../../types";
import { NotResults } from "../../../../components/NotResults";

export function PediatricsList() {
  const { data: fetchData } = useQuery(GET_ALL_PEDIATRICS);
  const newData: BaseIT[] = fetchData?.getAllPediatricsRequest;

  const [filterData, setFilterData] = useState(newData);

  useEffect(() => {
    setFilterData(newData);
  }, [newData]);

  return (
    <div className="grid gap-6">
      <TemplatePage
        title="Pediatría: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de pediatría"
        route="/dashboard/pediatria/create"
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
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <NotResults
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
    </div>
  );
}

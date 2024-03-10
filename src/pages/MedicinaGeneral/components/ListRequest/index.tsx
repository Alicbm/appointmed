import { useState } from "react";
import { FilterItem } from "../../../../components/FilterItem";
import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import data from "../../../../data/generalMedicine.json";
import { useQuery } from "@apollo/client";
import { GET_ALL_GENERAL_MEDICINE } from "../../graphql/Query/GetAllGeneralMedicine";

export function ListRequest() {
  const { data: fetchData } = useQuery(GET_ALL_GENERAL_MEDICINE)
  const [filterData, setFilterData] = useState(data);

  const newData = fetchData?.getAllGeneralMedicineRequest
 
  return (
    <div className="grid gap-6">
      <TemplatePage
        title="Medicina General: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de medicina general"
        route="/dashboard/medicina-general/create"
        buttonText="Nueva Solicitud"
      />

      <div>
        <FilterItem
          listData={[
            { label: "Nro Expediente", value: "registry_number" },
            { label: "Nombre", value: "first_name" },
            { label: "Apellido", value: "last_name" },
            { label: "EPS", value: "eps" },
          ]}
          data={data}
          setData={setFilterData}
        />
      </div>

      <div className="w-full bg-slate-100 rounded-lg overflow-hidden">
        <Table>
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
            {newData?.map((item, index) => (
              <tr key={index} className={`${index % 2 == 0 && "bg-slate-50"}`}>
                <td>{item.registryNumber}</td>
                <td>{item.firsName}</td>
                <td>{item.lastName}</td>
                <td>{item.eps}</td>
                <td>{item.medicalCenter}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination data={data} setData={setFilterData} />
    </div>
  );
}

import { useState } from "react";
import { FilterItem } from "../../../../components/FilterItem";
import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import data from "../../../../data/generalMedicine.json";

export function ListRequest() {
  const [filterData, setFilterData] = useState(data);

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
            {filterData.map((item, index) => (
              <tr key={index} className={`${index % 2 == 0 && "bg-slate-50"}`}>
                <td>{item.registry_number}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.eps}</td>
                <td>{item.registry_number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination data={data} setData={setFilterData} />
    </div>
  );
}

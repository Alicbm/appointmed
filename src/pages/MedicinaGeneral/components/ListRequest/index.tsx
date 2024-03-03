import { FilterItem } from "../../../../components/FilterItem";
import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import data from '../../../../data/generalMedicine.json'

export function ListRequest() {
  return (
    <div className="grid gap-6">
      <TemplatePage
        title="Medicina General: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las solicitudes ingresadas del área de medicina general"
        button
      />

      <div>
        <FilterItem listData={['Uno', 'dos']}/>
      </div>

      <div className="w-full bg-slate-100 rounded-lg overflow-hidden">
      <Table>
        <thead>
          <tr>
            <th>Nro Expediente</th>
            <th>Nombre</th>
            <th>EPS</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr className={`${index%2 == 0 && 'bg-slate-50'}`}>
                <td>{item.registry_number}</td>
                <td>{item.first_name} {item.last_name}</td>
                <td>{item.registry_number}</td>
                <td>{item.registry_number}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>

      <Pagination data={data} />
    </div>
  );
}

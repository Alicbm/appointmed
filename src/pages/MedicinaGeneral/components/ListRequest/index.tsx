import { Pagination } from "../../../../components/Pagination";
import { Table } from "../../../../components/Table";
import { TemplatePage } from "../../../../components/TemplatePage";
import data from '../../../../data/generalMedicine.json'

export function ListRequest() {
  return (
    <div className="w-full">
      <TemplatePage
        title="Medicina General: Solitudes ingresadas"
        text="Desde aquí podrás visualizar las colicitudes ingresadas del área de medicina general"
        button
      />
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
            data.map(item => (
              <tr>
                <td>{item.registry_number}</td>
                <td>{item.first_name} {item.last_name}</td>
                <td>{item.registry_number}</td>
                <td>{item.registry_number}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>

      <Pagination data={data} />
    </div>
  );
}

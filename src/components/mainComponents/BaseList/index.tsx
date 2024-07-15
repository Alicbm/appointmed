import { FilterItem } from "../../FilterItem";
import { Table } from "../../Table";
import { NotResults } from "../../NotResults";
import { BaseIT } from "../../../types";
import { IoEye } from "react-icons/io5";

type Props = {
  newData: BaseIT[];
  filterData: BaseIT[];
  setFilterData: (arg: BaseIT[]) => void;
  setModalRequest: (arg: boolean) => void;
  setIdRequest: (arg: string) => void;
  routeCreateRequest: string;
  loading: boolean;
};

export function BaseList({
  newData,
  setFilterData,
  filterData,
  setModalRequest,
  setIdRequest,
  routeCreateRequest,
  loading,
}: Props) {
  return (
    <>
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

      {
        !loading ? (
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
              route={routeCreateRequest}
              text={
                newData?.length === 0
                  ? "No hay elementos en esta sección"
                  : "No hay resultados para la busqueda"
              }
            />
          )}
        </div>
        ) : (
          <div className="w-[100%] h-[200px] grid place-content-center">
            <span className="loader"></span>
          </div>
        )
      }
    </>
  );
}

/* eslint-disable @typescript-eslint/ban-types */
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Input } from "../../../../components/Input";
import { MainButton } from "../../../../components/MainButton";
import { ContainerModal } from "../../../../components/ContainerModal";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { BaseIT } from "../../../../types";
import { PDFFile } from "../../../../components/PDFFile";
import { AuthContext } from "../../../../AuthContext";
import { classNames } from "../../../../utils";

type Props = {
  data: BaseIT[];
  setModal: Function;
};

export function ModalRequest({ data, setModal }: Props) {
  const context = useContext(AuthContext);
  const [canEdit, setCanEdit] = useState(false);

  const [state, setState] = useState({
    id: data[0]?.id,
    typeService: data[0]?.typeService,
    registryNumber: data[0]?.registryNumber,
    firstName: data[0]?.firstName,
    lastName: data[0]?.lastName,
    email: data[0]?.email,
    eps: data[0]?.eps,
    department: data[0]?.department,
    city: data[0]?.city,
    medicalCenter: data[0]?.medicalCenter,
    date: data[0]?.date,
    hour: data[0]?.hour,
    doctor: data[0]?.doctor,
    patientStatus: data[0]?.patientStatus,
    status: data[0]?.status,
  });

  const userId = context?.user?.user?.id;
  const userRole = context?.user?.user?.role;
  const requestId = state.registryNumber;

  const userCanEdit = () => {
    if (userId == requestId || userRole == "admin") {
      setCanEdit(true);
    } else {
      alert(
        "Para poder editar esta consulta debes haberla creado o ser administrador, de lo contrario no puedes editar consultas de otros usuarios"
      );
    }
  };

  return (
    <ContainerModal>
      <div className="relative grid gap-5 w-[95%] h-full bg-slate-50 px-6 pb-10 pt-14 mx-auto overflow-y-scroll rounded-lg overflow-hidden lg:w-[70%]">
        <div
          className="absolute top-5 right-5 text-3xl text-sky-800 bg-slate-100 hover:text-black cursor-pointer"
          onClick={() => setModal(false)}
        >
          <IoClose />
        </div>

        <TemplatePage
          title="Medicina General: Solicitud Ingresada"
          text="Desde aquí puedes visualizar cada solicitud individualmente"
        />

        <div>
          <SubtitleInputs text="A. Seleccionar Tipo Entidad de Salud Promotora" />

          <div className="grid sm:grid-cols-2 md:sm:grid-cols-3">
            <Input label="Tipo de Entidad" value={state?.typeService} />
          </div>
        </div>

        <div>
          <SubtitleInputs text="B. Datos del Solicitante" />

          <div className="grid gap-4 sm:grid-cols-2 md:sm:grid-cols-3">
            <Input
              label="Número de Registro"
              value={String(state?.registryNumber)}
            />
            <Input label="Nombre" value={state?.firstName} />
            <Input label="Apellido" value={state?.lastName} />
            <Input label="Correo Electrónico" value={state?.email} />
            <Input label="Seleccionar EPS" value={state?.eps} />
          </div>
        </div>

        <div>
          <SubtitleInputs text="C. Lugar de la Cita Médica" />

          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Departamento"
              value={state?.department}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  department: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
            <Input
              label="Ciudad"
              value={state?.city}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  city: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
            <Input
              label="Centro Médico"
              value={state?.medicalCenter}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  medicalCenter: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
          </div>
        </div>

        <div>
          <SubtitleInputs text="D. Fecha de la Cita Médica" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Seleccionar Fecha"
              value={state?.date}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  date: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
            <Input
              label="Seleccionar Hora"
              value={state?.hour}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  hour: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
          </div>
        </div>

        <div>
          <SubtitleInputs text="E. Estado del paciente y preferencias" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Selecciona Médico"
              value={state?.doctor}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  doctor: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
            <Input
              label="Estado del Paciente"
              value={state?.patientStatus}
              onChange={(e: { target: { value: string } }) =>
                setState({
                  ...state,
                  patientStatus: e.target.value,
                })
              }
              disabled={canEdit}
              editValue={canEdit}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PDFDownloadLink
            document={<PDFFile data={data[0]} />}
            fileName="resume_request.pdf"
            className="w-full"
          >
            {({ loading }) =>
              loading ? (
                <MainButton
                  text="Cargando PDF"
                  className="w-full bg-black hover:bg-gray-900"
                />
              ) : (
                <MainButton
                  text="Descargar PDF"
                  className="w-full bg-black hover:bg-gray-900"
                />
              )
            }
          </PDFDownloadLink>

          <MainButton
            text="Modificar Solicitud"
            className={classNames([
              userId == requestId || userRole == "admin"
                ? ""
                : "opacity-[50%]",
                'bg-sky-700 hover:bg-sky-800'
            ])}
            onClick={userCanEdit}
          />
        </div>
      </div>
    </ContainerModal>
  );
}

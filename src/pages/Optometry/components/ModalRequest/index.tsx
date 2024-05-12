/* eslint-disable @typescript-eslint/ban-types */
import { IoClose } from "react-icons/io5";
import { Input } from "../../../../components/Input";
import { MainButton } from "../../../../components/MainButton";
import { ContainerModal } from "../../../../components/ContainerModal";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { BaseIT } from "../../../../types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFFile } from "../../../../components/PDFFile";

type Props = {
  data: BaseIT[];
  setModal: Function;
};

export function ModalRequest({ data, setModal }: Props) {
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
          title="Optometría: Solicitud Ingresada"
          text="Desde aquí puedes visualizar cada solicitud individualmente"
        />

        <div>
          <SubtitleInputs text="A. Seleccionar Tipo Entidad de Salud Promotora" />

          <div className="grid sm:grid-cols-2 md:sm:grid-cols-3">
            <Input label="Tipo de Entidad" value={data[0]?.typeService} />
          </div>
        </div>

        <div>
          <SubtitleInputs text="B. Datos del Solicitante" />

          <div className="grid gap-4 sm:grid-cols-2 md:sm:grid-cols-3">
            <Input
              label="Número de Registro"
              value={String(data[0]?.registryNumber)}
            />
            <Input label="Nombre" value={data[0]?.firstName} />
            <Input label="Apellido" value={data[0]?.lastName} />
            <Input label="Correo Electrónico" value={data[0]?.email} />
            <Input label="Seleccionar EPS" value={data[0]?.eps} />
          </div>
        </div>

        <div>
          <SubtitleInputs text="C. Lugar de la Cita Médica" />

          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Departamento" value={data[0]?.department} />
            <Input label="Ciudad" value={data[0]?.city} />
            <Input label="Centro Médico" value={data[0]?.medicalCenter} />
          </div>
        </div>

        <div>
          <SubtitleInputs text="D. Fecha de la Cita Médica" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Seleccionar Fecha" value={data[0]?.date} />
            <Input label="Seleccionar Hora" value={data[0]?.hour} />
          </div>
        </div>

        <div>
          <SubtitleInputs text="E. Estado del paciente y preferencias" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Selecciona Médico" value={data[0]?.doctor} />
            <Input label="Estado del Paciente" value={data[0]?.patientStatus} />
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
            className="bg-sky-700 hover:bg-sky-800"
            disabled
          />
        </div>
      </div>
    </ContainerModal>
  );
}

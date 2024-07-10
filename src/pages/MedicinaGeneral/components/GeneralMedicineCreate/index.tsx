import { useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/Input";
import { InputCheck } from "../../../../components/InputCheck";
import { MainButton } from "../../../../components/MainButton";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { InputSelect } from "../../../../components/InputSelect";
import { useForm } from "react-hook-form";
import { BaseIT, TypeButton } from "../../../../types";
import { useMutation } from "@apollo/client";
import { CREATE_GENERAL_MEDICINE } from "../../graphql/Mutation/createRequest";
import { data as epsList } from "../../../../data/eps.json";
import { data as departamentList } from "../../../../data/departments.json";
import { ModalSentData } from "../../../../components/ModalSentData";
import { AlertModal } from "../../../../components/AlertModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFFile } from "../../../../components/PDFFile";
import { AuthContext } from "../../../../AuthContext";
import { useLocationRequest } from "../../../../hooks/useLocationRequest";
import { useCreateRequest } from "../../../../hooks/useCreateRequest";

export function GeneralMedicineCreate() {
  const [checked, setChecked] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [requeriments, setRequeriments] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const [downloadRequest, setDownloadRequest] = useState(false);
  const [dataRequest, setDataRequest] = useState<BaseIT>();

  const [createGeneralMedicineRequest] = useMutation(CREATE_GENERAL_MEDICINE);

  const context = useContext(AuthContext)

  const allForm = useForm();
  const { 
    locationData, 
    dataCityList, 
    dataMedicalCenter, 
    dataDoctor } = useLocationRequest(allForm)

  const {
    onDownloadRequest,
    onClearForm,
    onSubmit
  } = useCreateRequest(
    dataRequest,
    requeriments,
    setClearForm,
    setDownloadRequest,
    setRequeriments,
    setCorrect,
    setDataSent,
    setDataRequest,
    createGeneralMedicineRequest,
    allForm 
  )

  useEffect(() => {
    if (dataSent) {
      setTimeout(() => {
        setDataSent(false);
      }, 3000);
    }
  }, [dataSent]);

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5">
      <TemplatePage
        title="Medicina General: Ingreso de Solicitudes"
        text="Desde aquí podrás ingresar las solicitudes al área de medicina general"
        buttonText="Ver Solicitudes"
        route="/dashboard/medicina-general/"
      />

      <div>
        <SubtitleInputs text="A. Seleccionar Tipo Entidad de Salud Promotora" />

        <div className="grid grid-cols-2">
          <InputCheck
            label="EPS"
            checked={checked}
            onClick={() => setChecked(!checked)}
          />
          <InputCheck
            label="IPS"
            checked={!checked}
            onClick={() => setChecked(!checked)}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="B. Datos del Solicitante" />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Input
            type="number"
            label="Número de Registro"
            fieldName="registryNumber"
            value={context?.user?.user?.id}
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            label="Nombre"
            fieldName="firstName"
            value={context?.user?.user?.firstName}
            allForm={allForm}
            rules={{ required: true, minLength: 2, maxLength: 20 }}
          />
          <Input
            label="Apellido"
            fieldName="lastName"
            value={context?.user?.user?.lastName}
            allForm={allForm}
            rules={{ required: true, minLength: 2, maxLength: 20 }}
          />
          <Input
            label="Correo Electrónico"
            fieldName="email"
            value={context?.user?.user?.email}
            allForm={allForm}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El email ta malito",
              },
            }}
          />
          <InputSelect
            label="Seleccionar EPS"
            listData={epsList}
            fieldName="eps"
            value={context?.user?.user?.eps}
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="C. Lugar de la Cita Médica" />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <InputSelect
            label="Departamento"
            fieldName="department"
            listData={departamentList}
            allForm={allForm}
            rules={{ required: true }}
          />
          <InputSelect
            label="Ciudad"
            fieldName="city"
            listData={dataCityList[locationData.department]}
            allForm={allForm}
            rules={{ required: true }}
          />
          <InputSelect
            label="Centro Médico"
            fieldName="medicalCenter"
            listData={dataMedicalCenter[locationData.city]}
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="D. Fecha de la Cita Médica" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="date"
            label="Seleccionar Fecha"
            fieldName="date"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            type="time"
            label="Seleccionar Hora"
            fieldName="hour"
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="E. Estado del paciente y preferencias" />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputSelect
            label="Selecciona Médico"
            fieldName="doctor"
            listData={
              dataDoctor[locationData?.city] ?
              dataDoctor[locationData?.city][locationData?.medicalCenter] :
              ['']
            }            
            allForm={allForm}
            rules={{ required: true }}
          />
          <InputSelect
            label="Estado del Paciente"
            fieldName="patientStatus"
            listData={['Grave', 'Estable', 'Bueno']}
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="pl-5">
        <InputCheck
          label='Al hacer clic en "Aceptar" estás de acuerdo con nuestros términos y condiciones. Por favor, revisa detenidamente antes de continuar. ¡Gracias por confiar en nosotros!'
          onClick={() => setRequeriments(!requeriments)}
          checked={requeriments}
        />
      </div>

      <div className="grid gap-4 my-8 sm:grid-cols-3">
        <MainButton
          text="Limpiar Formulario"
          className="bg-red-600 hover:bg-red-700"
          onClick={onClearForm}
        />
        {dataRequest ? (
          <PDFDownloadLink
            document={<PDFFile data={dataRequest} />}
            fileName="resume_request.pdf"
            className="w-full"
          >
            <MainButton
              text="Descargar PDF"
              className="w-full bg-black hover:bg-gray-900"
            />
          </PDFDownloadLink>
        ) : (
          <MainButton
            text="Descargar PDF"
            className="w-full bg-black hover:bg-gray-900"
            onClick={onDownloadRequest}
          />
        )}
        <MainButton
          type={TypeButton.submit}
          text="Enviar Solicitud"
          className="bg-sky-700 hover:bg-sky-800"
        />
      </div>

      {dataSent && (
        <div className="fixed top-[50px] right-2">
          <ModalSentData error={correct} />
        </div>
      )}

      {downloadRequest && (
        <AlertModal
          title="Descargar PDF"
          text="Para descargar la solicitud en PDF primero debes enviar la solicitud"
        >
          <MainButton
            text="Cancelar"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => setDownloadRequest(false)}
          />
          <MainButton
            text="Enviar Solicitud"
            className="w-full bg-sky-700 hover:bg-sky-800"
            onClick={() => {
              onSubmit();
              setDownloadRequest(false);
            }}
          />
        </AlertModal>
      )}

      {clearForm && (
        <AlertModal
          title="Limpiar Formulario"
          text="¿Estás seguro que deseas limpiar el formulario?"
        >
          <MainButton
            text="Cancelar"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => setClearForm(false)}
          />
          <MainButton
            text="Limpiar"
            className="w-full bg-sky-700 hover:bg-sky-800"
            onClick={() => {
              allForm.reset();
              setClearForm(false);
            }}
          />
        </AlertModal>
      )}
    </form>
  );
}

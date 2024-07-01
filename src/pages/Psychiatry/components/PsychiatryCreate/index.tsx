import { useContext, useEffect, useState } from "react";
import { Input } from "../../../../components/Input";
import { InputCheck } from "../../../../components/InputCheck";
import { MainButton } from "../../../../components/MainButton";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { InputSelect } from "../../../../components/InputSelect";
import { data as epsList } from "../../../../data/eps.json";
import { FieldValues, useForm } from "react-hook-form";
import { BaseIT, CreateRequestIT, TypeButton } from "../../../../types";
import { useMutation } from "@apollo/client";
import { CREATE_PSYCHIATRY } from "../../graphql/Mutation/createRequest";
import { AlertModal } from "../../../../components/AlertModal";
import { ModalSentData } from "../../../../components/ModalSentData";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFFile } from "../../../../components/PDFFile";
import { AuthContext } from "../../../../AuthContext";

export function PsychiatryCreate() {
  const [checked, setChecked] = useState(true);
  const [correct, setCorrect] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [requeriments, setRequeriments] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const [downloadRequest, setDownloadRequest] = useState(false);
  const [dataRequest, setDataRequest] = useState<BaseIT>();

  const [createPsychiatryRequest] = useMutation(CREATE_PSYCHIATRY);

  const context = useContext(AuthContext)

  const allForm = useForm();

  const onDownloadRequest = () => {
    if (!dataRequest) {
      if (!requeriments) {
        alert("Es necesario que acepte los terminos y condiciones");
      } else {
        setClearForm(false);
        setDownloadRequest(true);
      }
    }
  };

  const onClearForm = () => {
    setDownloadRequest(false);
    setClearForm(true);
  };

  const onSubmit = allForm?.handleSubmit(
    async (getData: CreateRequestIT | FieldValues) => {
      try {
        if (requeriments) {
          setCorrect(false);
          const { data } = await createPsychiatryRequest({
            variables: {
              typeService: checked ? "EPS" : "IPS",
              registryNumber: Number(getData?.registryNumber),
              firstName: getData?.firstName,
              lastName: getData?.lastName,
              email: getData?.email,
              eps: getData?.eps,
              department: getData?.department,
              city: getData?.city,
              medicalCenter: getData?.medicalCenter,
              date: getData?.date,
              hour: getData?.hour,
              doctor: getData?.doctor,
              patientStatus: getData?.patientStatus,
              status: "Pendiente",
            },
          });

          setDataRequest(data?.createPsychiatryRequest);
          setDataSent(true);
          setRequeriments(false);
        } else {
          alert("Es necesario que acepte los terminos y condiciones");
        }
      } catch (err) {
        setCorrect(true);
        setDataSent(true);
      }
    }
  );

  useEffect(() => {
    if (dataSent) {
      setTimeout(() => {
        setDataSent(false);
      }, 3000);
    }
  }, [dataSent]);

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <TemplatePage
        title="Psiquiatría: Ingreso de Solicitudes"
        text="Desde aquí podrás ingresar las solicitudes al área de psiquiatría"
        buttonText="Ver Solicitudes"
        route="/dashboard/psiquiatria/"
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
          <Input
            label="Departamento"
            fieldName="department"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            label="Ciudad"
            fieldName="city"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            label="Centro Médico"
            fieldName="medicalCenter"
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="D. Fecha de la Cita Médica" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Seleccionar Fecha"
            fieldName="date"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
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
          <Input
            label="Selecciona Médico"
            fieldName="doctor"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            label="Estado del Paciente"
            fieldName="patientStatus"
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

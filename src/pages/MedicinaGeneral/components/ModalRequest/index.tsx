/* eslint-disable @typescript-eslint/ban-types */
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Input } from "../../../../components/Input";
import { MainButton } from "../../../../components/MainButton";
import { ContainerModal } from "../../../../components/ContainerModal";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { BaseIT, UpdateBaseIT } from "../../../../types";
import { PDFFile } from "../../../../components/PDFFile";
import { AuthContext } from "../../../../AuthContext";
import { classNames } from "../../../../utils";
import { InputSelect } from "../../../../components/InputSelect";
import { data as departamentList } from "../../../../data/departments.json";
import { FieldValues, useForm } from "react-hook-form";
import { useLocationRequest } from "../../../../hooks/useLocationRequest";
import { useMutation } from "@apollo/client";
import { UPDATE_GENERAL_MEDICINE } from "../../graphql/Mutation/updateRequest";
import { ModalSentData } from "../../../../components/ModalSentData";
import { DELETE_GENERAL_MEDICINE } from "../../graphql/Mutation/deleteRequest";

type Props = {
  data: BaseIT[];
  setModal: Function;
};

export function ModalRequest({ data, setModal }: Props) {
  const context = useContext(AuthContext);

  const [updateGeneralMedicineRequest] = useMutation(UPDATE_GENERAL_MEDICINE);
  const [deleteGeneralMedicineRequest] = useMutation(DELETE_GENERAL_MEDICINE);

  const [canEdit, setCanEdit] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [newData, setNewData] = useState(data[0]);

  const state = {
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
  };

  const allForm = useForm();

  const { locationData, dataCityList, dataMedicalCenter, dataDoctor } =
    useLocationRequest(allForm, data[0]);

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

  const deleteRequest = () => {
    if (userId == requestId || userRole == "admin") {
      setCanDelete(true)
    } else {
      alert(
        "Para poder eliminar esta consulta debes haberla creado o ser administrador, de lo contrario no puedes eliminar consultas de otros usuarios"
      );
    }
  }

  const onUpdateRequest = allForm?.handleSubmit(
    async (getData: UpdateBaseIT | FieldValues) => {
      try {
        setCorrect(false);
        await updateGeneralMedicineRequest({
          variables: {
            id: state?.id,
            department: getData?.department,
            city: getData?.city,
            medicalCenter: getData?.medicalCenter,
            date: getData?.date,
            hour: getData?.hour,
            doctor: getData?.doctor,
            patientStatus: getData?.patientStatus,
          },
        });

        setNewData({
          ...newData,
          department: getData?.department || state.department,
          city: getData?.city || state.city,
          medicalCenter: getData?.medicalCenter || state.medicalCenter, 
          date: getData?.date || state.date,
          hour: getData?.hour || state.hour,
          doctor: getData?.doctor || state.doctor,
          patientStatus: getData?.patientStatus || state.patientStatus,
        })

        setDataSent(true);
      } catch (err) {
        setCorrect(true);
        setDataSent(true);
      }
    }
  );

  const onDeleteRequest = async () => {
    try {
      await deleteGeneralMedicineRequest({
        variables: {
          id: state.id
        }
      })

      setModal(false)
    } catch (error) {
      alert('Error al tratar de eliminar la consulta')
    }
  }

  useEffect(() => {
    if (dataSent) {
      setTimeout(() => {
        setDataSent(false);
      }, 3000);
    }
  }, [dataSent]);

  return (
    <ContainerModal>
      <form
        className="relative grid gap-5 w-[95%] h-full bg-slate-50 px-6 pb-10 pt-14 mx-auto overflow-y-scroll rounded-lg overflow-hidden lg:w-[70%]"
        onSubmit={onUpdateRequest}
      >
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
              disabled
            />
            <Input label="Nombre" value={state?.firstName} disabled />
            <Input label="Apellido" value={state?.lastName} disabled />
            <Input label="Correo Electrónico" value={state?.email} disabled />
            <Input label="Seleccionar EPS" value={state?.eps} disabled />
          </div>
        </div>

        <div>
          <SubtitleInputs text="C. Lugar de la Cita Médica" />

          <div className="grid gap-4 sm:grid-cols-3">
            <InputSelect
              label="Departamento"
              fieldName="department"
              listData={departamentList}
              allForm={allForm}
              value={state?.department}
              disabled={!canEdit}
              editValue={canEdit}
            />
            <InputSelect
              label="Ciudad"
              fieldName="city"
              listData={dataCityList[locationData.department]}
              allForm={allForm}
              value={state?.city}
              disabled={!canEdit}
              editValue={canEdit}
            />
            <InputSelect
              label="Centro Médico"
              fieldName="medicalCenter"
              listData={dataMedicalCenter[locationData.city]}
              allForm={allForm}
              value={state?.medicalCenter}
              disabled={!canEdit}
              editValue={canEdit}
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
              value={state?.date}
              allForm={allForm}
              disabled={!canEdit}
              editValue={canEdit}
            />
            <Input
              value={state?.hour}
              type="time"
              label="Seleccionar Hora"
              fieldName="hour"
              allForm={allForm}
              disabled={!canEdit}
              editValue={canEdit}
            />
          </div>
        </div>

        <div>
          <SubtitleInputs text="E. Estado del paciente y preferencias" />

          <div className="grid gap-4 sm:grid-cols-2">
            <InputSelect
              label="Selecciona Médico"
              fieldName="doctor"
              value={state?.doctor}
              listData={
                dataDoctor[locationData?.city]
                  ? dataDoctor[locationData?.city][locationData?.medicalCenter]
                  : [""]
              }
              allForm={allForm}
              disabled={!canEdit}
              editValue={canEdit}
            />
            <InputSelect
              label="Estado del Paciente"
              fieldName="patientStatus"
              value={state?.patientStatus}
              listData={["Grave", "Estable", "Bueno"]}
              allForm={allForm}
              disabled={!canEdit}
              editValue={canEdit}
            />
          </div>
        </div>

        {!canEdit ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <MainButton
              text="Eliminar Solicitud"
              className={classNames([
                userId == requestId || userRole == "admin"
                  ? ""
                  : "opacity-[50%]",
                "bg-red-700 hover:bg-red-800",
              ])}
              onClick={deleteRequest}
            />

            <PDFDownloadLink
              document={<PDFFile data={newData} />}
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
                "bg-sky-700 hover:bg-sky-800",
              ])}
              onClick={userCanEdit}
            />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <MainButton
              text="Cancelar"
              className={classNames([
                userId == requestId || userRole == "admin"
                  ? ""
                  : "opacity-[50%]",
                "bg-red-700 hover:bg-red-800",
              ])}
              onClick={() => {
                setCanEdit(false);
                setModal(false);
              }}
            />
            <MainButton
              text="Enviar Solicitud"
              className={classNames([
                userId == requestId || userRole == "admin"
                  ? ""
                  : "opacity-[50%]",
                "bg-green-700 hover:bg-green-800",
              ])}
              onClick={() => {
                onUpdateRequest();
                setCanEdit(false);
              }}
            />
          </div>
        )}

        {canDelete && (
          <ContainerModal>
            <div className="w-[90%] max-w-[500px] bg-slate-100 p-10 rounded-md mx-auto">
              <h2 className="text-2xl text-slate-700 text-center mb-6">¿Estás seguro que deseas eliminar esta solicitud?</h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
                <MainButton
                  text="Cancelar"
                  className='bg-sky-700 hover:bg-sky-800'
                  onClick={() => setCanDelete(false)}
                />
                <MainButton
                  text="Eliminar"
                  className='bg-red-700 hover:bg-red-800'
                  onClick={onDeleteRequest}
                />
              </div>
            </div>
          </ContainerModal>
        )}

        {dataSent && (
          <div className="fixed top-[50px] right-2">
            <ModalSentData error={correct} />
          </div>
        )}
      </form>
    </ContainerModal>
  );
}

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { TemplatePage } from "../../../../components/TemplatePage";
import { BaseIT } from "../../../../types";
import { CREATE_GYNECOLOGY } from "../../graphql/Mutation/createRequest";
import { useLocationRequest } from "../../../../hooks/useLocationRequest";
import { useCreateRequest } from "../../../../hooks/useCreateRequest";
import { BaseCreateRequest } from "../../../../components/mainComponents/BaseCreateRequest";

export function GynecologyCreate() {
  const [correct, setCorrect] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [requeriments, setRequeriments] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const [downloadRequest, setDownloadRequest] = useState(false);
  const [dataRequest, setDataRequest] = useState<BaseIT>();

  const [createGynecologyRequest] = useMutation(CREATE_GYNECOLOGY);

  const allForm = useForm();
  const { locationData, dataCityList, dataMedicalCenter, dataDoctor } =
    useLocationRequest(allForm);

  const { onDownloadRequest, onClearForm, onSubmit } = useCreateRequest(
    dataRequest,
    requeriments,
    setClearForm,
    setDownloadRequest,
    setRequeriments,
    setCorrect,
    setDataSent,
    setDataRequest,
    createGynecologyRequest,
    allForm
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
        title="Ginecología: Ingreso de Solicitudes"
        text="Desde aquí podrás ingresar las solicitudes al área de ginecología"
        buttonText="Ver Solicitudes"
        route="/dashboard/ginecologia/"
      />

      <BaseCreateRequest 
        allForm={allForm}
        dataCityList={dataCityList}
        locationData={locationData}
        dataMedicalCenter={dataMedicalCenter}
        dataDoctor={dataDoctor}
        requeriments={requeriments}
        setRequeriments={setRequeriments}
        dataRequest={dataRequest}
        onClearForm={onClearForm}
        onDownloadRequest={onDownloadRequest}
        dataSent={dataSent}
        setDownloadRequest={setDownloadRequest}
        correct={correct}
        downloadRequest={downloadRequest}
        clearForm={clearForm}
        setClearForm={setClearForm}
        onSubmit={onSubmit}
      />

    </form>
  );
}

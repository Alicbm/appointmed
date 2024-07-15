import { useEffect, useState } from "react";
import { TemplatePage } from "../../../../components/TemplatePage";
import { useForm } from "react-hook-form";
import { BaseIT } from "../../../../types";
import { useMutation } from "@apollo/client";
import { CREATE_OPTOMETRY } from "../../graphql/Mutation/createRequest";
import { useLocationRequest } from "../../../../hooks/useLocationRequest";
import { useCreateRequest } from "../../../../hooks/useCreateRequest";
import { BaseCreateRequest } from "../../../../components/mainComponents/BaseCreateRequest";
import { Loader } from "../../../../components/Loader";

export function OptometryCreate() {
  const [correct, setCorrect] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [requeriments, setRequeriments] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const [downloadRequest, setDownloadRequest] = useState(false);
  const [dataRequest, setDataRequest] = useState<BaseIT>();

  const [createOptometryRequest, { loading }] = useMutation(CREATE_OPTOMETRY);

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
    createOptometryRequest,
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
        title="Optometría: Ingreso de Solicitudes"
        text="Desde aquí podrás ingresar las solicitudes al área de optometría"
        buttonText="Ver Solicitudes"
        route="/dashboard/optometria/"
      />

      { loading && <Loader /> } 

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

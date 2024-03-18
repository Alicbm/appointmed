import { useState } from "react";
import { Input } from "../../../../components/Input";
import { InputCheck } from "../../../../components/InputCheck";
import { MainButton } from "../../../../components/MainButton";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { InputSelect } from "../../../../components/InputSelect";
import { data as epsList } from "../../../../data/eps.json";
import { FieldValues, useForm } from "react-hook-form";
import { CreateRequestIT, TypeButton } from "../../../../types";
import { useMutation } from "@apollo/client";
import { CREATE_GYNECOLOGY } from "../../graphql/Mutation/createRequest";

export function GynecologyCreate() {
  const [checked, setChecked] = useState(true);
  const [createGynecologyRequest] = useMutation(CREATE_GYNECOLOGY);

  const allForm = useForm();

  const onSubmit = allForm?.handleSubmit(
    async (getData: CreateRequestIT | FieldValues) => {
      await createGynecologyRequest({
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
        },
      });
    }
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <TemplatePage
        title="Ginecología: Ingreso de Solicitudes"
        text="Desde aquí podrás ingresar las solicitudes al área de ginecología"
        buttonText="Ver Solicitudes"
        route="/dashboard/ginecologia/"
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

        <div className="grid grid-cols-3 gap-4">
          {/* <div>
            <input type="email" {...register('pepe', { required: true, pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'El email ta malito'
            } } )}/>
            {(errors['pepe']?.type === 'pattern') && <span>Eamil malo</span>}
            {(errors['pepe']?.type === 'required') && <span>campo requerido</span>}
          </div> */}
          <Input
            type="number"
            label="Número de Registro"
            fieldName="registryNumber"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            label="Nombre"
            fieldName="firstName"
            allForm={allForm}
            rules={{ required: true, minLength: 2, maxLength: 20 }}
          />
          <Input
            label="Apellido"
            fieldName="lastName"
            allForm={allForm}
            rules={{ required: true, minLength: 2, maxLength: 20 }}
          />
          <Input
            label="Correo Electrónico"
            fieldName="email"
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
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="C. Lugar de la Cita Médica" />

        <div className="grid grid-cols-3 gap-4">
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

        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-2 gap-4">
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
        <InputCheck label='Al hacer clic en "Aceptar" estás de acuerdo con nuestros términos y condiciones. Por favor, revisa detenidamente antes de continuar. ¡Gracias por confiar en nosotros!' />
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        <MainButton
          text="Descargar PDF"
          className="bg-black hover:bg-gray-900"
        />
        <MainButton
          type={TypeButton.submit}
          text="Enviar Solicitud"
          className="bg-sky-700 hover:bg-sky-800"
        />
      </div>
    </form>
  );
}

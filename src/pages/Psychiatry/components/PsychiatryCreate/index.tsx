import { useState } from "react";
import { Input } from "../../../../components/Input";
import { InputCheck } from "../../../../components/InputCheck";
import { MainButton } from "../../../../components/MainButton";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { InputSelect } from "../../../../components/InputSelect";
import { data } from "../../../../data/eps.json";
import { useForm } from 'react-hook-form'
import { TypeButton } from "../../../../types";

export function PsychiatryCreate() {
  const [checked, setChecked] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit((data) => console.log(data))

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
            label="Número de Registro" 
            fieldName="registry_number"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <Input 
            label="Nombre" 
            fieldName="first_name"
            register={register}
            rules={{ required: true, minLength: 2, maxLength: 20 }}
            errors={errors}
          />
          <Input 
            label="Apellido" 
            fieldName="last_name"
            register={register}
            rules={{ required: true, minLength: 2, maxLength: 20 }}
            errors={errors}
          />
          <Input 
            label="Correo Electrónico" 
            fieldName="email"
            register={register}
            rules={{ required: true, pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'El email ta malito'
            } }}
            errors={errors}
          />
          <InputSelect label="Seleccionar EPS" listData={data} />
        </div>
      </div>

      <div>
        <SubtitleInputs text="C. Lugar de la Cita Médica" />

        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Departamento" 
            fieldName="department"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <Input 
            label="Ciudad" 
            fieldName="city"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <Input 
            label="Centro Médico" 
            fieldName="name_hospital"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="D. Fecha de la Cita Médica" />

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Seleccionar Fecha" 
            fieldName="date"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <Input 
            label="Seleccionar Hora" 
            fieldName="hour"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <SubtitleInputs text="E. Estado del paciente y preferencias" />

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Selecciona Médico" 
            fieldName="doctor"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <Input 
            label="Estado del Paciente" 
            fieldName="patient_status"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
        </div>
      </div>

      <div className="pl-5">
        <InputCheck label='Al hacer clic en "Aceptar" estás de acuerdo con nuestros términos y condiciones. Por favor, revisa detenidamente antes de continuar. ¡Gracias por confiar en nosotros!' />
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        <MainButton text="Descargar PDF" className="bg-black hover:bg-gray-900" />
        <MainButton type={TypeButton.submit} text="Enviar Solicitud" className="bg-sky-700 hover:bg-sky-800" />
      </div>
    </form>
  );
}

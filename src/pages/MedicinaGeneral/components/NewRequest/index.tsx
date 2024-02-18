import { useState } from "react";
import { Input } from "../../../../components/Input";
import { InputCheck } from "../../../../components/InputCheck";
import { MainButton } from "../../../../components/MainButton";
import { SubtitleInputs } from "../../../../components/SubtitleInputs";
import { TemplatePage } from "../../../../components/TemplatePage";
import { InputSelect } from "../../../../components/InputSelect";
import { data } from '../../../../data/eps.json'

export function NewRequest() {
  const [checked, setChecked] = useState(true);

  return (
    <div>
      <TemplatePage
        title="Medicina General: Ingreso de Solicitudes"
        text="Desde aquí podrás ingresar las solicitudes al área de medicina general"
      />

      <SubtitleInputs text="A. Seleccionar Tipo Entidad de Salud Promotora" />

      <div className="grid grid-cols-2 mb-10">
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

      <SubtitleInputs text="B. Datos del Solicitante" />

      <div className="grid grid-cols-3 gap-4 mb-10">
        <Input label="Nro Registro" />
        <Input label="Nombre" />
        <Input label="Apellido" />
        <Input label="Correo Electrónico" />
        <InputSelect label="Seleccionar EPS" listData={data} />
      </div>

      <SubtitleInputs text="C. Lugar de la Cita Médica" />

      <div className="grid grid-cols-3 gap-4 mb-10">
        <Input label="Departamento" />
        <Input label="Ciudad" />
        <Input label="Centro Médico" />
      </div>

      <SubtitleInputs text="D. Fecha de la Cita Médica" />

      <div className="grid grid-cols-2 gap-4 mb-10">
        <Input label="Seleccionar Fecha" />
        <Input label="Seleccionar Hora" />
      </div>

      <SubtitleInputs text="E. Estado del paciente y preferencias" />

      <div className="grid grid-cols-2 gap-4 mb-10">
        <Input label="Selecciona Médico" />
        <Input label="Estado del Paciente" />
      </div>

      <div className="pl-5">
        <InputCheck label='Al hacer clic en "Aceptar" estás de acuerdo con nuestros términos y condiciones. Por favor, revisa detenidamente antes de continuar. ¡Gracias por confiar en nosotros!' />
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        <MainButton text="Enviar Solicitud" />
        <MainButton text="Descargar PDF" />
      </div>
    </div>
  );
}

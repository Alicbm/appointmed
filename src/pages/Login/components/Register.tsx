/* eslint-disable @typescript-eslint/ban-types */
import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { MainButton } from "../../../components/MainButton";
import logo from "../../../images/appointmed_logo.png";

type Props = {
  setLogin: Function;
};

export function RegisterUser({ setLogin }: Props) {
  const allForm = useForm();

  return (
    <div className="flex items-center w-[50%] bg-slate-50 p-10">
      <div className="flex flex-col items-center w-full max-w-[450px] gap-4 mx-auto">
        <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
          <img src={logo} alt="Appointmed" />
        </div>
        <Input
          label="Nombre de suario"
          fieldName="usuario"
          allForm={allForm}
          rules={{ required: true }}
        />
        <Input
          label="Correo Electrónico"
          fieldName="correo"
          allForm={allForm}
          rules={{ required: true }}
        />
        <Input
          label="Contraseña"
          fieldName="contraseña"
          allForm={allForm}
          rules={{ required: true }}
        />

        <Input
          label="Confirmar Contraseña"
          fieldName="confirmar_contraseña"
          allForm={allForm}
          rules={{ required: true }}
        />

        <div className="w-full grid grid-cols-2 gap-3">
          <MainButton
            text="Cancelar"
            className="w-full h-[45px] border border-sky-800 text-sky-900"
            onClick={() => setLogin(true)}
          />
          <MainButton
            text="Crear Usuario"
            className="w-full h-[45px] bg-sky-800 hover:bg-sky-900"
          />
        </div>
      </div>
    </div>
  );
}

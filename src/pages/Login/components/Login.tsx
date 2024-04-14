/* eslint-disable @typescript-eslint/ban-types */
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "../../../components/Input";
import { InputSelect } from "../../../components/InputSelect";
import { MainButton } from "../../../components/MainButton";
import logo from "../../../images/appointmed_logo.png";

type Props = {
  allForm: UseFormReturn<FieldValues>;
  setLogin: Function;
};

export function LoginUser({ allForm, setLogin }: Props) {
  return (
    <div className="flex items-center w-[50%] bg-slate-50 p-10">
      <div className="flex flex-col items-center w-full max-w-[450px] gap-4 mx-auto">
        <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
          <img src={logo} alt="Appointmed" />
        </div>
        <InputSelect
          label="Ingresar como"
          allForm={allForm}
          fieldName="user"
          listData={["Administrador", "Usuario Automatico", "Usuario propio"]}
        />
        <Input
          label="Usuario"
          fieldName="usuario"
          allForm={allForm}
          rules={{ required: true }}
        />
        <Input
          label="Contraseña"
          fieldName="contraseña"
          allForm={allForm}
          rules={{ required: true }}
        />

        <MainButton
          text="Ingresar"
          className="w-full h-[50px] bg-sky-800 hover:bg-sky-900"
        />

        <div>
          <p className="text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <span 
              className="text-sky-800 underline cursor-pointer"
              onClick={() => setLogin(false)}
            >
              Crea tu propia cuenta
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

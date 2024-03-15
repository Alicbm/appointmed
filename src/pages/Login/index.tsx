import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { MainButton } from "../../components/MainButton";
import logo from "../../images/appointmed_logo.png";
import { InputSelect } from "../../components/InputSelect";
import bgImage from './images/bgImage.jpg'

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form
      onSubmit={onSubmit}
      className="fixed top-0 left-0 right-0 bottom-0 flex h-[100vh] z-10"
    >
      <div className="w-[50%] bg-slate-50 filter brightness-[.5]">
        <img 
          src={bgImage} 
          alt="Appointmed" 
          className="w-[100%] h-[100%] object-cover"
        />
      </div>
      <div className="flex items-center w-[50%] bg-slate-50 p-10">
        <div className="flex flex-col items-center w-full max-w-[450px] gap-4 mx-auto">
          <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
            <img src={logo} alt="Appointmed" />
          </div>
          <InputSelect
            label="Ingresar como"
            listData={["Administrador", "Usuario Automatico", "Usuario propio"]}
          />
          <Input
            label="Usuario"
            fieldName="usuario"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />
          <Input
            label="Contraseña"
            fieldName="contraseña"
            register={register}
            rules={{ required: true }}
            errors={errors}
          />

          <MainButton text="Ingresar" className="w-full h-[50px] bg-sky-800 hover:bg-sky-900" />

          <div>
            <p className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <span className="text-sky-800 underline cursor-pointer">Crea tu propia cuenta</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

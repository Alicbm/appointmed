/* eslint-disable @typescript-eslint/ban-types */
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import { MainButton } from "../../../components/MainButton";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/Mutation/createUser";
import { CreateUserDto } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { data as epsList } from "../../../data/eps.json";
import logo from "../../../images/appointmed_logo.png";
import { InputSelect } from "../../../components/InputSelect";

type Props = {
  setLogin: Function;
};

export function RegisterUser({ setLogin }: Props) {
  const context = useContext(AuthContext)
  
  const [createUsersRequest] = useMutation(REGISTER);
  const navigate = useNavigate()
  const allForm = useForm();

  const onSubmit = allForm?.handleSubmit(
    async (getData: CreateUserDto | FieldValues) => {
      try {
         if (getData?.password === getData?.repeatPassword) {
          const newFirstName = capitalizeFirstLetter(getData?.firstName)
          const newLastName = capitalizeFirstLetter(getData?.lastName)

          const { data} = await createUsersRequest({
            variables: {
              firstName: newFirstName,
              lastName: newLastName,
              email: getData?.email,
              password: getData?.password,
              createdAt: new Date(),
              eps: getData?.eps,
              role: 'user',
            },
          });

          localStorage.setItem('AUTH_TOKEN_APPOINTMED', JSON.stringify(data?.createUsersRequest))
          context?.setUser(data?.createUsersRequest)
          navigate('/dashboard')

         } else {
          alert('Las contraseñas no coinciden')
         }
      } catch (err) {
        console.log(err)
      }
    }
  );

  return (
    <div className="w-full md:w-[50%] flex items-center bg-slate-50 p-10">
      <form className="flex flex-col items-center w-full max-w-[450px] gap-4 mx-auto">
        <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
          <img src={logo} alt="Appointmed" />
        </div>
        
        <div className="flex gap-2">
          <Input
            label="Primer Nombre"
            fieldName="firstName"
            allForm={allForm}
            rules={{ required: true }}
          />
          <Input
            label="Apellido"
            fieldName="lastName"
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>

        <Input
          label="Correo Electrónico"
          fieldName="email"
          allForm={allForm}
          rules={{ required: true }}
        />
        <div className="flex gap-2">
          <Input
            label="Contraseña"
            fieldName="password"
            type="password"
            allForm={allForm}
            rules={{ required: true }}
          />

          <Input
            label="Confirmar Contraseña"
            fieldName="repeatPassword"
            type="password"
            allForm={allForm}
            rules={{ required: true }}
          />
        </div>

          <InputSelect
            label="Seleccionar EPS"
            listData={epsList}
            fieldName="eps"
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
            onClick={onSubmit}
          />
        </div>

        <div>
          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{" "}
            <span
              className="text-sky-800 underline cursor-pointer"
              onClick={() => setLogin(true)}
            >
              ingresa aquí!
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

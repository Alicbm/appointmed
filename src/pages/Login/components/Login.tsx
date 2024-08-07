/* eslint-disable @typescript-eslint/ban-types */
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Input } from "../../../components/Input";
import { MainButton } from "../../../components/MainButton";
import { LOGIN } from "../graphql/Mutation/createRequest";
import { LoginType } from "../../../types";
import { AlertModal } from "../../../components/AlertModal";
import logo from "../../../images/appointmed_logo.png";
import { AuthContext } from "../../../AuthContext";
import { Loader } from "../../../components/Loader";

type Props = {
  setLogin: Function;
};

export function LoginUser({ setLogin }: Props) {
  const context = useContext(AuthContext)

  const [auth, setAuth] = useState(false);
  const [login, { loading }] = useMutation(LOGIN);
  const allForm = useForm();

  const navigate = useNavigate()

  const onSubmit = allForm?.handleSubmit(
    async (getData: LoginType | FieldValues) => {
      try {
        const { data } = await login({
          variables: {
            email: getData?.email,
            password: getData?.password,
          }
        });

        localStorage.setItem('AUTH_TOKEN_APPOINTMED', JSON.stringify(data?.login))
        context?.setUser(data?.login)

        navigate('/dashboard')
      } catch (err) {
        setAuth(true);
        console.log(err)
      }
    }
  );

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        setAuth(false)
      }, 3000);
    }
  }, [auth])

  return (
    <div className="w-full flex items-center md:w-[50%] bg-slate-50 p-10">
      <form
        className="flex flex-col items-center w-full max-w-[450px] gap-4 mx-auto"
        onSubmit={onSubmit}
      >
        { loading && <Loader /> }
       
        <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
          <img src={logo} alt="Appointmed" />
        </div>
        <Input
          label="Usuario"
          fieldName="email"
          allForm={allForm}
          rules={{ required: true }}
        />
        <Input
          label="Contraseña"
          fieldName="password"
          type="password"
          allForm={allForm}
          rules={{ required: true }}
        />

        <MainButton
          text="Ingresar"
          className="w-full h-[50px] bg-sky-800 hover:bg-sky-900"
          onClick={onSubmit}
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

        {auth && (
          <AlertModal
            title="No estás Autorizado"
            text="Usuario o contraseña incorrectos"
          >
            <MainButton
              text="Aceptar"
              className="w-full max-w-[200px] bg-sky-800 hover:bg-sky-900"
              onClick={() => setAuth(false)}
            />
          </AlertModal>
        )}
      </form>
    </div>
  );
}

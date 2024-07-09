/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN } from "../../pages/Login/graphql/Mutation/createRequest";
import { ContainerModal } from "../ContainerModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { MainButton } from "../MainButton";
import { classNames } from "../../utils";
import { useMutation } from "@apollo/client";
import { Input } from "../Input";
import logo from "../../images/appointmed_logo.png";
import { useForm } from "react-hook-form";
import { UPDATE_USER } from "./graphql/Mutation/updateUser";
import { ModalSentData } from "../ModalSentData";
import { InputSelect } from "../InputSelect";
import { data as epsList } from "../../data/eps.json";
import { DELETE_USER } from "./graphql/Mutation/deleteUser";
import { useHandleActions } from "./hooks/useHandleActions";

type Props = {
  setModal: (arg: boolean) => void;
};

export function UserProfile({ setModal }: Props) {
  const context = useContext(AuthContext);
  const [login] = useMutation(LOGIN);
  const [updateUsersRequest] = useMutation(UPDATE_USER);
  const [deleteUsersRequest] = useMutation(DELETE_USER);

  const [canEdit, setCanEdit] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [messageResponse, setMessageResponse] = useState("");

  const [values, setValues] = useState({
    firstName: context?.user?.user?.firstName,
    lastName: context?.user?.user?.lastName,
    email: context?.user?.user?.email,
    eps: context?.user?.user?.eps,
  });

  const allForm = useForm();

  const { handleChangePassword, handleDeleteUser, handleUpdateUserData } =
    useHandleActions(
      setDataSent,
      setCorrect,
      setMessageResponse,
      setDeleteUser,
      setModal,
      login,
      updateUsersRequest,
      deleteUsersRequest,
      allForm,
      values
    );

  useEffect(() => {
    if (dataSent) {
      setTimeout(() => {
        setDataSent(false);
      }, 3000);
    }
  }, [dataSent]);

  return (
    <ContainerModal>
      <div
        className={classNames([
          canEdit ? "h-full" : "",
          "w-[95%] max-w-[700px] flex flex-col gap-4 bg-slate-100 p-6 mx-auto overflow-y-scroll rounded-lg sm:p-10",
        ])}
      >
        <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
          <img src={logo} alt="Appointmed" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Primer Nombre"
            fieldName="firstName"
            value={values.firstName}
            editValue={canEdit}
            allForm={allForm}
            onChange={(e: { target: { value: string } }) =>
              setValues({
                ...values,
                firstName: e.target.value,
              })
            }
          />
          <Input
            label="Apellido"
            fieldName="lastName"
            value={values.lastName}
            editValue={canEdit}
            allForm={allForm}
            onChange={(e: { target: { value: string } }) =>
              setValues({
                ...values,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <Input
          label="Correo Electrónico"
          fieldName="email"
          value={values.email}
          editValue={canEdit}
          allForm={allForm}
          onChange={(e: { target: { value: string } }) =>
            setValues({
              ...values,
              email: e.target.value,
            })
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputSelect
            label="EPS"
            fieldName="eps"
            value={context?.user?.user?.eps}
            listData={epsList}
            allForm={allForm}
            disabled={!canEdit}
            editValue={canEdit}
          />
          <Input
            label="Role"
            fieldName="role"
            value={context?.user?.user?.role}
            disabled
          />
        </div>

        <Input
          label="Fecha de Registro"
          fieldName="createdAt"
          value={context?.user?.user?.createdAt}
          disabled
        />

        {canEdit && (
          <div>
            <MainButton
              text="Eliminar Cuenta"
              className="w-full text-[16px] bg-red-700 hover:bg-red-800"
              onClick={() => setDeleteUser(true)}
            />
          </div>
        )}

        {canEdit && (
          <div className="grid gap-4 p-5 border border-gray-200 rounded-md">
            <h3 className="text-xl text-sky-800 font-bold">
              Proporciona los siguientes datos para cambiar tu contraseña
              (Opcional)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="password"
                label="Contraseña Actual"
                fieldName="actualPassword"
                allForm={allForm}
              />
              <Input
                type="password"
                label="Nueva Contraseña"
                fieldName="newPassword"
                allForm={allForm}
              />
            </div>
            <Input
              type="password"
              label="Repetir Nueva Contraseña"
              fieldName="repeatNewPassword"
              allForm={allForm}
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <MainButton
                text="Cambiar Contraseña"
                className="w-full text-[16px] bg-black hover:bg-gray-950"
                onClick={() => {
                  handleChangePassword();
                  setCanEdit(true);
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <MainButton
            text="Cancelar"
            className="w-full text-[16px] bg-red-700 hover:bg-red-800"
            onClick={() => setModal(false)}
          />
          {!canEdit ? (
            <MainButton
              text="Editar Perfil"
              className="w-full text-[16px] bg-sky-800 hover:bg-sky-900"
              onClick={() => setCanEdit(true)}
            />
          ) : (
            <MainButton
              text="Guardar Cambios"
              className="w-full text-[16px] bg-sky-800 hover:bg-sky-900"
              onClick={handleUpdateUserData}
            />
          )}
        </div>

        {deleteUser && (
          <ContainerModal>
            <div className="max-w-[500px] flex flex-col gap-4 bg-slate-50 p-6 mx-auto rounded-lg sm:p-10">
              <h3 className="text-2xl text-sky-800 text-center">
                ¿Estás seguro que deseas eliminar tu cuenta?
              </h3>
              <p className="text-lg text-center">
                Al hacerlo no podrás editar ni eliminar las consultas que hayas
                realizado
              </p>

              <Input
                type="password"
                label="Escribe tu contraseña"
                fieldName="passwordDeleteAccount"
                allForm={allForm}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <MainButton
                  text="Cancelar"
                  className="w-full text-[16px] bg-sky-800 hover:bg-sky-900"
                  onClick={() => setDeleteUser(false)}
                />
                <MainButton
                  text="Eliminar Cuenta"
                  className="w-full text-[16px] bg-red-700 hover:bg-red-800"
                  onClick={handleDeleteUser}
                />
              </div>
            </div>
          </ContainerModal>
        )}

        {dataSent && (
          <div className="fixed top-[50px] right-2 z-50">
            <ModalSentData error={correct} text={messageResponse} />
          </div>
        )}
      </div>
    </ContainerModal>
  );
}

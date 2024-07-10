/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormReturn } from "react-hook-form";
import { MutationType, UpdateUser } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";


export const useHandleActions = (
  setDataSent: (arg: boolean) => void,
  setCorrect: (arg: boolean) => void,
  setMessageResponse: (arg: string) => void,
  setDeleteUser: (arg: boolean) => void,
  setModal: (arg: boolean) => void,
  login: MutationType,
  updateUsersRequest: MutationType,
  deleteUsersRequest: MutationType,
  allForm: UseFormReturn<FieldValues>,
  values: any
) => {

  const context = useContext(AuthContext)
  const navigate = useNavigate()

  const loginUser = allForm?.handleSubmit(
    async (getData: UpdateUser | FieldValues) => {
      try {
        if(String(getData?.actualPassword)?.length == 0) {
          return alert('Es necesario que escribas tu antigua contraseña')
        }

        await login({
          variables: {
            email: context?.user?.user?.email,
            password: getData?.actualPassword,
          },
        });

      } catch (error) {
        setDataSent(true);
        setCorrect(true);
        throw "Tu antigua contraseña es incorrecta";
      }
    }
  );

  const changeUserPassword = allForm.handleSubmit(
    async (getData: UpdateUser | FieldValues) => {
      try {
        if (
          String(getData?.newPassword)?.length == 0 ||
          String(getData.repeatNewPassword).length == 0
        ) {
          return alert(
            "Es necesario que escribas y confirmes la nueva contraseña"
          );
        }

        if (getData?.newPassword !== getData.repeatNewPassword) {
          return alert("Las nuevas contraseñas no coinciden");
        }

        await updateUsersRequest({
          variables: {
            id: context?.user?.user?.id,
            dto: {
              password: getData?.newPassword,
            },
          },
        });

      } catch (err) {
        setDataSent(true);
        setCorrect(true);
        setMessageResponse("");
      }
    }
  );

  const handleChangePassword = async () => {
    try {
      await loginUser();
      await changeUserPassword();

      setCorrect(false);
      setDataSent(true);
      return setMessageResponse("Contraseña cambiada exitosamente");
    } catch (error) {
      setCorrect(true);
      setDataSent(true);
      setMessageResponse(error as string);
    }
  };

  const handleUpdateUserData = allForm?.handleSubmit(
    async (getData: UpdateUser | FieldValues) => {
      try {
        await updateUsersRequest({
          variables: {
            id: context?.user?.user?.id,
            dto: {
              firstName: getData?.firstName,
              lastName: getData?.lastName,
              email: getData?.email,
              eps: getData?.eps,
            },
          },
        });

        context?.setUser({
          ...context?.user?.user,
          user: {
            ...context?.user?.user,
            firstName: String(getData?.firstName),
            lastName: String(getData?.lastName),
            email: String(getData?.email),
            eps: getData?.eps ? String(getData?.eps) : values?.eps,
          },
        })

        setMessageResponse("");
        setCorrect(false);
        setDataSent(true);
      } catch (err) {
        setCorrect(true);
        setDataSent(true);
      }
    }
  );

  const handleDeleteUser = allForm?.handleSubmit(
    async (getData: UpdateUser | FieldValues) => {
      try {
        if(String(getData?.passwordDeleteAccount).length == 0) {
          return alert('Para continuar con el proceso debes escribir tu contraseña')
        }

        await login({
          variables: {
            email: context?.user?.user?.email,
            password: getData?.passwordDeleteAccount,
          }
        });

        await deleteUsersRequest({
          variables: {
            id: context?.user?.user?.id
          }
        })

        setDeleteUser(false)
        setModal(false)

        localStorage.removeItem('AUTH_TOKEN_APPOINTMED')
        context?.setUser(null)
        navigate('/')
    
      } catch (error) {
        setDataSent(true);
        setCorrect(true);
        setMessageResponse("Tu antigua contraseña es incorrecta");
      }
    }
  )

  return {
    handleChangePassword,
    handleDeleteUser,
    handleUpdateUserData
  }
}
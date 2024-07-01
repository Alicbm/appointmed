/* eslint-disable @typescript-eslint/ban-types */
import { ContainerModal } from "../ContainerModal";
import { Input } from "../Input";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { MainButton } from "../MainButton";
import logo from "../../images/appointmed_logo.png";

type Props = {
  setModal: Function;
}

export function UserProfile({ setModal }: Props) {
  const context = useContext(AuthContext);
  
  const [values, setValues] = useState({
    name: context?.user?.user?.firstName,
    email: context?.user?.user?.email
  })

  return (
    <ContainerModal>
      <div className="w-[95%] max-w-[500px] flex flex-col gap-4 bg-slate-100 p-6 mx-auto rounded-lg sm:p-10">
        <div className="flex justify-center w-full bg-gray-100 border border-gray-200 px-4 py-1 rounded-md">
          <img src={logo} alt="Appointmed" />
        </div>
        <Input
          label="Nombre de suario"
          fieldName="name"
          value={values.name}
          editValue={true}
          onChange={(e: { target: { value: string; }; }) => setValues({
            ...values,
            name: e.target.value
          })}
          disabled
        />
        <Input
          label="Correo Electrónico"
          fieldName="email"
          value={values.email}
          editValue={true}
          onChange={(e: { target: { value: string; }; }) => setValues({
            ...values,
            email: e.target.value
          })}
          disabled
          // allForm={allForm}
          // rules={{ required: true }}
        />
        <Input
          label="Role"
          fieldName="role"
          value={context?.user?.user?.role}
          disabled
          // allForm={allForm}
          // rules={{ required: true }}
        />

        <Input
          label="Usuario Creado En"
          fieldName="createdAt"
          value={context?.user?.user?.createdAt}
          disabled
          // allForm={allForm}
          // rules={{ required: true }}
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <MainButton
            text="Cancelar"
            className="w-full text-[16px] bg-red-700 hover:bg-red-800"
            onClick={() => setModal(false)}
          />
          <MainButton
            text="Guardar Cambios"
            className="w-full text-[16px] bg-sky-800 hover:bg-sky-900"
            // onClick={handleLoggout}
          />
        </div>
      </div>
    </ContainerModal>
  );
}

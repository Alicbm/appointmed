import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../MainButton";
import { Modal } from "../Modal";
import logo from "../../images/appointmed_logo.png";
import { useState } from "react";

export function Header() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center w-full max-w-[1200px] h-[80px] bg-slate-100 border-b border-slate-200 rounded-md px-8 mx-auto">
      <div onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="Appointmed" className="h-[50px] cursor-pointer" />
      </div>

      <div className="flex gap-4">
        <MainButton
          text="Cambiar de Cuenta"
          className="h-[35px] text-[16px] bg-sky-800 hover:bg-sky-900"
        />
        <MainButton
          text="Cerrar Sesión"
          className="h-[35px] text-[16px] bg-black hover:bg-gray-950"
          onClick={() => setModal(true)}
        />
      </div>

      {modal && (
        <Modal>
          <div className="relative flex flex-col justify-center gap-8 w-[500px] h-[250px] bg-slate-50 px-8 py-5 rounded-md">
            <span 
              className="absolute top-4 right-4 text-gray-600 text-4xl hover:text-gray-700 cursor-pointer"
              onClick={() => setModal(false)}
            >
              <IoClose />
            </span>
            <div>
              <p className="text-gray-600 text-3xl text-center">
                ¿Estás seguro que deseas cerrar la sesión?
              </p>
            </div>
            <div className="flex gap-4">
              <MainButton
                text="Cancelar"
                className="w-full text-[16px] bg-red-700 hover:bg-red-800"
                onClick={() => setModal(false)}
              />
              <MainButton
                text="Cerrar Sesión"
                className="w-full text-[16px] bg-sky-800 hover:bg-sky-900"
                onClick={() => {
                  navigate('/')
                  setModal(false)
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </header>
  );
}

import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { MainButton } from "../MainButton";
import { ContainerModal } from "../ContainerModal";
import { MobileSideBar } from "../MobileSideBar";
import { AuthContext } from "../../AuthContext";
import logo from "../../images/appointmed_logo.png";
import { UserProfile } from "../UserProfile";

export function Header() {
  const context = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const navigate = useNavigate();

  const handleLoggout = () => {
    localStorage.removeItem('AUTH_TOKEN_APPOINTMED')
    context?.setUser(null)
    navigate('/')
    setModal(false)
  }

  return (
    <header className="flex flex-col items-center w-full max-w-[1200px] bg-slate-100 border-b border-slate-200 rounded-sm px-4 py-2 mx-auto sm:flex-row sm:justify-between sm:px-8">
      <div
        className="flex justify-center items-center gap-4 w-full py-2 px-1 border-b border-b-slate-200 sm:p-0 sm:border-none sm:w-auto"
        onClick={() => navigate("/dashboard")}
      >
        <span
          className="hidden sm:block text-3xl text-sky-800 lg:hidden cursor-pointer"
          onClick={() => setSideBar(!sideBar)}
        >
          <MdOutlineMenu />
        </span>

        <img
          src={logo}
          alt="Appointmed"
          className="h-[45px] cursor-pointer lg:h-[50px]"
        />

        <span
          className="text-3xl text-sky-800 sm:hidden"
          onClick={() => setSideBar(!sideBar)}
        >
          <MdOutlineMenu />
        </span>
      </div>

      {/* SideBar for mobile */}
      {sideBar && <MobileSideBar sideBar={sideBar} setSideBar={setSideBar} />}

      <div className="flex items-center gap-4 py-2">
        <MainButton
          text="Perfil de Usuario"
          className="h-[35px] text-[13px] bg-sky-800 hover:bg-sky-900 sm:text-[14px]"
          onClick={() => setUserModal(true)}
        />
        <MainButton
          text="Cerrar Sesión"
          className="h-[35px] text-[13px] bg-black hover:bg-gray-950 sm:text-[14px]"
          onClick={() => setModal(true)}
        />
      </div>

      {modal && (
        <ContainerModal>
          <div className="relative flex flex-col justify-center gap-8 w-[90%] max-w-[300px] h-[250px] bg-slate-50 px-4 py-5 rounded-sm sm:w-[500px] sm:max-w-[500px] sm:px-8">
            <span
              className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-700 cursor-pointer sm:text-4xl"
              onClick={() => setModal(false)}
            >
              <IoClose />
            </span>
            <div>
              <p className="text-gray-600 text-[18px] text-center sm:text-3xl">
                ¿Estás seguro que deseas cerrar la sesión?
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <MainButton
                text="Cancelar"
                className="w-full text-[16px] bg-red-700 hover:bg-red-800"
                onClick={() => setModal(false)}
              />
              <MainButton
                text="Cerrar Sesión"
                className="w-full text-[16px] bg-sky-800 hover:bg-sky-900"
                onClick={handleLoggout}
              />
            </div>
          </div>
        </ContainerModal>
      )}

      { userModal && <UserProfile setModal={setUserModal} /> }
    </header>
  );
}

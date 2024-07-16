import { useEffect } from "react";
import { MainButton } from "../../components/MainButton";
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard")
    }, 10000)
  }, [])

  return (
    <div className="w-full h-[70vh] pt-8">
      <div className="w-[90%] bg-slate-50 border border-slate-200 rounded-lg mx-auto sm:w-[550px] p-4">
        <h1 className="text-2xl text-sky-800 pb-4">Página no encontrada</h1>
        <p className="text-[18px] mb-4">La página a la que intenta ingresar no existe. Usted será redireccionado a la vista principal en 10 segundos.</p>
        <p className="text-[18px] mb-4">Para volver al inicio por favor presione el boton que se presenta a continuación.</p>
        <MainButton 
          text="Volver al Inicio" 
          className="bg-sky-800 w-full sm:w-[200px]"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  )
}
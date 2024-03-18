import { useNavigate } from "react-router-dom";
import { MainButton } from "../MainButton";

type Props = {
  text: string;
  route: string;
}

export function NotResults({ text, route }: Props) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-10">
      <p className="text-xl text-gray-500">
        {text}
      </p>
      <MainButton 
        text='Crear nueva solicitud' 
        className="bg-sky-800"
        onClick={() => navigate(route)}
      />
    </div>
  );
}

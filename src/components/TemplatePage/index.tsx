import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  text: string;
  route: string;
  buttonText: string;
}

export function TemplatePage ({ title, text, buttonText, route }: Props) {
  const navigate = useNavigate()

  return (
    <div className="bg-slate-100 py-8 px-4 rounded-lg">
      <h1 className="text-sky-700 text-3xl font-bold tracking-wider mb-2">{ title }</h1>
      <p className="text-gray-500 text-lg">{ text }</p>
        <div className="flex justify-start mt-5">
          <button 
            className="flex justify-center items-center gap-2 bg-sky-700 text-white text-lg px-4 py-2 rounded-md hover:bg-sky-800"
            onClick={() => navigate(route)}
          >
            <span><FiPlus /></span> {buttonText} 
          </button>
        </div>
    </div>
  )
}
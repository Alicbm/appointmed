import { FiPlus } from "react-icons/fi";

type Props = {
  title: string;
  text: string;
  button?: boolean;
}

export function TemplatePage ({ title, text, button }: Props) {
  return (
    <div className="bg-slate-100 py-8 px-4 rounded-lg">
      <h1 className="text-blue-700 text-3xl font-bold tracking-wider mb-2">{ title }</h1>
      <p className="text-gray-500 text-lg">{ text }</p>
      {
        button &&
        <div className="flex justify-start mt-5">
          <button className="flex justify-center items-center gap-4 bg-blue-700 text-white text-lg px-4 py-2 rounded-md hover:bg-blue-800">
            <span><FiPlus /></span> Nueva solicitud
          </button>
        </div>
      }
    </div>
  )
}
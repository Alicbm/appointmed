import { FiPlus } from "react-icons/fi";
import { MdFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { downloadExcelFile } from "../../utils/downloadExcelFile";
import { BaseIT } from "../../types";

type Props = {
  title: string;
  text: string;
  route?: string;
  buttonText?: string;
  data?: BaseIT[];
};

export function TemplatePage({ title, text, buttonText, route, data }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 py-8 px-4 rounded-lg">
      <h1 className="text-sky-800 text-3xl font-bold tracking-wider mb-2">
        {title}
      </h1>
      <p className="text-gray-500 text-lg">{text}</p>
      {buttonText && (
        <div className="flex gap-4">
          <div className="flex justify-start mt-5">
            <button
              className="flex justify-center items-center gap-2 bg-sky-800 text-white text-lg px-4 py-2 rounded-md hover:bg-sky-900"
              onClick={() => {
                route && navigate(route);
              }}
            >
              <span>
                <FiPlus />
              </span>{" "}
              {buttonText}
            </button>
          </div>
          <div className="flex justify-start mt-5">
            <button
              className="flex justify-center items-center gap-2 bg-green-700 text-white text-lg px-4 py-2 rounded-md hover:bg-green-800"
              onClick={() => {
                data && downloadExcelFile(data, title)
              }}
            >
              <span>
                <MdFileDownload />
              </span>{" "}
              Descargar Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

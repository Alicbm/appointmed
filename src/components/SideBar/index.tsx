import { AiFillHome, AiFillMedicineBox } from "react-icons/ai";
import { FaTeeth, FaBaby, FaEye } from "react-icons/fa6";
import { TbGenderAndrogyne } from "react-icons/tb";
import { MdPsychology } from "react-icons/md";

export function SideBar() {
  return (
    <div className="w-[250px] text-gray-800 bg-slate-100 py-4 px-2 rounded-md overflow-hidden">
      <div className="bg-slate-2000 px-4 py-3 bg-slate-200 rounded-md mb-4">
        <p className="text-2xl text-blue-700 font-bold tracking-wider">
          Username
        </p>
      </div>

      <ul className="grid gap-4 text-lg">
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <AiFillHome />
          </span>{" "}
          Inicio
        </li>
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <AiFillMedicineBox />
          </span>{" "}
          Medicina General
        </li>
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <FaTeeth />
          </span>{" "}
          Odontología
        </li>
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <TbGenderAndrogyne />
          </span>{" "}
          Ginecología
        </li>
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <MdPsychology />
          </span>{" "}
          Psiquiatría
        </li>
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <FaBaby />
          </span>{" "}
          Pediatría
        </li>
        <li className="flex items-center cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200">
          <span className="text-blue-700 mr-2">
            <FaEye />
          </span>{" "}
          Optometría
        </li>
      </ul>
    </div>
  );
}

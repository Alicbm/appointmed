import { AiFillHome, AiFillMedicineBox } from "react-icons/ai";
import { FaTeeth, FaBaby, FaEye } from "react-icons/fa6";
import { TbGenderAndrogyne } from "react-icons/tb";
import { MdPsychology } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type RoutesType = {
  label: string;
  route: string;
  icon: JSX.Element;
  selected: boolean;
};

const routes: RoutesType[] = [];

routes.push({
  label: "Inicio",
  route: "/dashboard",
  icon: <AiFillHome />,
  selected: true
});

routes.push({
  label: "Medicina General",
  route: "/dashboard/medicina-general",
  icon: <AiFillMedicineBox />,
  selected: false
});

routes.push({
  label: "Odontología",
  route: "/dashboard/odontologia",
  icon: <FaTeeth />,
  selected: false
});

routes.push({
  label: "Ginecología",
  route: "/dashboard/ginecologia",
  icon: <TbGenderAndrogyne />,
  selected: false
});

routes.push({
  label: "Psiquiatría",
  route: "/dashboard/psiquiatria",
  icon: <MdPsychology />,
  selected: false
});

routes.push({
  label: "Pediatría",
  route: "/dashboard/pediatria",
  icon: <FaBaby />,
  selected: false
});

routes.push({
  label: "Optometría",
  route: "/dashboard/optometria",
  icon: <FaEye />,
  selected: false
});

export function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="w-[250px] text-gray-800 bg-slate-100 py-4 px-2 rounded-md overflow-hidden">
      <div className="bg-slate-2000 px-4 py-3 bg-slate-200 rounded-md mb-4">
        <p className="flex items-center text-2xl text-blue-700 font-bold tracking-wider">
          <span className="mr-2">
            <FaUserCircle />
          </span>
          <span>Username</span>
        </p>
      </div>

      <ul className="grid gap-4 text-lg">
        {routes.map(({ label, route, icon, selected }) => (
          <li
            className={`${selected ? 'bg-slate-200': ''} flex items-center text-slate-500 cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200`}
            onClick={() => navigate(route)}
          >
            <span className="text-lg mr-3">{icon}</span> {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

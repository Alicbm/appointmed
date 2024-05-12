import { AiFillHome, AiFillMedicineBox } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaUserCircle } from "react-icons/fa";
import { FaTeeth, FaBaby, FaEye } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { TbGenderAndrogyne } from "react-icons/tb";
import { MdPsychology } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  sideBar: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSideBar: Function;
}

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
  selected: false,
});

routes.push({
  label: "Medicina General",
  route: "/dashboard/medicina-general",
  icon: <AiFillMedicineBox />,
  selected: false,
});

routes.push({
  label: "Odontología",
  route: "/dashboard/odontologia",
  icon: <FaTeeth />,
  selected: false,
});

routes.push({
  label: "Ginecología",
  route: "/dashboard/ginecologia",
  icon: <TbGenderAndrogyne />,
  selected: false,
});

routes.push({
  label: "Psiquiatría",
  route: "/dashboard/psiquiatria",
  icon: <MdPsychology />,
  selected: false,
});

routes.push({
  label: "Pediatría",
  route: "/dashboard/pediatria",
  icon: <FaBaby />,
  selected: false,
});

routes.push({
  label: "Optometría",
  route: "/dashboard/optometria",
  icon: <FaEye />,
  selected: false,
});

export function MobileSideBar({ sideBar, setSideBar }: Props) {
  const navigate = useNavigate();

  return (
    <div className={`${!sideBar ? 'hidden' : 'fixed top-0 left-0 right-0 bottom-0'} grid place-content-center w-full bg-black bg-opacity-[.8] z-50 lg:hidden`}>
      <div className="w-full min-w-[320px] max-w-[320px] text-gray-800 bg-slate-100 py-4 px-2 rounded-md overflow-hidden mb-2 mx-auto">
        <div className="flex justify-between items-center bg-slate-2000 px-4 py-3 bg-slate-200 rounded-md mb-4">
          <p className="flex items-center text-2xl text-sky-700 font-bold tracking-wider">
            <span className="mr-2">
              <FaUserCircle />
            </span>
            <span>Username</span>
          </p>
          <span 
            className="text-sky-800 text-3xl"
            onClick={() => setSideBar(!sideBar)}
          ><IoClose /></span>
        </div>

        <ul className="grid gap-4 text-lg">
          {routes.map(({ label, route, icon }) => (
            <li
              key={label}
              className='flex items-center text-slate-500 cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200'
              onClick={() => {
                navigate(route)
                setSideBar(!sideBar)
              }}
            >
              <span
                className="text-lg mr-3"
              >
                {icon}
              </span>{" "}
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-evenly items-center w-[95%] min-w-[320px] max-w-[320px] gap-2 text-sky-800 text-4xl bg-slate-200 py-3 px-6 mx-auto rounded-md">
        <span className="cursor-pointer hover:text-sky-900">
          <FaGithub />
        </span>
        <span className="cursor-pointer hover:text-sky-900">
          <FaLinkedin />
        </span>
        <span className="cursor-pointer hover:text-sky-900">
          <FaUserCircle />
        </span>
      </div>
    </div>
  );
}

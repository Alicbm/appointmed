import { useContext } from "react";
import { FaGithub, FaLinkedin, FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { userName } from "../../utils/userName";
import { serviceSelected } from "../../utils/serviceSelected";
import { verfyServiceSelected } from "../../utils/verifyServiceSelected";
import { routesServices } from "../../utils/routesServices";

export function SideBar() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()

  verfyServiceSelected(routesServices, location);

  return (
    <div className="hidden lg:block">
      <div className="w-[250px] text-gray-800 bg-slate-100 py-4 px-2 rounded-md overflow-hidden mb-2">
        <div className="bg-slate-2000 px-4 py-3 bg-slate-200 rounded-md mb-4">
          <p className="flex items-center text-2xl text-sky-700 font-bold tracking-wider">
            <span className="mr-2">
              <FaUserCircle />
            </span>
            <span>{userName(context?.user?.user?.firstName || "")}</span>
          </p>
        </div>

        <ul className="grid gap-4 text-lg">
          {routesServices?.map(({ label, route, icon, selected }) => (
            <li
              key={label}
              className={`${
                selected ? "bg-slate-200" : ""
              } flex items-center text-slate-500 cursor-pointer px-4 py-2 rounded-md hover:bg-slate-200`}
              onClick={() => {
                navigate(route);
                serviceSelected(routesServices, label);
              }}
            >
              <span className={`${selected ? "text-sky-800" : ""} text-lg mr-3`}>
                {icon}
              </span>{" "}
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-around items-center gap-8 w-[250px] text-sky-800 text-4xl bg-slate-100 py-4 px-6 rounded-md">
        <span className="cursor-pointer hover:text-sky-900">
          <Link to="https://github.com/Alicbm/" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </Link>
        </span>
        <span className="cursor-pointer hover:text-sky-900">
          <Link to="https://www.linkedin.com/in/alic-barandica/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </Link>
        </span>
        <span className="cursor-pointer hover:text-sky-900">
          <Link to="https://portfolio-alicbm.vercel.app/" target="_blank" rel="noopener noreferrer">
            <FaUserCircle />
          </Link>
        </span>
      </div>
    </div>
  );
}

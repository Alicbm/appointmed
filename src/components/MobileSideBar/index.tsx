/* eslint-disable @typescript-eslint/ban-types */
import { FaGithub, FaLinkedin, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { userName } from "../../utils/userName";
import { routesServices } from "../../utils/routesServices";
import { serviceSelected } from "../../utils/serviceSelected";
import { verfyServiceSelected } from "../../utils/verifyServiceSelected";

type Props = {
  sideBar: boolean;
  setSideBar: Function;
};

export function MobileSideBar({ sideBar, setSideBar }: Props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  verfyServiceSelected(routesServices, location);

  return (
    <div
      className={`${
        !sideBar ? "hidden" : "fixed top-0 left-0 right-0 bottom-0"
      } grid place-content-center w-full bg-black bg-opacity-[.8] z-50 lg:hidden`}
    >
      <div className="w-full min-w-[320px] max-w-[320px] text-gray-800 bg-slate-100 py-4 px-2 rounded-md overflow-hidden mb-2 mx-auto">
        <div className="flex justify-between items-center bg-slate-2000 px-4 py-3 bg-slate-200 rounded-md mb-4">
          <p className="flex items-center text-2xl text-sky-700 font-bold tracking-wider">
            <span className="mr-2">
              <FaUserCircle />
            </span>
            <span>{userName(context?.user?.user?.firstName || "")}</span>
          </p>
          <span
            className="text-sky-800 text-3xl cursor-pointer"
            onClick={() => setSideBar(!sideBar)}
          >
            <IoClose />
          </span>
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
                setSideBar(!sideBar);
                serviceSelected(routesServices, label);
              }}
            >
              <span
                className={`${selected ? "text-sky-800" : ""} text-lg mr-3`}
              >
                {icon}
              </span>{" "}
              {label}{" "}
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

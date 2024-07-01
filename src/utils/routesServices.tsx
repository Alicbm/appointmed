import { AiFillHome, AiFillMedicineBox } from "react-icons/ai";
import { FaTeeth, FaBaby, FaEye } from "react-icons/fa6";
import { TbGenderAndrogyne } from "react-icons/tb";
import { MdPsychology } from "react-icons/md";
import { RoutesType } from "../types";

export const routesServices: RoutesType[] = [];

routesServices.push({
  label: "Inicio",
  route: "/dashboard",
  icon: <AiFillHome />,
  selected: false,
});

routesServices.push({
  label: "Medicina General",
  route: "/dashboard/medicina-general",
  icon: <AiFillMedicineBox />,
  selected: false,
});

routesServices.push({
  label: "Odontología",
  route: "/dashboard/odontologia",
  icon: <FaTeeth />,
  selected: false,
});

routesServices.push({
  label: "Ginecología",
  route: "/dashboard/ginecologia",
  icon: <TbGenderAndrogyne />,
  selected: false,
});

routesServices.push({
  label: "Psiquiatría",
  route: "/dashboard/psiquiatria",
  icon: <MdPsychology />,
  selected: false,
});

routesServices.push({
  label: "Pediatría",
  route: "/dashboard/pediatria",
  icon: <FaBaby />,
  selected: false,
});

routesServices.push({
  label: "Optometría",
  route: "/dashboard/optometria",
  icon: <FaEye />,
  selected: false,
});

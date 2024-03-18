import { useNavigate } from "react-router-dom";
import { MainButton } from "../../components/MainButton";
import initialImg from "./images/initialImg.jpg";
import generalMedicine from "../../images/medicina-alternativa.png";
import odontology from "../../images/seguro-dental.png";
import gynecology from "../../images/examen-pelvico.png";
import psychiatry from "../../images/psiquiatria.png";
import pediatrics from "../../images/pediatria.png";
import optometry from "../../images/oftalmologia.png";

type ServicesType = {
  image: string;
  text: string;
  listRoute: string;
  createRoute: string;
};

const services: ServicesType[] = [];

services.push({
  image: generalMedicine,
  text: "Medicina General",
  listRoute: "/dashboard/medicina-general",
  createRoute: "/dashboard/medicina-general/create",
});

services.push({
  image: odontology,
  text: "Odontología",
  listRoute: "/dashboard/odontologia",
  createRoute: "/dashboard/odontologia/create",
});

services.push({
  image: gynecology,
  text: "Ginecología",
  listRoute: "/dashboard/ginecologia/create",
  createRoute: "/dashboard/ginecologia/create",
});

services.push({
  image: psychiatry,
  text: "Psiquiatría",
  listRoute: "/dashboard/psiquiatria",
  createRoute: "/dashboard/psiquiatria/create",
});

services.push({
  image: pediatrics,
  text: "Pediatría",
  listRoute: "/dashboard/pediatria",
  createRoute: "/dashboard/pediatria/create",
});

services.push({
  image: optometry,
  text: "Optometría",
  listRoute: "/dashboard/optometria",
  createRoute: "/dashboard/optometria/create",
});

export function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-6">
      <div className="flex justify-between gap-2 bg-slate-100 rounded-lg overflow-hidden">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-sky-800 text-4xl font-bold">Alic, Bienvenido</h1>
          <h2 className="text-gray-600 text-xl">
            En Appointmed estamos encantados de recibirte
          </h2>
          <p className="text-gray-500 leading-8 mb-2">
            !Bienvenido a nuestra plataforma virtual! Desde aquí podrás reservar
            tus citas medicas en las clinicas y hospitales de tu preferencia.
          </p>
          <MainButton
            text="Explorar plataforma"
            className="w-[250px] bg-sky-700 hover:bg-sky-800"
          />
        </div>
        <div>
          <img
            src={initialImg}
            alt="Appointmed"
            className="w-auto h-full object-cover opacity-[.7]"
          />
        </div>
      </div>

      <div>
        <h2 className="text-sky-800 text-2xl font-bold pl-4 mb-6">
          Servicios Destacados
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {services.map((item) => (
            <div className="rounded-lg overflow-hidden">
              <div className="flex justify-center items-center w-full h-[80px] bg-slate-200 overflow-hidden">
                <div className="flex justify-center items-center w-[210px] h-[210px] border-2 border-slate-300 rounded-[50%]">
                  <div className="flex justify-center items-center w-[160px] h-[160px] border-2 border-slate-100 rounded-[50%]">
                    <div className="flex justify-center items-center w-[110px] h-[110px] border-2 border-slate-300 rounded-[50%]">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[70px] h-[70px] opacity-[.4]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-100 p-4">
                <h4 className="text-xl text-sky-800 mb-2">{item.text}</h4>
                <p className="text-gray-600 mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  unde est reiciendis dolor
                </p>
                <div className="flex gap-2">
                  <MainButton
                    text="Ver"
                    className="w-full h-[30px] bg-sky-700 hover:bg-sky-800 text-sm px-5"
                    onClick={() => navigate(item.listRoute)}
                  />
                  <MainButton
                    text="Crear"
                    className="w-full h-[30px] text-sm px-5 bg-black hover:bg-gray-900"
                    onClick={() => navigate(item.createRoute)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

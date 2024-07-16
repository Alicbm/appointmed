import { HashRouter, Route, Routes } from "react-router-dom";
import { MainStructure } from "../pages";
import { GeneralMedicineList } from "../pages/MedicinaGeneral/components/GeneralMedicineList";
import { GeneralMedicineCreate } from "../pages/MedicinaGeneral/components/GeneralMedicineCreate";
import { Inicio } from "../pages/Inicio";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { OdontologyList } from "../pages/Odontology/components/OdontologyList";
import { OdontologyCreate } from "../pages/Odontology/components/OdontologyCreate";
import { GynecologyList } from "../pages/Gynecology/components/GynecologyList";
import { GynecologyCreate } from "../pages/Gynecology/components/GynecologyCreate";
import { PsychiatryList } from "../pages/Psychiatry/components/PsychiatryList";
import { PsychiatryCreate } from "../pages/Psychiatry/components/PsychiatryCreate";
import { PediatricsList } from "../pages/Pediatrics/components/PediatricsList";
import { PediatricsCreate } from "../pages/Pediatrics/components/PediatricsCreate";
import { OptometryCreate } from "../pages/Optometry/components/OptometryCreate";
import { OptometryList } from "../pages/Optometry/components/OptometryList";
import { Login } from "../pages/Login";
import { ProtectedRoutes } from "./protected.router";
import { RedirectUser } from "./redirectUser.router";
import { NotFound } from "../pages/NotFound";

export function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route element={<RedirectUser />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<MainStructure />}>
            <Route index path="" element={<Inicio />} />
            <Route path="medicina-general" element={<GeneralMedicineList />} />
            <Route
              path="medicina-general/create"
              element={<GeneralMedicineCreate />}
            />
            <Route path="odontologia" element={<OdontologyList />} />
            <Route path="odontologia/create" element={<OdontologyCreate />} />
            <Route path="ginecologia" element={<GynecologyList />} />
            <Route path="ginecologia/create" element={<GynecologyCreate />} />
            <Route path="psiquiatria" element={<PsychiatryList />} />
            <Route path="psiquiatria/create" element={<PsychiatryCreate />} />
            <Route path="pediatria" element={<PediatricsList />} />
            <Route path="pediatria/create" element={<PediatricsCreate />} />
            <Route path="optometria" element={<OptometryList />} />
            <Route path="optometria/create" element={<OptometryCreate />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export function Router() {
  const context = useContext(AuthContext);

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={context?.user ? <MainStructure /> : <Navigate to="/" />}
        >
          <Route
            index
            path=""
            element={context?.user ? <Inicio /> : <Navigate to="/" />}
          />
          <Route
            path="medicina-general"
            element={
              context?.user ? <GeneralMedicineList /> : <Navigate to="/" />
            }
          />
          <Route
            path="medicina-general/create"
            element={
              context?.user ? <GeneralMedicineCreate /> : <Navigate to="/" />
            }
          />
          <Route
            path="odontologia"
            element={context?.user ? <OdontologyList /> : <Navigate to="/" />}
          />
          <Route
            path="odontologia/create"
            element={context?.user ? <OdontologyCreate /> : <Navigate to="/" />}
          />
          <Route
            path="ginecologia"
            element={context?.user ? <GynecologyList /> : <Navigate to="/" />}
          />
          <Route
            path="ginecologia/create"
            element={context?.user ? <GynecologyCreate /> : <Navigate to="/" />}
          />
          <Route
            path="psiquiatria"
            element={context?.user ? <PsychiatryList /> : <Navigate to="/" />}
          />
          <Route
            path="psiquiatria/create"
            element={context?.user ? <PsychiatryCreate /> : <Navigate to="/" />}
          />
          <Route
            path="pediatria"
            element={context?.user ? <PediatricsList /> : <Navigate to="/" />}
          />
          <Route
            path="pediatria/create"
            element={context?.user ? <PediatricsCreate /> : <Navigate to="/" />}
          />
          <Route
            path="optometria"
            element={context?.user ? <OptometryList /> : <Navigate to="/" />}
          />
          <Route
            path="optometria/create"
            element={context?.user ? <OptometryCreate /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

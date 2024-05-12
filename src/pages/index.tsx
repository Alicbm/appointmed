import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";

// flex items-start max-w-[1200px] w-full gap-6 py-10 mx-auto

export function MainStructure(){
  return (
    <div className="max-w-[1200px] w-[95%] gap-6 py-10 mx-auto md:w-full lg:flex lg:items-start">
      <div className="sticky top-10">
        <SideBar />
      </div>
      <div className="w-full px-2">
        <Outlet />
      </div>
    </div>
  )
}
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";

export function MainStructure(){
  return (
    <div className="flex items-start max-w-[1200px] w-full gap-6 py-10 mx-auto">
      <div className="sticky top-10">
        <SideBar />
      </div>
      <div className="w-full px-2">
        <Outlet />
      </div>
    </div>
  )
}
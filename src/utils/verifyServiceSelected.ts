import { Location } from "react-router-dom";
import { RoutesType } from "../types";

export const verfyServiceSelected = (routes: RoutesType[], location: Location) => {
  const url = location?.pathname?.split("/").slice(1, 3);

  routes?.map((item) => {
    const nameRoute = item.route.includes("dashboard")
      ? item.route.split("dashboard")[1].split("/")
      : [""];

    if (url[1] === "") {
      item.selected = item.label === "Inicio";
    } else {
      item.selected = url[1] === nameRoute[1];
    }

    return item;
  });
};
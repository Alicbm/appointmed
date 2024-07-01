import { RoutesType } from "../types";

export const serviceSelected = (routes: RoutesType[], label: string) => {
  routes?.map((item) =>
    item.label != label ? (item.selected = false) : (item.selected = true)
  );
};
import { create } from "zustand";
import { produce } from "immer";

export const useNavbar = create<iNavbarStore>()((set, get) => ({
  navbarProperties: {
    currentPage: "/",
  },
  //Actions
  setCurrentPage: (currentPageValue: string) => {
    set(
      produce<iNavbarStore>((state) => {
        state.navbarProperties.currentPage = currentPageValue;
      })
    );
  },
}));
interface iNavbarStore {
  navbarProperties: NavbarProperties;
  setCurrentPage: (n: string) => void;
}

export enum ImageResizeMinMax {}

type NavbarProperties = {
  currentPage: string;
};

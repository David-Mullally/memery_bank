import { create } from "zustand";
import { produce } from "immer";

export const useMemeLayout = create<iMemeLayoutStore>()((set, get) => ({
  memeLayoutProperties: {
    memePanelNum: 3,
    memeOrientation: "portrait",
    firstPanelResize: 100,
    secondPanelResize: 100,
    thirdPanelResize: 100,
    imageURL: null,
    image2URL: null,
    image3URL: null,
  },
  //Actions
  setMemePanelNum: (memePanelNumValue: number) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.memePanelNum = memePanelNumValue;
      })
    );
  },
  setFirstPanelResize: (firstPanelResizeValue: number) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.firstPanelResize = firstPanelResizeValue;
      })
    );
  },
  setSecondPanelResize: (secondPanelResizeValue: number) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.secondPanelResize = secondPanelResizeValue;
      })
    );
  },
  setThirdPanelResize: (thirdPanelResizeValue: number) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.thirdPanelResize = thirdPanelResizeValue;
      })
    );
  },
  setImageURL: (imageURLValue: string) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.imageURL = imageURLValue;
      })
    );
  },
  setImage2URL: (image2URLValue: string) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.image2URL = image2URLValue;
      })
    );
  },
  setImage3URL: (image3URLValue: string) => {
    set(
      produce<iMemeLayoutStore>((state) => {
        state.memeLayoutProperties.image3URL = image3URLValue;
      })
    );
  },
}));
interface iMemeLayoutStore {
  memeLayoutProperties: MemeLayoutProperties;
  setFirstPanelResize: (n: number) => void;
  setSecondPanelResize: (n: number) => void;
  setThirdPanelResize: (n: number) => void;
  setImageURL: (n: string) => void;
  setImage2URL: (n: string) => void;
  setImage3URL: (n: string) => void;
  setMemePanelNum: (n: number) => void;
}

export enum ImageResizeMinMax {}

type MemeLayoutProperties = {
  memePanelNum: number;
  memeOrientation: string;
  firstPanelResize: number;
  secondPanelResize: number;
  thirdPanelResize: number;
  imageURL: string | null;
  image2URL: string | null;
  image3URL: string | null;
};

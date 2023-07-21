import { create } from "zustand";
import { produce } from "immer";

export const useEditImageProperties = create<iEditImagePropertiesStore>()(
  (set, get) => ({
    editImageProperties: {
      fontFamily : "Arial",
      isDisabled: true,
      imageResize: 100,
      imageTopText: "",
      imageTopTextColor: "#000",
      imageBottomText: "",
      imageBottomTextColor: "#000",
      isPortrait: "portrait",
      imageTopTextOutlineColor: "#000",
      imageBottomTextOutlineColor: "#000",
    },
    //Actions
    setFontFamily: (fontFamilyValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.fontFamily = fontFamilyValue;
        })
      );
    },
    setImageTopTextOutlineColor: (topTextOutlineColorValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.imageTopTextOutlineColor = topTextOutlineColorValue;
        })
      );
    },
    setImageBottomTextOutlineColor: (bottomTextOutlineColorValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.imageBottomTextOutlineColor = bottomTextOutlineColorValue;
        })
      );
    },
    setIsDisabled: (isDisabledValue: boolean) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.isDisabled = isDisabledValue;
        })
      );
    },
    setIsPortrait: (isPortraitValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.isPortrait = isPortraitValue;
        })
      );
    },
    setImageResize: (imageResizeValue: number) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.imageResize = imageResizeValue;
        })
      );
    },
    setImageTopText: (imageTopTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const imageTopText = imageTopTextValue;
          state.editImageProperties.imageTopText = imageTopText;
        })
      );
    },
    setImageTopTextColor: (imageTopTextColorValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const imageTopTextColour = imageTopTextColorValue;
          state.editImageProperties.imageTopTextColor = imageTopTextColour;
        })
      );
    },
    setImageBottomText: (imageBottomTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const imageBottomText = imageBottomTextValue;
          state.editImageProperties.imageBottomText = imageBottomText;
        })
      );
    },
    setImageBottomTextColor: (imageBottomTextColorValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const imageBottomTextColour = imageBottomTextColorValue;
          state.editImageProperties.imageBottomTextColor =
            imageBottomTextColour;
        })
      );
    },
  })
);

interface iEditImagePropertiesStore {
  editImageProperties: EditImageProperties;
  setFontFamily: (n: string) => void;
  setImageResize: (n: number) => void;
  setImageTopText: (n: string) => void;
  setImageTopTextColor: (n: string) => void;
  setImageBottomText: (n: string) => void;
  setImageBottomTextColor: (n: string) => void;
  setIsDisabled: (n: boolean) => void;
  setIsPortrait: (n: string) => void;
  setImageTopTextOutlineColor: (n: string) => void;
  setImageBottomTextOutlineColor: (n: string) => void;
}

export enum ImageResizeMinMax {}

type EditImageProperties = {
  fontFamily: string;
  imageResize: number;
  imageTopText: string;
  imageTopTextColor: string;
  imageBottomText: string;
  imageBottomTextColor: string;
  isDisabled: boolean;
  isPortrait: string;
  imageTopTextOutlineColor: string;
  imageBottomTextOutlineColor: string;
};

import { create } from "zustand";
import { produce } from "immer";

export const useEditImageProperties = create<iEditImagePropertiesStore>()(
  (set, get) => ({
    editImageProperties: {
      fontFamily: "Arial",
      isDisabled: false,
      uploadHidden: true,
      imageTopText: "",
      image2TopText: "",
      image3TopText: "",
      textColor: "#000",
      imageBottomText: "",
      image2BottomText: "",
      image3BottomText: "",
      textOutlineColor: "#000",
      resizableDivVisible: true,
    },
    //Actions
    setUploadHidden: (uploadHiddenValue: boolean) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.uploadHidden =
            uploadHiddenValue;
        })
      );
    },
    setResizableDivVisible: (resizableDivVisibleValue: boolean) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.resizableDivVisible =
            resizableDivVisibleValue;
        })
      );
    },
    setFontFamily: (fontFamilyValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.fontFamily = fontFamilyValue;
        })
      );
    },
    setTextOutlineColor: (textOutlineColorValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          state.editImageProperties.textOutlineColor =
            textOutlineColorValue;
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
    setImageTopText: (imageTopTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const imageTopText = imageTopTextValue;
          state.editImageProperties.imageTopText = imageTopText;
        })
      );
    },
    setImage2TopText: (image2TopTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const image2TopText = image2TopTextValue;
          state.editImageProperties.image2TopText = image2TopText;
        })
      );
    },
    setImage3TopText: (image3TopTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const image3TopText = image3TopTextValue;
          state.editImageProperties.image3TopText = image3TopText;
        })
      );
    },

    setTextColor: (textColorValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const textColour = textColorValue;
          state.editImageProperties.textColor = textColour;
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
    setImage2BottomText: (image2BottomTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const image2BottomText = image2BottomTextValue;
          state.editImageProperties.image2BottomText = image2BottomText;
        })
      );
    },
    setImage3BottomText: (image3BottomTextValue: string) => {
      set(
        produce<iEditImagePropertiesStore>((state) => {
          const image3BottomText = image3BottomTextValue;
          state.editImageProperties.image3BottomText = image3BottomText;
        })
      );
    },
  })
);

interface iEditImagePropertiesStore {
  editImageProperties: EditImageProperties;
  setFontFamily: (n: string) => void;
  setImageTopText: (n: string) => void;
  setImage2TopText: (n: string) => void;
  setImage3TopText: (n: string) => void;
  setTextColor: (n: string) => void;
  setImageBottomText: (n: string) => void;
  setImage2BottomText: (n: string) => void;
  setImage3BottomText: (n: string) => void;
  setIsDisabled: (n: boolean) => void;
  setTextOutlineColor: (n: string) => void;
  setResizableDivVisible: (n: boolean) => void;
  setUploadHidden: (n: boolean) => void;
}

export enum ImageResizeMinMax {}

type EditImageProperties = {
  fontFamily: string;
  imageTopText: string;
  image2TopText: string;
  image3TopText: string;
  imageBottomText: string;
  image2BottomText: string;
  image3BottomText: string;
  textColor: string;
  isDisabled: boolean;
  textOutlineColor: string;
  resizableDivVisible: boolean;
  uploadHidden: boolean;
};

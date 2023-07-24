import React, { FC, useState, useRef } from "react";
import ButtonComponent from "./button";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import { useMemeLayout } from "@/app/stores/memeLayout";

interface MemeButtonsComponentProps {
  downloadDisabled: boolean;
  memePanelNum: number;
}

const MemeButtonsComponent: FC<MemeButtonsComponentProps> = ({
  downloadDisabled,
  memePanelNum,
}) => {
  const setImageURL = useMemeLayout().setImageURL;
  const setImage2URL = useMemeLayout().setImage2URL;
  const setImage3URL = useMemeLayout().setImage3URL;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (memePanelNum === 1) {
        const imageURL = URL.createObjectURL(file);
        setImageURL(imageURL);
      } else if (memePanelNum === 2) {
        const image2URL = URL.createObjectURL(file);
        setImage2URL(image2URL);
      } else if(memePanelNum === 3){
        const image3URL = URL.createObjectURL(file);
        setImage3URL(image3URL);
      }
     {/* setImageURL(imageURL);
      setDownloadDisabled(false);
      setUploadHidden(true);
    setIsEditImagePropertiesDisabled(false);*/}
    }
  };

  const handleImageClear = () => {
    if (memePanelNum === 1) {
      setImageURL("");
    } else if (memePanelNum === 2) {
      setImage2URL("");
    } else if(memePanelNum === 3){
      setImage3URL("");
    }
    setUploadHidden(true); 
    {
      /*if (!downloadDisabled) {
     setImageURL(null);
      setDownloadDisabled(true);
      setImageToptext("");
      setImageBottomText("");
      setIsEditImagePropertiesDisabled(true);
      setFontFamily("Arial");
   
    }*/
    }
  };
  //Other variables
  const uploadHidden =
    useEditImageProperties().editImageProperties.uploadHidden;
  // Functions
  const setUploadHidden = useEditImageProperties().setUploadHidden;

  const handleUpload = () => {
    setUploadHidden(false);
  };
  return (
    <div className="bg-teal-500 h-[30%]">
      {uploadHidden ? (
        <ButtonComponent
          buttonType="UPLOAD"
          onClick={handleUpload}
          disabled={uploadHidden}
        />
      ) : (
          <input className="h-[50px]" type="file" accept="image/*" onChange={handleImageChange} />
      )}
      <ButtonComponent
        buttonType="CLEAR"
        disabled={downloadDisabled}
        onClick={handleImageClear}
      />
    </div>
  );
};

export default MemeButtonsComponent;

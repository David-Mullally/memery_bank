import React, { FC, useState, useRef } from "react";
import ButtonComponent from "../input/button";
import html2canvas from "html2canvas";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import cn from "classnames";

interface UploadDownloadImageComponentProps {}

const UploadDownloadImageComponent: FC<
  UploadDownloadImageComponentProps
> = () => {
  //Taken from store
  const editImageProperties = useEditImageProperties();
  // Read values
  const fontFamily = editImageProperties.editImageProperties.fontFamily;
  const isPortrait = editImageProperties.editImageProperties.isPortrait;
  const imageResize = editImageProperties.editImageProperties.imageResize;
  const imageTopText = editImageProperties.editImageProperties.imageTopText;
  const imageTopTextColor =
    editImageProperties.editImageProperties.imageTopTextColor;
  const imageTopTextOutlineColor = editImageProperties.editImageProperties.imageTopTextOutlineColor
  const imageBottomText =
    editImageProperties.editImageProperties.imageBottomText;
  const imageBottomTextColor =
    editImageProperties.editImageProperties.imageBottomTextColor;
  const imageBottomTextOutlineColor = editImageProperties.editImageProperties.imageBottomTextOutlineColor;
  //Set values
  const setIsEditImagePropertiesDisabled = editImageProperties.setIsDisabled;
  const setFontFamily = editImageProperties.setFontFamily;
  const setImageToptext = editImageProperties.setImageTopText;
  const setImageBottomText = editImageProperties.setImageBottomText;
  // React Hooks
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true);
  const [uploadHidden, setUploadHidden] = useState<boolean>(true);
  //Other variables
  const imageText = ["imageTopText", "imageBottomText"];
 // Functions
  const handleUpload = () => {
    setUploadHidden(false);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
      setDownloadDisabled(false);
      setUploadHidden(true);
      setIsEditImagePropertiesDisabled(false);
    }
  };
  const divRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    if (divRef.current && !downloadDisabled) {
      html2canvas(divRef.current).then((canvas) => {
        const imageURL = canvas.toDataURL("image/png");

        // Create a temporary anchor element to trigger the download
        const downloadLink = document.createElement("a");
        downloadLink.href = imageURL;
        downloadLink.download = "downloaded_image.png";
        downloadLink.click();
      });
    }
  };
  const handleClearImage = () => {
    if (!downloadDisabled) {
      setImageURL(null);
      setDownloadDisabled(true);
      setImageToptext("");
      setImageBottomText("");
      setIsEditImagePropertiesDisabled(true);
      setFontFamily("Arial");
    }
  };

  const imageLayout = () => {
    switch (isPortrait) {
      case "portrait":
        return "w-[35vw] h-[70vh] text-center"
      case "landscape":
        return "w-[70vw] h-[75vh] text-center";
    }
  };

  return (
    <div className={cn(imageLayout(), "bg-white")}>
      <div
        ref={divRef}
        className={cn(
          imageLayout(),
          "text-8xl flex flex-col justify-between text-center border-black border-solid border-2"
        )}
        style={{
          backgroundImage: `url(${imageURL})`,
          backgroundSize: `${imageResize}%`,
          backgroundRepeat: "no-repeat",
          minHeight: "105px",
          maxWidth: "70vw",
          maxHeight: "84.4vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            whiteSpace: "normal",
            maxWidth: "70vw",
            minHeight: "105px",
            maxHeight: "298px",
            wordWrap: "break-word",
            color: `${imageTopTextColor} `,
            paddingTop: "3%",
            textAlign: "center",
            fontFamily: `${fontFamily}`,
            textShadow: `-1px -1px 0 ${imageTopTextOutlineColor}, 1px -1px 0 ${imageTopTextOutlineColor}, -1px 1px 0 ${imageTopTextOutlineColor}, 1px 1px 0 #000`
          }}
        >
          {imageTopText}
        </div>
        <div
          style={{
            whiteSpace: "normal",
            maxWidth: "70vw",
            maxHeight: "297px",
            wordWrap: "break-word",
            color: `${imageBottomTextColor} `,
            paddingBottom: "5%",
            textAlign: "center",
            fontFamily: `${fontFamily}`,
            textShadow: `-1px -1px 0 ${imageBottomTextOutlineColor}, 1px -1px 0 ${imageBottomTextOutlineColor}, -1px 1px 0 ${imageBottomTextOutlineColor}, 1px 1px 0 ${imageBottomTextOutlineColor}`
          }}
        >
          {imageBottomText}
        </div>
      </div>
      <div className="bg-teal-500 h-[10vh]">
        {uploadHidden ? (
          <ButtonComponent
            buttonType="UPLOAD"
            onClick={handleUpload}
            disabled={uploadHidden}
          />
        ) : (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        )}
        <br />
        <ButtonComponent
          buttonType="DOWNLOAD"
          disabled={downloadDisabled}
          onClick={handleDownload}
        />
        <ButtonComponent
          buttonType="CLEAR"
          disabled={downloadDisabled}
          onClick={handleClearImage}
        />
      </div>
    </div>
  );
};

export default UploadDownloadImageComponent;

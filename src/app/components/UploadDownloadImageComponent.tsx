import React, { FC, useState, useRef } from "react";
import ButtonComponent from "./button";
import html2canvas from "html2canvas";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import ResizableDiv from "./resizableDivComponent";
import cn from "classnames";

interface UploadDownloadImageComponentProps {}

const UploadDownloadImageComponent: FC<
  UploadDownloadImageComponentProps
> = () => {
  //Taken from store
  const editImageProperties = useEditImageProperties();
  // Read values
  const isDisabled = editImageProperties.editImageProperties.isDisabled;
  const fontFamily = editImageProperties.editImageProperties.fontFamily;
  const isPortrait = editImageProperties.editImageProperties.isPortrait;
  const imageResize = editImageProperties.editImageProperties.imageResize;
  const imageTopText = editImageProperties.editImageProperties.imageTopText;
  const imageTopTextColor =
    editImageProperties.editImageProperties.imageTopTextColor;
  const imageTopTextOutlineColor =
    editImageProperties.editImageProperties.imageTopTextOutlineColor;
  const imageBottomText =
    editImageProperties.editImageProperties.imageBottomText;
  const imageBottomTextColor =
    editImageProperties.editImageProperties.imageBottomTextColor;
  const imageBottomTextOutlineColor =
    editImageProperties.editImageProperties.imageBottomTextOutlineColor;
  //Set values
  const setIsEditImagePropertiesDisabled = editImageProperties.setIsDisabled;
  const setFontFamily = editImageProperties.setFontFamily;
  const setImageToptext = editImageProperties.setImageTopText;
  const setImageBottomText = editImageProperties.setImageBottomText;
  const setResizableDivVisible = editImageProperties.setResizableDivVisible;
  // React Hooks
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true);
  const [uploadHidden, setUploadHidden] = useState<boolean>(true);
  //Other variables
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
    setResizableDivVisible(false)
    setTimeout(() => {
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
    }, 2000)
    setTimeout(() => {
      setResizableDivVisible(true)
    }, 4000);
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
        return "w-[40vw] h-[70vh]";
      case "landscape":
        return "w-[70vw] h-[75vh]";
    }
  };

  return (
    <div className={cn(imageLayout(), "bg-white")}>
      {isDisabled ? (
        <div className={"w-[100%] h-[100%]"}>
          <div
            className={
              "w-100% h-[100%] flex justify-center items-center text-4xl"
            }
          >
            Upload An Image To Get Started
          </div>
        </div>
      ) : (
        <div
          ref={divRef}
          className={cn(
            imageLayout(),
            "text-8xl flex flex-col items-center justify-between border-black border-solid border-2"
          )}
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundSize: `${imageResize}%`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <ResizableDiv
            height={200}
            width={200}
            content={imageTopText}
            color={imageTopTextColor}
            textShadowColor={imageTopTextOutlineColor}
            fontFamily={fontFamily}
            isPortrait={isPortrait}
          />
          <ResizableDiv
            height={200}
            width={200}
            content={imageBottomText}
            color={imageBottomTextColor}
            textShadowColor={imageBottomTextOutlineColor}
            fontFamily={fontFamily}
            isPortrait={isPortrait}
          />
        </div>
      )}

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

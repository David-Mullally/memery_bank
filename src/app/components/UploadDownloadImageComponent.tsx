{/*
  import React, { FC, useState, useRef } from "react";
  import ButtonComponent from "./inputComponents/button";
  import html2canvas from "html2canvas";
  import { useEditImageProperties } from "@/app/stores/EditImageProperties";
  import cn from "classnames";

  interface UploadDownloadImageComponentProps { }

  const UploadDownloadImageComponent: FC<
    UploadDownloadImageComponentProps
  > = () => {
    //Taken from store
    const editImageProperties = useEditImageProperties();
    // Read values
    const isDisabled = editImageProperties.editImageProperties.isDisabled;
    const isPortrait = editImageProperties.editImageProperties.isPortrait;
    //Set values
    const setIsEditImagePropertiesDisabled = editImageProperties.setIsDisabled;
    const setFontFamily = editImageProperties.setFontFamily;
    const setImageToptext = editImageProperties.setImageTopText;
    const setImageBottomText = editImageProperties.setImageBottomText;
    const setResizableDivVisible = editImageProperties.setResizableDivVisible;
    // React Hooks
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [image2URL, setImage2URL] = useState<string | null>(null);

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
    const handleImage2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const divRef2 = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
      setResizableDivVisible(false);
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
      }, 2000);
      setTimeout(() => {
        setResizableDivVisible(true);
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
          <>
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
                height: "50%",
              }}
            ></div>
            <div
              ref={divRef2}
              className={cn(
                imageLayout(),
                "text-8xl flex flex-col items-center justify-between border-black border-solid border-2"
              )}
              style={{
                backgroundImage: `url(${image2URL})`,
                backgroundSize: `${imageResize}%`,
                backgroundRepeat: "no-repeat",
                height: "50%",
              }}
            ></div>
          </>
        )}
      </div>
    );
  };
  export default UploadDownloadImageComponent;
*/}

import React, { FC, useState, useEffect } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import { useMemeLayout } from "@/app/stores/memeLayout";
import DraggableElement from "./draggableComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import useOrientation from "./utils/hooks/useOrientation";

interface MemePanelComponentProps {
  memePanelNum: number;
}

const MemePanelComponent: FC<MemePanelComponentProps> = ({ memePanelNum }) => {
  //Taken from store
  const editImageProperties = useEditImageProperties();
  const memeLayout = useMemeLayout();
  const memeLayoutProperties = useMemeLayout().memeLayoutProperties;
  // Read values
  const imageResize1 = memeLayoutProperties.firstPanelResize;
  const imageResize2 = memeLayoutProperties.secondPanelResize;
  const imageResize3 = memeLayoutProperties.thirdPanelResize;
  const imageURL = memeLayout.memeLayoutProperties.imageURL;
  const image2URL = memeLayout.memeLayoutProperties.image2URL;
  const image3URL = memeLayout.memeLayoutProperties.image3URL;

  //Set values
  const setIsEditImagePropertiesDisabled = editImageProperties.setIsDisabled;
  const setFontFamily = editImageProperties.setFontFamily;
  const setImageToptext = editImageProperties.setImageTopText;
  const setImageBottomText = editImageProperties.setImageBottomText;
  const setResizableDivVisible = editImageProperties.setResizableDivVisible;
  const setUploadHidden = editImageProperties.setUploadHidden;
  // React Hooks
  const [downloadDisabled, setDownloadDisabled] = useState<boolean>(true);
  //Other variables
  const imageURLs = [imageURL, image2URL, image3URL];
  const imageResizeVals = [imageResize1, imageResize2, imageResize3];
  // Functions
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const orientation = useOrientation();
  let height = "";
  let width = "";
  isLandscape ? height = "100vh" : height = "30vh"
  isLandscape ? width = "75vw" : width = "100vw"
  useEffect(() => {
    setIsLandscape(orientation)
  }, [orientation])

  return (
  <>
      {imageURL ? (
        <div
          style={{
            backgroundImage: `url(${imageURLs[memePanelNum - 1]})`,
            backgroundSize: `${imageResizeVals[memePanelNum - 1]}%`,
            backgroundRepeat: "no-repeat",
            height: height,
            width: width,
            background: "white"
          }}
        >
          <DraggableElement isTopText={true} defaultPosition={{ x: 0, y: 0 }} memePanelNum={memePanelNum} />
          <DraggableElement
            isTopText={false}
            defaultPosition={{ x: 0, y: 0 }}
            memePanelNum={memePanelNum}
          />
        </div>
      ) : (
          <div  style={{
            height: height,
            background: "white",
            width: width
          }}>
            <DraggableElement isTopText={true} defaultPosition={{ x: 0, y: 0 }} memePanelNum={memePanelNum} />
          <DraggableElement
            isTopText={false}
            defaultPosition={{ x: 0, y: 0 }}
            memePanelNum={memePanelNum}
          />
        </div>
      )}
    </>
  );
};

export default MemePanelComponent;

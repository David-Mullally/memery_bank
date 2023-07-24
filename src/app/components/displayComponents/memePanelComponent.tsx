import React, { FC, useState } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import { useMemeLayout } from "@/app/stores/memeLayout";
import DraggableElement from "./draggableComponent";

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

  return (
    <div className="w-[600px] h-[30vh] bg-green-500 border-black border-black border-2 overflow-hidden">
      {imageURL ? (
        <div
          className="w-[600px] h-[30vh]"
          style={{
            backgroundImage: `url(${imageURLs[memePanelNum - 1]})`,
            backgroundSize: `${imageResizeVals[memePanelNum - 1]}%`,
            backgroundRepeat: "no-repeat",
            paddingBottom: "40px"
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
        <div className="w-[600px] h-[30vh] border-black border-black border-2"></div>
      )}
    </div>
  );
};

export default MemePanelComponent;

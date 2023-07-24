import { FC } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import FontFamilyComponent from "./displayComponents/fontFamilyComponent";
import { useMemeLayout } from "../stores/memeLayout";

interface EditImageComponentProps {
  memePanelNum: number;
}

const EditImageComponent: FC<EditImageComponentProps> = ({ memePanelNum }) => {
  console.log("EditImageComponent Rendering");
  // Taken from store
  const editImageProperties = useEditImageProperties();
  const memeLayout = useMemeLayout();
  const memeLayoutProperties = memeLayout.memeLayoutProperties;
  //read values
  const textColor = editImageProperties.editImageProperties.textColor;
  const textOutlineColor =
    editImageProperties.editImageProperties.textOutlineColor;
  const isDisabled = editImageProperties.editImageProperties.isDisabled;
  const imageResize1 = memeLayoutProperties.firstPanelResize;
  const imageResize2 = memeLayoutProperties.secondPanelResize;
  const imageResize3 = memeLayoutProperties.thirdPanelResize;
  const imageTopText = editImageProperties.editImageProperties.imageTopText;
  const image2TopText = editImageProperties.editImageProperties.image2TopText;
  const image3TopText = editImageProperties.editImageProperties.image3TopText;
  const imageBottomText =
    editImageProperties.editImageProperties.imageBottomText;
  const image2BottomText =
    editImageProperties.editImageProperties.image2BottomText;
  const image3BottomText =
    editImageProperties.editImageProperties.image3BottomText;
  //set values
  const setTextColor = editImageProperties.setTextColor;
  const setTextOutlineColor = editImageProperties.setTextOutlineColor;
  const setImageTopText = editImageProperties.setImageTopText;
  const setImage2TopText = editImageProperties.setImage2TopText;
  const setImage3TopText = editImageProperties.setImage3TopText;
  const setImageBottomText = editImageProperties.setImageBottomText;
  const setImage2BottomText = editImageProperties.setImage2BottomText;
  const setImage3BottomText = editImageProperties.setImage3BottomText;
  const setFirstPanelResize = memeLayout.setFirstPanelResize;
  const setSecondPanelResize = memeLayout.setSecondPanelResize;
  const setThirdPanelResize = memeLayout.setThirdPanelResize;
  //React hooks
  //useState
  //other variables
  const topTexts = [imageTopText, image2TopText, image3TopText];
  const bottomTexts = [imageBottomText, image2BottomText, image3BottomText];
  const imageResizeVals = [imageResize1, imageResize2, imageResize3];
  // functions
  const handleImageResizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageResize = Number(event.currentTarget.value);
    if (memePanelNum === 1) {
      setFirstPanelResize(imageResize);
      console.log(event.currentTarget.value);
    } else if (memePanelNum === 2) {
      setSecondPanelResize(imageResize);
      console.log(event.currentTarget.value);
    } else if ((memePanelNum = 3)) {
      setThirdPanelResize(imageResize);
      console.log(event.currentTarget.value);
    }
  };

  const handleImageTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isTopText: boolean
  ) => {
    const imageText = e.currentTarget.value;
    if (isTopText) {
      if (memePanelNum === 1) {
        setImageTopText(imageText);
      } else if (memePanelNum === 2) {
        setImage2TopText(imageText);
      } else if (memePanelNum === 3) {
        setImage3TopText(imageText);
      }
    }
    if (!isTopText) {
      if (memePanelNum === 1) {
        setImageBottomText(imageText);
      } else if (memePanelNum === 2) {
        setImage2BottomText(imageText);
      } else if (memePanelNum === 3) {
        setImage3BottomText(imageText);
      }
    }
  };
  const handleImageTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageTextColor = e.currentTarget.value;
    setTextColor(imageTextColor);
  };

  const handleImageTextOutlineColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageTextColor = e.currentTarget.value;
    setTextOutlineColor(imageTextColor);
  };

  return (
    <div className="flex flex-col bg-gray-500 h-[90%] justify-center" style={{paddingTop: "20px"}}>
      <div className="flex justify-center">
        Resize Image (%)
        <input
          type="Number"
          name="imageResize"
          id="imageResize"
          value={imageResizeVals[memePanelNum - 1]}
          onChange={handleImageResizeChange}
          disabled={isDisabled}
        />
      </div>
      <FontFamilyComponent />
      <br />
      <div className="flex justify-center">
        Image Top Text
        <input
          type="text"
          name="imageTopText"
          id="imageTopText"
          value={topTexts[memePanelNum - 1]}
          onChange={(e) => handleImageTextChange(e, true)}
          disabled={isDisabled}
        />
      </div>
      <div className="flex justify-center">
        Image Bottom Text
        <input
          type="text"
          name="imageBottomText"
          id="imageBottomText"
          value={bottomTexts[memePanelNum - 1]}
          onChange={(e) => handleImageTextChange(e, false)}
          disabled={isDisabled}
        />
      </div>
      <div className="flex">
        <div className="flex">
          Text Color
          <input
            type="color"
            name="textColor"
            id="textkColor"
            value={textColor}
            onChange={(e) => handleImageTextColor(e)}
            disabled={isDisabled}
          />
        </div>
        <div className="flex">
          Text Outline Color
          <input
            type="color"
            name="topTextOutlineColor"
            id="topTextOutlineColor"
            value={textOutlineColor}
            onChange={(e) => handleImageTextOutlineColor(e)}
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default EditImageComponent;

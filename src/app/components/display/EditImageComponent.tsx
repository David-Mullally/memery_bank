import React, { FC, useState } from "react";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";
import FontFamilyComponent from "./fontFamilyComponent";

interface EditImageComponentProps {}

const EditImageComponent: FC<EditImageComponentProps> = () => {
  console.log("EditImageComponent Rendering");
  // Taken from store
  const editImageProperties = useEditImageProperties();
  //read values
  const isDisabled = editImageProperties.editImageProperties.isDisabled;
  const imageResize = editImageProperties.editImageProperties.imageResize;
  //set values
  const setImageBottomText = editImageProperties.setImageBottomText;
  const setImageBottomTextColor = editImageProperties.setImageBottomTextColor;
  const setImageBottomTextOutlineColor =
    editImageProperties.setImageBottomTextOutlineColor;
  const setImageTopTextOutlineColor =
    editImageProperties.setImageTopTextOutlineColor;
  const setImageResize = editImageProperties.setImageResize;
  const setImageTopTextColor = editImageProperties.setImageTopTextColor;
  const setImageTopText = editImageProperties.setImageTopText;
  const setIsPortrait = editImageProperties.setIsPortrait;
  //React hooks
  //useState
  const [selectedOption, setSelectedOption] = useState<string>("portrait");
  //other variables
  const imageLayoutOptions = ["portrait", "landscape"];
  // functions
  const handleImageResizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageResize = Number(event.currentTarget.value);
    setImageResize(imageResize);
  };

  const handleImageTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isTopText: boolean
  ) => {
    const imageText = e.currentTarget.value;
    if (isTopText) {
      setImageTopText(imageText);
    } else {
      setImageBottomText(imageText);
    }
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.currentTarget.value;
    setSelectedOption(selectedOption);
    setIsPortrait(selectedOption);
  };

  const handleImageTextColor = (
    e: React.ChangeEvent<HTMLInputElement>,
    isTopText: boolean,
    isTextOutlineColor: boolean
  ) => {
    const imageTextColor = e.currentTarget.value;
    if (isTopText) {
      if (isTextOutlineColor) {
        setImageTopTextOutlineColor(imageTextColor);
      } else {
        setImageTopTextColor(imageTextColor);
      }
    } else {
      if (isTextOutlineColor) {
        setImageBottomTextOutlineColor(imageTextColor);
      } else {
        setImageBottomTextColor(imageTextColor);
      }
    }
  };

  return (
    <div className="flex flex-col w-[30vw]" style={{ padding: "5%" }}>
      <fieldset disabled={isDisabled}>
        {imageLayoutOptions.map((option, i) => {
          return (
            <div className="flex" key={i}>
              <div>
                <input
                  type="radio"
                  name="isPortrait"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
              </div>
              <label>{option}</label>
            </div>
          );
        })}
      </fieldset>
      Resize Image (%)
      <input
        type="Number"
        name="imageResize"
        id="imageResize"
        value={imageResize}
        onChange={handleImageResizeChange}
        disabled={isDisabled}
      />
      {/* 
      -Prevent further input after the div is full
      - Chaneg it so that each new line starts in the middle and expands as new text is added
      */}
      <FontFamilyComponent />
      <br />
      Image Top Text
      <input
        type="text"
        name="imageTopText"
        id="imageTopText"
        value={editImageProperties.editImageProperties.imageTopText}
        onChange={(e) => handleImageTextChange(e, true)}
        disabled={isDisabled}
      />
      <input
        type="color"
        name="topTextColor"
        id="topTextColor"
        onChange={(e) => handleImageTextColor(e, true, false)}
        disabled={isDisabled}
      />
      <input
        type="color"
        name="topTextOutlineColor"
        id="topTextOutlineColor"
        onChange={(e) => handleImageTextColor(e, true, true)}
        disabled={isDisabled}
      />
      Image Bottom Text
      <input
        type="text"
        name="imageBottomText"
        id="imageBottomText"
        value={editImageProperties.editImageProperties.imageBottomText}
        onChange={(e) => handleImageTextChange(e, false)}
        disabled={isDisabled}
      />
      <input
        type="color"
        name="bottomTextColor"
        id="bottomTextColor"
        onChange={(e) => handleImageTextColor(e, false, false)}
        disabled={isDisabled}
      />
      <input
        type="color"
        name="bottomTextOutlineColor"
        id="bottomTextOutlineColor"
        onChange={(e) => handleImageTextColor(e, false, true)}
        disabled={isDisabled}
      />
    </div>
  );
};

export default EditImageComponent;

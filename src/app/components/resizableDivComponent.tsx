import { useState } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { useEditImageProperties } from "../stores/EditImageProperties";

interface ResizableDivProps {
  width: number;
  height: number;
  isTopText: boolean;
}

interface CustomResizeHandleProps {
  handle: string;
}

const handleStyle: React.CSSProperties = {
  width: "10px",
  height: "10px",
  background: "#eee",
  cursor: "nwse-resize", // Customize the cursor indicator, 'nwse-resize' for diagonal double arrow
  position: "absolute", // Position the handle within the resizable div
};

const resizeHandles: Record<string, React.CSSProperties> = {
  n: { ...handleStyle, top: 0, left: "50%", transform: "translateX(-50%)" }, // Top center
  ne: { ...handleStyle, top: 0, right: 0 }, // Top right
  e: { ...handleStyle, top: "50%", right: 0, transform: "translateY(-50%)" }, // Right center
  se: { ...handleStyle, bottom: 0, right: 0 }, // Bottom right
  s: { ...handleStyle, bottom: 0, left: "50%", transform: "translateX(-50%)" }, // Bottom center
  sw: { ...handleStyle, bottom: 0, left: 0 }, // Bottom left
  w: { ...handleStyle, top: "50%", left: 0, transform: "translateY(-50%)" }, // Left center
  nw: { ...handleStyle, top: 0, left: 0 }, // Top left
};

const CustomResizeHandle: React.FC<CustomResizeHandleProps> = ({ handle }) => {
  return <div style={resizeHandles[handle]} />;
};

const ResizableDiv: React.FC<ResizableDivProps> = ({ width, height, isTopText }) => {
  const editImageProperties = useEditImageProperties().editImageProperties;
  const resizableDivVisible = editImageProperties.resizableDivVisible;
    const fontFamily = editImageProperties.fontFamily;
    const isPortrait = editImageProperties.isPortrait
  // Image Top Text
  const imageTopText = editImageProperties.imageTopText;
  const imageTopTextColor = editImageProperties.imageTopTextColor;
  const imageTopTextOutlineColor = editImageProperties.imageTopTextOutlineColor;
  // Image Bottom Text
  const imageBottomText = editImageProperties.imageBottomText;
  const imageBottomTextColor = editImageProperties.imageBottomTextColor;
  const imageBottomTextOutlineColor =
        editImageProperties.imageBottomTextOutlineColor;
    let content = "";
    let imageTextColor = "";
    let textShadowColor = "";
    isTopText ? content = imageTopText : content = imageBottomText;
    isTopText ? imageTextColor = imageTopTextColor : imageTextColor = imageBottomTextColor;
    isTopText ? textShadowColor = imageTopTextOutlineColor : textShadowColor = imageBottomTextOutlineColor;
  //For Resizing div
  const [currentWidth, setCurrentWidth] = useState<number>(width);
  /*const [currentHeight, setCurrentHeight] = useState<number>(height);*/
  const handleResize = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setCurrentWidth(data.size.width);
    /*setCurrentHeight(data.size.height);*/
    };
  

  // For resizing font based current div size
  const maxFontSize = 65;
  const minFontSize = 10;
  const fontSizeBasedOnWidth = (currentWidth / 500) * maxFontSize;
  /*const fontSizeBasedOnHeight = (currentHeight / 500) * maxFontSize;*/
  const fontSize = Math.min(
    maxFontSize,
    Math.max(minFontSize, Math.min(fontSizeBasedOnWidth, /*fontSizeBasedOnHeight*/))
  );

  const contentStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: resizableDivVisible ? "1px solid black" : "none",
    overflowWrap: "break-word", // Word wrap to prevent overflowing
    fontSize: `${fontSize}px`, // Responsive font size, change the "20" as needed
    overflow: "hidden", // Prevents more text from being visible beyond the container boundaries
    position: "relative", // Ensure proper positioning of custom handles within the resizable div
    color:`${imageTextColor}`,
    textShadow: `-1px -1px 0 ${textShadowColor}, 1px -1px 0 ${textShadowColor}, -1px 1px 0 ${textShadowColor}, 1px 1px 0 ${textShadowColor}`,
    fontFamily: `${fontFamily}`,
      textAlign: "center",
      maxWidth: "100%",
  };
  return (
    <div style={{ position: "relative" }}>
      <ResizableBox
        width={width}
        height={height}
        handle={
          resizableDivVisible && (
            <div>
              <CustomResizeHandle handle="n" />
              <CustomResizeHandle handle="ne" />
              <CustomResizeHandle handle="e" />
              <CustomResizeHandle handle="se" />
              <CustomResizeHandle handle="s" />
              <CustomResizeHandle handle="sw" />
              <CustomResizeHandle handle="w" />
              <CustomResizeHandle handle="nw" />
            </div>
          )
        }
        onResize={handleResize}
        resizeHandles={["n", "ne", "e", "se", "s", "sw", "w", "nw"]} // All eight handles enabled
        minConstraints={[300, 100]}
        maxConstraints={isPortrait === "portrait" ? [800, 200] : [1200, 200]}
      >
        <div style={contentStyle}>{content}</div>
      </ResizableBox>
    </div>
  );
};

export default ResizableDiv;

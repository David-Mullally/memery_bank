import { useState } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import { useEditImageProperties } from "@/app/stores/EditImageProperties";

interface ResizableDivProps {
  width: number;
  height: number;
  isTopText: boolean;
  memePanelNum: number;
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

const ResizableDiv: React.FC<ResizableDivProps> = ({
  width,
  height,
  isTopText,
  memePanelNum,
}) => {
  const editImageProperties = useEditImageProperties().editImageProperties;
  const resizableDivVisible = editImageProperties.resizableDivVisible;
  const fontFamily = editImageProperties.fontFamily;
  // Image Top Text
  const imageTopText = editImageProperties.imageTopText;
  const image2TopText = editImageProperties.image2TopText;
  const image3TopText = editImageProperties.image3TopText;
  const imageBottomText = editImageProperties.imageBottomText;
  const image2BottomText = editImageProperties.image2BottomText;
  const image3BottomText = editImageProperties.image3BottomText;
  const textColor = editImageProperties.textColor;
  const textOutlineColor = editImageProperties.textOutlineColor;
  let content = "";
  if (isTopText) {
    if (memePanelNum === 1) {
      content = imageTopText;
    } else if (memePanelNum === 2) {
      content = image2TopText;
    } else if (memePanelNum === 3) {
      content = image3TopText;
    }
  }
  if (!isTopText) {
    if (memePanelNum === 1) {
      content = imageBottomText;
    } else if (memePanelNum === 2) {
      content = image2BottomText;
    } else if (memePanelNum === 3) {
      content = image3BottomText;
    }
  }

  //For Resizing div
  const [currentWidth, setCurrentWidth] = useState<number>(width);
  /*const [currentHeight, setCurrentHeight] = useState<number>(height);*/
  const handleResize = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    setCurrentWidth(data.size.width);
    /*setCurrentHeight(data.size.height);*/
  };

  // For resizing font based current div size
  const maxFontSize = 20;
  const minFontSize = 5;
  const fontSizeBasedOnWidth = (currentWidth / 1000) * maxFontSize;
  /*const fontSizeBasedOnHeight = (currentHeight / 500) * maxFontSize;*/
  const fontSize = Math.min(
    maxFontSize,
    Math.max(
      minFontSize,
      Math.min(fontSizeBasedOnWidth /*fontSizeBasedOnHeight*/)
    )
  );

  const contentStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: resizableDivVisible ? "1px solid black" : "none",
    overflowWrap: "break-word", // Word wrap to prevent overflowing
    fontSize: `${fontSize}px`, // Responsive font size, change the "20" as needed
    overflow: "hidden", // Prevents more text from being visible beyond the container boundaries
    position: "relative", // Ensure proper positioning of custom handles within the resizable div
    color: `${textColor}`,
    textShadow: `-1px -1px 0 ${textOutlineColor}, 1px -1px 0 ${textOutlineColor}, -1px 1px 0 ${textOutlineColor}, 1px 1px 0 ${textOutlineColor}`,
    fontFamily: `${fontFamily}`,
    textAlign: "center",
    maxWidth: "80%",
  };
  return (
    <div style={{ position: "relative" }}>
      <ResizableBox
        width={width}
        height={height}
        handle={
          resizableDivVisible && (
            <div style={{ maxWidth: "100%" }}>
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
        minConstraints={[100, 10]}
        maxConstraints={[600, 150]}
      >
        <div style={contentStyle}>{content}</div>
      </ResizableBox>
    </div>
  );
};

export default ResizableDiv;

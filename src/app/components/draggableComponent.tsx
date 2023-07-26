import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useEditImageProperties } from "../stores/EditImageProperties";

interface DraggableElementProps {
  defaultPosition: { x: number; y: number };
  isTopText: boolean;
  memePanelNum: number;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  defaultPosition,
  isTopText,
  memePanelNum,
}) => {
  const editImageProperties = useEditImageProperties().editImageProperties;
  const fontFamily = editImageProperties.fontFamily;
  const imageTextColor = editImageProperties.textColor;
  const imageTextOutlineColor = editImageProperties.textOutlineColor;
  const imageTopText = editImageProperties.imageTopText;
  const image2TopText = editImageProperties.image2TopText;
  const image3TopText = editImageProperties.image3TopText;
  const imageBottomText = editImageProperties.imageBottomText;
  const image2BottomText = editImageProperties.image2BottomText;
  const image3BottomText = editImageProperties.image3BottomText;
  const resizableDivVisible =
    useEditImageProperties().editImageProperties.resizableDivVisible;
  const parentRef = React.useRef<HTMLDivElement>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    // Calculate the parent's bounding rectangle
    const parentRect = parentRef.current?.getBoundingClientRect();

    // Calculate the element's bounding rectangle
    const elementRect = elementRef.current?.getBoundingClientRect();

    // Calculate the maximum allowable X and Y positions for the element within the parent
    const maxX = (parentRect?.width ?? 0) - (elementRect?.width ?? 0);
    const maxY = (parentRect?.height ?? 0) - (elementRect?.height ?? 0);

    // Restrict the draggable element's movement within the parent container
    const x = Math.min(Math.max(0, data.x), maxX);
    const y = Math.min(Math.max(0, data.y), maxY);

    // Set the new position for the draggable element
    data.node.style.transform = `translate(${x}px, ${y}px)`;
  };

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
  return (
    <div
      ref={parentRef}
      style={{
        border: resizableDivVisible ? "1px solid #ccc" : "",
        position: "relative",
        height: "13vh",
        maxWidth: "100%",
        overflow: "hidden"
      }}
    >
      {/* Draggable Element */}
      <Draggable
        defaultPosition={defaultPosition}
        onDrag={handleDrag}
        nodeRef={elementRef}
        bounds="parent" // Restrict dragging within the parent container
      >
        <div
          ref={elementRef}
          style={{
            border: resizableDivVisible ? "1px solid #f00" : "",
            cursor: "move",
            maxWidth: "100%",
            fontSize: "1.5em",
            fontFamily: `${fontFamily}`,
            height: "2em",
            color: `${imageTextColor}`,
            textShadow: `-1px -1px 0 ${imageTextOutlineColor}, 1px -1px 0 ${imageTextOutlineColor}, -1px 1px 0 ${imageTextOutlineColor}, 1px 1px 0 ${imageTextOutlineColor}`,
            overflowWrap: "break-word", // Word wrap to prevent overflowing
            overflow: "hidden", // Prevents more text from being visible beyond the container boundaries
          }}
        >
          {content}
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableElement;

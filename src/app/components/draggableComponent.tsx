import React from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import ResizableDiv from "./resizableDivComponent";

interface DraggableElementProps {
    defaultPosition: { x: number; y: number };
    isTopText: boolean;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
    defaultPosition,
    isTopText,
}) => {
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

  return (
    <div
      ref={parentRef}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        position: "relative",
        height: "400px",
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
          style={{ border: "1px solid #f00", padding: "10px", cursor: "move" }}
              >
                  <ResizableDiv width={200} height={200} isTopText={isTopText} />
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableElement;

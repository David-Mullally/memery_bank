import React from 'react';

const handleStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  background: '#eee',
  cursor: 'nwse-resize', // Customize the cursor indicator, 'nwse-resize' for diagonal double arrow
  position: 'absolute', // Position the handle within the resizable div
};

const resizeHandles: Record<string, React.CSSProperties> = {
  n: { ...handleStyle, top: 0, left: '50%', transform: 'translateX(-50%)' }, // Top center
  ne: { ...handleStyle, top: 0, right: 0 }, // Top right
  e: { ...handleStyle, top: '50%', right: 0, transform: 'translateY(-50%)' }, // Right center
  se: { ...handleStyle, bottom: 0, right: 0 }, // Bottom right
  s: { ...handleStyle, bottom: 0, left: '50%', transform: 'translateX(-50%)' }, // Bottom center
  sw: { ...handleStyle, bottom: 0, left: 0 }, // Bottom left
  w: { ...handleStyle, top: '50%', left: 0, transform: 'translateY(-50%)' }, // Left center
  nw: { ...handleStyle, top: 0, left: 0 }, // Top left
};

interface CustomResizeHandleProps {
  handle: keyof typeof resizeHandles;
}

const CustomResizeHandle: React.FC<CustomResizeHandleProps> = ({ handle }) => {
  return <div style={resizeHandles[handle]} />;
};

export default CustomResizeHandle;

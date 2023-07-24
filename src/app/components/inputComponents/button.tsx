"useclient";
import React, { FC } from "react";
import cn from "classnames";

interface ButtonComponentProps {
  buttonType: props["buttonType"];
  disabled: boolean;
  onClick: () => void;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  onClick,
  disabled,
  buttonType,
}) => {
  const buttonStyle = () => {
    switch (buttonType) {
      case "UPLOAD":
        return {
          text: disabled ? "Upload A New Image" : "",
          className: "bg-green-500 text-white",
        };
      case "DOWNLOAD":
        return {
          text: disabled ? "Nothing To Download" : "Download Image",
          className: "bg-blue-500 text-white",
        };
      case "CLEAR":
        return {
          text: disabled ? "Nothing To Clear" : "Clear Image",
          className: "bg-red-500 text-white",
        };
    }
  };
  return (
    <button
      className={cn(
        buttonStyle().className,
        "px-2 py-1 rounded-sm border-[1px] border-teal-700 transition-all h-[50%] w-[100%]"
      )}
      onClick={onClick}
    >
      {buttonStyle().text}
    </button>
  );
};

type props = {
  buttonType: "UPLOAD" | "DOWNLOAD" | "CLEAR";
};

export default ButtonComponent;

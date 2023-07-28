import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const CircularCropComponent: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isUploadInptDisplayHidden, setUploadInputDisplayHidden] =
    useState<boolean>(true);

  const handleUploadInputDisplayHidden = () => {
    setUploadInputDisplayHidden(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
    }
    setUploadInputDisplayHidden(true);
  };

  const handleDownload = async () => {
    const croppedImage = await generateCircularCrop(imageRef);
    if (croppedImage) {
      // Create a temporary anchor element to trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = croppedImage;
      downloadLink.download = "circular_crop.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const generateCircularCrop = async (
    imageRef: React.RefObject<HTMLImageElement>
  ) => {
    if (imageRef.current) {
      // Create a circular mask
      imageRef.current.style.borderRadius = "50%";

      try {
        // Convert the image contents to an image (PNG format)
        const canvas = await html2canvas(imageRef.current, {
          useCORS: true,
          backgroundColor: null, // Set background color to transparent
        });

        // Reset the image style after conversion
        imageRef.current.style.borderRadius = "0%";

        // Create a new canvas to remove the white background
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        const ctx = finalCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, 0);

        // Convert the final canvas to a data URL
        const croppedImage = finalCanvas.toDataURL("image/png");
        //Remove circular mask afetr download
        imageRef.current.style.borderRadius = "50%";
        return croppedImage;
      } catch (error) {
        console.error("Error generating circular crop:", error);
      }
    }

    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#E5E5E5",
          backgroundImage: `url(${imageURL})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          borderRadius: "50%",
          marginBottom: "2vh",
        }}
        ref={imageRef}
      ></div>
      {isUploadInptDisplayHidden ? (
        <div
          style={{
            height: "5vh",
            width: "100%",
            margin: "0",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "green",
          }}
          onClick={handleUploadInputDisplayHidden}
        >
          UPLOAD
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ width: "100%" }}
        />
      )}
      <div
        style={{
          height: "5vh",
          width: "100%",
          margin: "0",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "red",
        }}
        onClick={handleDownload}
      >
        DOWNLOAD
      </div>
    </div>
  );
};

export default CircularCropComponent;

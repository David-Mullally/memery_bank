"use client";
import UploadDownloadImageComponent from "./components/UploadDownloadImageComponent";
import EditImageComponent from "./components/EditImageComponent";
import DraggableElement from "./components/draggableComponent";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-wrap w-[100vw] h-[100vh] bg-gray-500">
      <UploadDownloadImageComponent />
      <EditImageComponent />
    </div>
  );
};

export default HomePage;

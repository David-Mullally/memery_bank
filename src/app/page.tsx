"use client";
import MemeComponent from "./components/displayComponents/memeComponent";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col w-[100vw] h-[100vh] bg-black">
        <MemeComponent />
      </div>
    </>
  );
};

export default HomePage;

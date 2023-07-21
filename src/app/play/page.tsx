"use client";
import React from 'react';
import UploadDownloadImageComponent from '../components/display/UploadDownloadImageComponent';
import EditImageComponent from '../components/display/EditImageComponent';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-wrap w-[100vw] h-[100vh] bg-gray-500">
      <UploadDownloadImageComponent />
      <EditImageComponent />
    </div>
  );
};

export default HomePage;

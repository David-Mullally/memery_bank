// pages/about.tsx
"use client";
import React from "react";
import OffcanvasExample from "@/app/components/NavbarComponent";

const AboutPage: React.FC = () => {
  return (
    <>
      <OffcanvasExample />
      <div>
        <h1>About Us</h1>
        <p>This is the About page.</p>
      </div>
    </>
  );
};

export default AboutPage;

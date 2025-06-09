'use client';

import React from "react";
import MainContent from "./MainContent";
import Scene from "./Scene";
import Indicators from "./Indicators";

const PageContent = () => {
  return (
    <div className="bg-black">
      <MainContent />
      <Scene />
      <Indicators />
    </div>
  );
};

export default PageContent; 
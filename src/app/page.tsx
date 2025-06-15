'use client';

import React from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Scene from "./components/Scene";
import Indicators from "./components/Indicators";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <main className="bg-black">
        <MainContent />
        <Scene />
        <Indicators />
      </main>
    </div>
  );
}

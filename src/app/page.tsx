'use client';

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Scene from './components/Scene';
import Indicators from "./components/Indicators";
import BackgroundClouds from "./components/BackgroundClouds";
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);

  useEffect(() => {
    // Verificar si la página se cargó por navegación o por refresh
    const navigationEntry = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isNavigation = navigationEntry?.type === 'navigate';
    if (isNavigation) {
      setShowLoading(false);
      setShowIndicators(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowIndicators(true);
  };

  return (
    <div className="bg-black">
      <BackgroundClouds />
      <Navbar />
      <main className="relative min-h-screen">
        <LoadingScreen 
          enabled={showLoading} 
          onLoadingComplete={handleLoadingComplete} 
        />
        {showIndicators && <Indicators />}
        <MainContent />
        <Scene />
      </main>
    </div>
  );
}

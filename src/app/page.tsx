'use client';

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import Scene from './components/Scene';
import BackgroundClouds from "./components/BackgroundClouds";
import LoadingScreen from './components/LoadingScreen';
import Indicators from './components/Indicators';

export default function Home() {
  const [showLoading, setShowLoading] = useState(false);
  const [showSection1, setShowSection1] = useState(true);
  const [showSection2, setShowSection2] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [blockScroll, setBlockScroll] = useState(false);
  const [unmountScene, setUnmountScene] = useState(false);

  // When MainContent animation ends (Section1)
  const handleSection1End = () => {
    setTransitioning(true);
    setBlockScroll(true);
    setTimeout(() => {
      setShowSection1(false);
      setShowSection2(true);
      setTransitioning(false);
      setBlockScroll(false);
      setUnmountScene(false); // Ensures Scene is mounted
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 200);
  };

  // Return from Scene (Section2) to MainContent (Section1)
  const handleBackToSection1 = () => {
    setTransitioning(true);
    setBlockScroll(true);
    setTimeout(() => {
      setShowSection2(false);
      setShowSection1(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => {
        setShowSection1(true);
        setTransitioning(false);
        setBlockScroll(false);
      }, 100);
      setTimeout(() => {
        setUnmountScene(true); // Unmounts Scene after fade-out
      }, 300); // Wait for fade-out-scene duration
    }, 200);
  };

  React.useEffect(() => {
    document.body.style.overflow = transitioning || blockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [transitioning, blockScroll]);

  return (
    <div className="bg-black relative min-h-[100dvh]">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <BackgroundClouds onlyInScene={showSection2} />
      </div>
      <Navbar />
      <Indicators inMain={showSection1} inScene={showSection2} />
      <main className="relative min-h-[100dvh] z-10">
        <LoadingScreen enabled={showLoading} onLoadingComplete={() => setShowLoading(false)} />
        {showSection1 && <MainContent onSectionEnd={handleSection1End} />}
        {(showSection2 || (!unmountScene && transitioning)) && (
          <Scene show={showSection2} transitioning={transitioning} onBack={handleBackToSection1} />
        )}
      </main>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Indicators = () => {
  const [scrollY, setScrollY] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Obtener la posición del elemento scene
      const sceneElement = document.getElementById('scene-section');
      const scenePosition = sceneElement?.offsetTop || 0;
      
      // Calcular si estamos en la sección de la escena
      const isInScene = currentScrollY >= scenePosition;
      
      // Actualizar el estado basado en la posición
      setIsInSceneSection(isInScene);
    };

    const handleResize = () => {
      setPageHeight(document.documentElement.scrollHeight);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Set initial values
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isInSceneSection, setIsInSceneSection] = useState(false);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 text-white text-sm z-50`}>
      {/* Scroll to view content */}
      <div className={`flex flex-row items-center gap-2 transition-opacity duration-300 ${isInSceneSection ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src="/assets/arrow-down.svg"
          alt="Arrow down"
          width={20}
          height={20}
          className="animate-bounce-arrow"
        />
        <span className="font-[family-name:var(--font-poppins)] whitespace-nowrap">
          Scroll to view
        </span>
      </div>

      {/* Hover to explore content */}
      <div className={`absolute flex flex-row items-center gap-2 transition-opacity duration-300 ${isInSceneSection ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src="/assets/mouse.svg"
          alt="Mouse icon"
          width={20}
          height={20}
          className="animate-mouse-circle"
        />
        <span className="font-[family-name:var(--font-poppins)] whitespace-nowrap">
          Hover to explore
        </span>
      </div>
    </div>
  );
};

export default Indicators; 
'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Scene = () => {
  // const [scrollY, setScrollY] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [isTempleHovered, setIsTempleHovered] = useState(false);
  const [isSunHovered, setIsSunHovered] = useState(false);
  const [isFlowerHovered, setIsFlowerHovered] = useState(false);
  const [isTreeHovered, setIsTreeHovered] = useState(false);
  const [isTopRightLightsHovered, setIsTopRightLightsHovered] = useState(false);
  const [isLettersHovered, setIsLettersHovered] = useState(false);
  // const [isMidLeftLightsHovered, setIsMidLeftLightsHovered] = useState(false);
  const [flowerOpacity, setFlowerOpacity] = useState(0);
  const [treeOpacity, setTreeOpacity] = useState(0);
  const [flowerPosition, setFlowerPosition] = useState(100);
  const [treePosition, setTreePosition] = useState(100);
  const [sunOpacity, setSunOpacity] = useState(1);
  const [sunPosition, setSunPosition] = useState(0);
  const [templeOpacity, setTempleOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // setScrollY(currentScrollY);
      
      // Configuración de la animación del sol
      const sunAnimationStart = 300;
      const sunAnimationEnd = sectionTop + sectionHeight - windowHeight;
      const sunProgress = (currentScrollY - sunAnimationStart) / (sunAnimationEnd - sunAnimationStart);
      const newSunOpacity = animationsEnabled ? Math.min(1, Math.max(0, sunProgress)) : 1;
      setSunOpacity(newSunOpacity);
      
      // Calcular la posición vertical del sol con offset responsivo
      const sunStartPosition = getResponsiveOffset(100);
      const sunEndPosition = 0;
      const newSunPosition = animationsEnabled 
        ? sunStartPosition - (sunProgress * (sunStartPosition - sunEndPosition))
        : sunEndPosition;
      setSunPosition(newSunPosition);
      
      // Configuración de la animación del templo
      const templeAnimationStart = 400;
      const templeAnimationEnd = sectionTop + sectionHeight - windowHeight;
      const templeProgress = (currentScrollY - templeAnimationStart) / (templeAnimationEnd - templeAnimationStart);
      const newTempleOpacity = animationsEnabled ? Math.min(1, Math.max(0, templeProgress)) : 1;
      setTempleOpacity(newTempleOpacity);

      // Configuración de la animación de la flor y el árbol
      const flowerTreeAnimationStart = 400;
      const flowerTreeAnimationEnd = sectionTop + sectionHeight - windowHeight;
      const flowerTreeProgress = (currentScrollY - flowerTreeAnimationStart) / (flowerTreeAnimationEnd - flowerTreeAnimationStart);
      
      setFlowerOpacity(animationsEnabled ? Math.min(1, Math.max(0, flowerTreeProgress)) : 1);
      setTreeOpacity(animationsEnabled ? Math.min(1, Math.max(0, flowerTreeProgress)) : 1);
      const flowerTreeOffsetStart = getResponsiveOffset(300);
      setFlowerPosition(animationsEnabled ? flowerTreeOffsetStart - (flowerTreeProgress * flowerTreeOffsetStart) : 0);
      setTreePosition(animationsEnabled ? flowerTreeOffsetStart - (flowerTreeProgress * flowerTreeOffsetStart) : 0);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      const section = document.querySelector('.scene-section');
      if (section) {
        const htmlSection = section as HTMLElement;
        setSectionHeight(htmlSection.clientHeight);
        setSectionTop(htmlSection.offsetTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionTop, sectionHeight, windowHeight, animationsEnabled]);

  // Calcular offsets responsivos
  const getResponsiveOffset = (baseOffset: number) => {
    if (windowWidth >= 1920) return baseOffset;
    if (windowWidth >= 1440) return baseOffset * 0.8;
    if (windowWidth >= 1024) return baseOffset * 0.6;
    return baseOffset * 0.4;
  };

  return (
    <div className="scene-section min-h-screen relative flex items-center justify-center bg-black overflow-hidden">
      <button
        onClick={() => setAnimationsEnabled(!animationsEnabled)}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
      >
        {animationsEnabled ? 'Desactivar Animaciones' : 'Activar Animaciones'}
      </button>
      <div 
        className="sun absolute top-[45%] left-1/2 transition-all duration-300 aspect-square w-[31vw]"
        style={{ 
          opacity: sunOpacity,
          transform: `translate(-50%, calc(-50% + ${sunPosition}%))`
        }}
      >
        <Image
          src={isSunHovered ? "/assets/sun.svg" : "/assets/sun-off.svg"}
          alt="Sun"
          fill
          priority
          className="object-contain cursor-pointer"
          onMouseEnter={() => setIsSunHovered(true)}
          onMouseLeave={() => setIsSunHovered(false)}
        />
      </div>
      <div 
        className="temple absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 aspect-square w-[48vw]"
        style={{ opacity: templeOpacity }}
      >
        <Image
          src={isTempleHovered ? "/assets/temple.svg" : "/assets/temple-off.svg"}
          alt="Temple"
          fill
          priority
          className="object-contain cursor-pointer"
          onMouseEnter={() => setIsTempleHovered(true)}
          onMouseLeave={() => setIsTempleHovered(false)}
        />
      </div>
      <div 
        className="flower absolute bottom-[-20%] left-[-28%] transition-all duration-300 w-[70%] h-[70%]"
        style={{
          opacity: flowerOpacity,
          transform: `translateY(${flowerPosition}%) rotate(20deg)`,
          pointerEvents: flowerOpacity > 0 ? 'auto' : 'none'
        }}
      >
        <Image
          src={isFlowerHovered ? "/assets/flower.svg" : "/assets/flower-off.svg"}
          alt="Flower"
          fill
          priority
          className="object-contain cursor-pointer"
          onMouseEnter={() => setIsFlowerHovered(true)}
          onMouseLeave={() => setIsFlowerHovered(false)}
        />
      </div>
      <div 
        className="tree absolute bottom-[-30%] right-[-10%] transition-all duration-300 w-[60%] h-[90%]"
        style={{
          opacity: treeOpacity,
          transform: `translateY(${treePosition}%)  rotate(-5deg)`,
          pointerEvents: treeOpacity > 0 ? 'auto' : 'none'
        }}
      >
        <Image
          src={isTreeHovered ? "/assets/tree.svg" : "/assets/tree-off.svg"}
          alt="Tree"
          fill
          priority
          className="object-contain cursor-pointer"
          onMouseEnter={() => setIsTreeHovered(true)}
          onMouseLeave={() => setIsTreeHovered(false)}
        />
      </div>
      <div 
        className="absolute top-[0] right-[-10%] w-[40%] h-[40%]"
        onMouseEnter={() => setIsTopRightLightsHovered(true)}
        onMouseLeave={() => setIsTopRightLightsHovered(false)}
      >
        <Image
          src={isTopRightLightsHovered ? "/assets/lights.svg" : "/assets/lights-off.svg"}
          alt="Lights"
          fill
          priority
          className="object-contain cursor-pointer"
        />
      </div>
      <div 
        className="absolute top-[54%] left-[20%] -translate-y-1/2 w-[20%] h-[20%] z-40"
      >
        <Image
          src="/assets/light-off.svg"
          alt="Mid Left Lights"
          fill
          priority
          className="object-contain cursor-pointer"
        />
      </div>
      <div 
        className="absolute top-10 left-0 w-[12%] h-[12%]"
        onMouseEnter={() => setIsLettersHovered(true)}
        onMouseLeave={() => setIsLettersHovered(false)}
      >
        <Image
          src={isLettersHovered ? "/assets/letters.svg" : "/assets/letters-off.svg"}
          alt="Letters"
          fill
          priority
          className="object-contain cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Scene; 
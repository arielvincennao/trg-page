'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Scene = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [isTempleHovered, setIsTempleHovered] = useState(false);
  const [isSunHovered, setIsSunHovered] = useState(false);
  const [isFlowerHovered, setIsFlowerHovered] = useState(false);
  const [isTreeHovered, setIsTreeHovered] = useState(false);
  const [showFlower, setShowFlower] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [flowerOffset, setFlowerOffset] = useState(100);
  const [treeOffset, setTreeOffset] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(currentScrollY / (maxScroll * 0.9), 1);
      
      setScrollY(currentScrollY);
      setShowFlower(currentScrollY >= maxScroll * 0.9);
      setShowTree(currentScrollY >= maxScroll * 0.9);
      
      // Calcular el offset basado en el progreso del scroll
      setFlowerOffset(100 - (scrollProgress * 100));
      setTreeOffset(100 - (scrollProgress * 100));
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      const section = document.querySelector('.scene-section');
      if (section) {
        setSectionHeight(section.clientHeight);
        setSectionTop(section.offsetTop);
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
  }, []);

  // Configuración de la animación del sol
  const sunAnimationStart = 300;
  const sunAnimationEnd = sectionTop + sectionHeight - windowHeight;
  const sunProgress = (scrollY - sunAnimationStart) / (sunAnimationEnd - sunAnimationStart);
  const sunOpacity = animationsEnabled ? Math.min(1, Math.max(0, sunProgress)) : 1;
  
  // Calcular offsets responsivos
  const getResponsiveOffset = (baseOffset: number) => {
    if (windowWidth >= 1920) return baseOffset;
    if (windowWidth >= 1440) return baseOffset * 0.8;
    if (windowWidth >= 1024) return baseOffset * 0.6;
    return baseOffset * 0.4;
  };

  // Calcular la posición vertical del sol con offset responsivo
  const sunStartPosition = getResponsiveOffset(100);
  const sunEndPosition = 0;
  const sunPosition = animationsEnabled 
    ? sunStartPosition - (sunProgress * (sunStartPosition - sunEndPosition))
    : sunEndPosition;

  // Configuración de la animación del templo
  const templeAnimationStart = 400;
  const templeAnimationEnd = sectionTop + sectionHeight - windowHeight;
  const templeProgress = (scrollY - templeAnimationStart) / (templeAnimationEnd - templeAnimationStart);
  const templeOpacity = animationsEnabled ? Math.min(1, Math.max(0, templeProgress)) : 1;

  // Configuración de la animación de la sombra
  const shadowAnimationStart = sectionTop + sectionHeight - windowHeight - 100;
  const shadowAnimationEnd = sectionTop + sectionHeight - windowHeight;
  const shadowProgress = (scrollY - shadowAnimationStart) / (shadowAnimationEnd - shadowAnimationStart);
  const shadowOpacity = animationsEnabled ? Math.min(1, Math.max(0, shadowProgress)) : 1;

  return (
    <div className="scene-section min-h-screen relative flex items-center justify-center bg-black">
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
        className="flower fixed bottom-[-10%] left-[-10%] transition-all duration-300 aspect-square w-[25vw] md:w-[25vw] sm:w-[35vw] xs:w-[45vw]"
        style={{ 
          opacity: showFlower ? 1 : 0,
          pointerEvents: showFlower ? 'auto' : 'none',
          transform: `translate(${flowerOffset}%, ${flowerOffset}%)`
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
        className="tree fixed bottom-[-10%] right-[-10%] transition-all duration-300 aspect-square w-[45vw] md:w-[45vw] sm:w-[55vw] xs:w-[65vw]"
        style={{ 
          opacity: showTree ? 1 : 0,
          pointerEvents: showTree ? 'auto' : 'none',
          transform: `translate(${-treeOffset}%, ${treeOffset}%)`
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
      {/* <div 
        className="absolute top-[65%] left-1/2 -translate-x-1/2 transition-opacity duration-300 aspect-[5/1] w-[50vw]"
        style={{ opacity: shadowOpacity }}
      >
        <Image
          src="/assets/temple-shadow.svg"
          alt="Temple Shadow"
          fill
          priority
          className="object-contain"
        />
      </div> */}
    </div>
  );
};

export default Scene; 
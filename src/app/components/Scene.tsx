'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TempleOff from "./assets/TempleOff";
import Temple from "./assets/Temple";
import SunOff from "./assets/SunOff";
import Sun from "./assets/Sun";
import LightOff from "./assets/LightOff";
import LightOn from "./assets/LightOn";
import Card from './Card';
import { cardContent, CardContent } from '../data/cardContent';

const Scene = () => {
  const [isTempleHovered, setIsTempleHovered] = useState(false);
  const [isSunHovered, setIsSunHovered] = useState(false);
  const [isFlowerHovered, setIsFlowerHovered] = useState(false);
  const [isTreeHovered, setIsTreeHovered] = useState(false);
  const [isTopRightLightsHovered, setIsTopRightLightsHovered] = useState(false);
  const [isLettersHovered, setIsLettersHovered] = useState(false);
  const [isLeftLightHovered, setIsLeftLightHovered] = useState(false);
  const [activeCard, setActiveCard] = useState<CardContent | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const sceneElement = document.getElementById('scene-section');
      
      if (sceneElement && isScrollingUp) {
        const rect = sceneElement.getBoundingClientRect();
        if (rect.top >= -10 && rect.top <= 10) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseCard = () => {
    setActiveCard(null);
  };

  const handleExplore = () => {
    console.log('Explorar clickeado:', activeCard?.title);
  };

  return (
    <div id="scene-section" className="bg-black">
      <div className="h-screen relative overflow-hidden">
        {/* Temple */}
        <div
          className="temple absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[48vw]"
          style={{ 
            border: '1px solid red',
            cursor: 'default'
          }}
        >
          {/* Sun */}
          <div 
            className="sun absolute top-[25%] left-[48%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[28vw]"
            style={{ 
              border: '1px solid red',
              zIndex: -1
            }}
          >
            {isSunHovered ? (
              <Sun
                isHovered={isSunHovered}
                onMouseEnter={() => setIsSunHovered(true)}
                onMouseLeave={() => setIsSunHovered(false)}
                className="object-contain cursor-pointer w-full h-auto"
                style={{ 
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => setActiveCard(cardContent.sun)}
              />
            ) : (
              <SunOff
                isHovered={isSunHovered}
                onMouseEnter={() => setIsSunHovered(true)}
                onMouseLeave={() => setIsSunHovered(false)}
                className="object-contain cursor-pointer w-full h-auto"
                style={{ 
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => setActiveCard(cardContent.sun)}
              />
            )}
          </div>

          {isTempleHovered ? (
            <Temple
              isHovered={isTempleHovered}
              onMouseEnter={() => setIsTempleHovered(true)}
              onMouseLeave={() => setIsTempleHovered(false)}
              className="object-contain cursor-pointer w-full h-auto"
              style={{ 
                pointerEvents: 'visiblePainted'
              }}
              onClick={() => setActiveCard(cardContent.temple)}
            />
          ) : (
            <TempleOff
              isHovered={isTempleHovered}
              onMouseEnter={() => setIsTempleHovered(true)}
              onMouseLeave={() => setIsTempleHovered(false)}
              className="object-contain cursor-pointer w-full h-auto"
              style={{ 
                pointerEvents: 'visiblePainted'
              }}
              onClick={() => setActiveCard(cardContent.temple)}
            />
          )}

          {/* Card */}
          {activeCard && (
            <Card
              title={activeCard.title}
              description={activeCard.description}
              onClose={handleCloseCard}
              onExplore={handleExplore}
            />
          )}

          {/* Left Lamp Temple */}
          <div 
            className="absolute left-[1.2%] top-[52%] transform -translate-y-1/2 w-[12%]"
            style={{ 
              border: '1px solid red',
              zIndex: 10
            }}
          >
            {isLeftLightHovered ? (
              <LightOn
                isHovered={isLeftLightHovered}
                onMouseEnter={() => setIsLeftLightHovered(true)}
                onMouseLeave={() => setIsLeftLightHovered(false)}
                className="object-contain cursor-pointer w-full h-auto"
                style={{ 
                  pointerEvents: 'auto'
                }}
                onClick={() => setActiveCard(cardContent.leftLight)}
              />
            ) : (
              <LightOff
                isHovered={isLeftLightHovered}
                onMouseEnter={() => setIsLeftLightHovered(true)}
                onMouseLeave={() => setIsLeftLightHovered(false)}
                className="object-contain cursor-pointer w-full h-auto"
                style={{ 
                  pointerEvents: 'auto'
                }}
                onClick={() => setActiveCard(cardContent.leftLight)}
              />
            )}
          </div>
        </div>

        {/* Bottom Left Flower */}
        <div 
          className="flower absolute bottom-[-20%] left-[-28%] transition-all duration-300 w-[70%] h-[70%]"
          style={{
            border: '1px solid red',
            zIndex: 0
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
            onClick={() => setActiveCard(cardContent.flower)}
          />
        </div>

        {/* Right Tree*/}
        <div 
          className="tree absolute bottom-[-30%] right-[0%] transition-all duration-300 w-[50%] h-[90%]"
          style={{
            border: '1px solid red'
          }}
        >
          <Image
            src={isTreeHovered ? "/assets/tree.svg" : "/assets/tree-off.svg"}
            alt="Tree"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto"
            onMouseEnter={() => setIsTreeHovered(true)}
            onMouseLeave={() => setIsTreeHovered(false)}
            onClick={() => setActiveCard(cardContent.tree)}
          />
        </div>

        {/* Right Top Lights */}
        <div 
          className="absolute top-[0] right-[8%] w-[10%] h-[40%]"
          style={{ border: '1px solid red' }}
        >
          <Image
            src={isTopRightLightsHovered ? "/assets/lights.svg" : "/assets/lights-off.svg"}
            alt="Lights"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto"
            onMouseEnter={() => setIsTopRightLightsHovered(true)}
            onMouseLeave={() => setIsTopRightLightsHovered(false)}
            onClick={() => setActiveCard(cardContent.topRightLights)}
          />
        </div>

        {/* Left Top Letters */}
        <div 
          className="absolute top-[8%] left-[2%] w-[10%] h-[14%]"
          style={{ border: '1px solid red' }}
        >
          <Image
            src={isLettersHovered ? "/assets/letters.svg" : "/assets/letters-off.svg"}
            alt="Letters"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto"
            onMouseEnter={() => setIsLettersHovered(true)}
            onMouseLeave={() => setIsLettersHovered(false)}
            onClick={() => setActiveCard(cardContent.letters)}
          />
        </div>
      </div>
      <div className="h-[500vh] bg-black"></div>
    </div>
  );
};

export default Scene; 
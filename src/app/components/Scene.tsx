'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TempleOff from "./assets/TempleOff";
import Temple from "./assets/Temple";
import SunOff from "./assets/SunOff";
import Sun from "./assets/Sun";
import Card from './Card';
import { cardContent, CardContent } from '../data/cardContent';

export default function Scene() {
  const [isSunHovered, setIsSunHovered] = useState(false);
  const [isTempleHovered, setIsTempleHovered] = useState(false);
  const [isLeftLightHovered, setIsLeftLightHovered] = useState(false);
  const [isFlowerHovered, setIsFlowerHovered] = useState(false);
  const [isTreeHovered, setIsTreeHovered] = useState(false);
  const [isTopRightLightsHovered, setIsTopRightLightsHovered] = useState(false);
  const [isLettersHovered, setIsLettersHovered] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<CardContent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const lastScrollY = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isVisible) {
      startTimeRef.current = Date.now();
    }
  }, [isVisible]);

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
      
      const sceneSection = document.getElementById('scene-section');
      if (sceneSection) {
        const rect = sceneSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView && !isVisible) {
          setIsLeaving(false);
          setIsVisible(true);
        } else if (!isInView && isVisible) {
          setIsLeaving(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 600); // Tiempo suficiente para que todas las animaciones de salida terminen
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar estado inicial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const sceneElement = document.getElementById('scene-section');
    if (!sceneElement) return;
    
    const updateCanvasSize = () => {
      const rect = sceneElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = updateCanvasSize();

    const PARTICLE_COUNT = 100;
    const INITIAL_DELAY = 2000; // 2 segundos de delay inicial
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      opacity: 0,
      targetOpacity: 0.1 + Math.random() * 0.3,
      delay: INITIAL_DELAY
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const currentTime = Date.now() - startTimeRef.current;

      for (const p of particles) {
        if (currentTime < p.delay) continue;
        
        const fadeInDuration = 1000;
        const timeSinceDelay = currentTime - p.delay;
        const fadeProgress = Math.min(timeSinceDelay / fadeInDuration, 1);
        
        p.opacity = p.targetOpacity * fadeProgress;
        
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    function update() {
      const currentTime = Date.now() - startTimeRef.current;
      for (const p of particles) {
        if (currentTime < p.delay) continue;
        
        p.x += p.dx;
        p.y += p.dy;

        // Rebote en los bordes
        if (p.x < 0) {
          p.x = 0;
          p.dx = Math.abs(p.dx);
        }
        if (p.x > width) {
          p.x = width;
          p.dx = -Math.abs(p.dx);
        }
        if (p.y < 0) {
          p.y = 0;
          p.dy = Math.abs(p.dy);
        }
        if (p.y > height) {
          p.y = height;
          p.dy = -Math.abs(p.dy);
        }

        // Variación aleatoria en la dirección
        p.dx += (Math.random() - 0.5) * 0.1;
        p.dy += (Math.random() - 0.5) * 0.1;

        // Limitar la velocidad máxima
        const maxSpeed = 1;
        const currentSpeed = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (currentSpeed > maxSpeed) {
          p.dx = (p.dx / currentSpeed) * maxSpeed;
          p.dy = (p.dy / currentSpeed) * maxSpeed;
        }
      }
    }

    function animate() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      const newSize = updateCanvasSize();
      width = newSize.width;
      height = newSize.height;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  const handleCloseCard = () => {
    setActiveCard(null);
    setActiveElement(null);
  };

  const handleElementClick = (elementId: string, cardContent: CardContent) => {
    if (activeElement) return;
    setActiveCard(cardContent);
    setActiveElement(elementId);
  };

  const handleExplore = () => {
    console.log('Explorar clickeado:', activeCard?.title);
  };

  const getElementClasses = (elementId: string, baseClasses: string) => {
    const isDisabled = activeElement && activeElement !== elementId;
    return `${baseClasses} ${isDisabled ? 'opacity-15 pointer-events-none' : ''}`;
  };

  const getAnimationClass = (delay: number) => {
    if (isLeaving) {
      return `fade-out-down-delay-${delay}`;
    }
    return isVisible ? `fade-in-up fade-in-up-delay-${delay}` : 'opacity-0';
  };

  return (
    <div id="scene-section" className="bg-black h-screen glitch-lines relative">
      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[9999]"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}
        aria-hidden="true"
      />
      <div className="h-screen relative overflow-hidden temple-glitch-lines">
        {/* Temple */}
        <div
          className={`temple absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[48vw] ${getAnimationClass(1)}`}
          style={{ zIndex: 2 }}
        >
          {/* Temple Shadow */}
          <div 
            className="absolute top-[100%] left-[50%] -translate-y-1/2 w-[40vw] h-[5vw] rounded-[50%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.1) 50%, rgba(255,0,0,0) 70%)',
              filter: 'blur(40px)',
              zIndex: 0,
              transform: 'translate(-50%, -50%) scale(1.5)',
              boxShadow: '0 0 50px rgba(255,0,0,0.2)'
            }}
          />
          {/* Sun */}
          <div 
            className={`sun absolute top-[30%] left-[48%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[28vw] ${getAnimationClass(2)}`}
            style={{ 
              zIndex: -1
            }}
          >
            {isSunHovered || activeElement === 'sun' ? (
              <Sun
                isHovered={isSunHovered}
                onMouseEnter={() => !activeElement && setIsSunHovered(true)}
                onMouseLeave={() => setIsSunHovered(false)}
                className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'sun' ? 'opacity-15 pointer-events-none' : ''}`}
                style={{ 
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => handleElementClick('sun', cardContent.sun)}
              />
            ) : (
              <SunOff
                isHovered={isSunHovered}
                onMouseEnter={() => !activeElement && setIsSunHovered(true)}
                onMouseLeave={() => setIsSunHovered(false)}
                className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'sun' ? 'opacity-15 pointer-events-none' : ''}`}
                style={{ 
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => handleElementClick('sun', cardContent.sun)}
              />
            )}
          </div>

          {isTempleHovered || activeElement === 'temple' ? (
            <Temple
              isHovered={isTempleHovered}
              onMouseEnter={() => !activeElement && setIsTempleHovered(true)}
              onMouseLeave={() => setIsTempleHovered(false)}
              className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'temple' ? 'opacity-15 pointer-events-none' : ''}`}
              style={{ 
                pointerEvents: 'visiblePainted'
              }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
            />
          ) : (
            <TempleOff
              isHovered={isTempleHovered}
              onMouseEnter={() => !activeElement && setIsTempleHovered(true)}
              onMouseLeave={() => setIsTempleHovered(false)}
              className={`object-contain cursor-pointer ${activeElement && activeElement !== 'temple' ? 'opacity-15 pointer-events-none' : ''}`}
              style={{ 
                pointerEvents: 'visiblePainted'
              }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
            />
          )}

          {/* Left Lamp Temple */}
          <div 
            className={`absolute left-[-13%] top-[52%] transform -translate-y-1/2 w-[40%] h-[40%] pendulum ${getAnimationClass(3)}`}
            style={{ 
              zIndex: 10
            }}
          >
            
            <Image
              src={isLeftLightHovered || activeElement === 'leftLight' ? "/assets/light-on.svg" : "/assets/light-off.svg"}
              alt="Light"
              fill
              priority
              className={`object-contain cursor-pointer scale-90 ${activeElement && activeElement !== 'leftLight' ? 'opacity-15 pointer-events-none' : ''}`}
              onMouseEnter={() => !activeElement && setIsLeftLightHovered(true)}
              onMouseLeave={() => setIsLeftLightHovered(false)}
              onClick={() => handleElementClick('leftLight', cardContent.leftLight)}
            />
          </div>
        </div>

        {/* Card */}
        {activeCard && (
          <div 
            className={`fixed top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] sm:w-[50%] md:w-[40%] lg:w-[35%] max-w-[500px] h-auto max-h-[90vh] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 z-50 bg-black/90 border border-red-500 ${getAnimationClass(1)}`}
          >
            <Card
              title={activeCard.title}
              description={activeCard.description}
              onClose={handleCloseCard}
              onExplore={handleExplore}
            />
          </div>
        )}

        {/* Bottom Left Flower */}
        <div 
          className={`${getElementClasses('flower', "flower absolute bottom-[-5%] left-[0%] transition-all duration-300 w-[20%] h-[40%]")} ${getAnimationClass(4)}`}
          style={{
            zIndex: 0
          }}
        >
          <Image
            src={isFlowerHovered || activeElement === 'flower' ? "/assets/flower.svg" : "/assets/flower-off.svg"}
            alt="Flower"
            fill
            priority
            className="object-contain cursor-pointer scale-140"
            onMouseEnter={() => !activeElement && setIsFlowerHovered(true)}
            onMouseLeave={() => setIsFlowerHovered(false)}
            onClick={() => handleElementClick('flower', cardContent.flower)}
          />
        </div>

        {/* Right Bottom Tree*/}
        <div 
          className={`${getElementClasses('tree', "tree absolute bottom-[0%] right-[6%] transition-all duration-300 w-[20%] h-[30%]")} ${getAnimationClass(5)}`}
        >
          <Image
            src={isTreeHovered || activeElement === 'tree' ? "/assets/tree.svg" : "/assets/tree-off.svg"}
            alt="Tree"
            fill
            priority
            className="object-contain cursor-pointer scale-300"
            onMouseEnter={() => !activeElement && setIsTreeHovered(true)}
            onMouseLeave={() => setIsTreeHovered(false)}
            onClick={() => handleElementClick('tree', cardContent.tree)}
          />
        </div>

        {/* Right Top Lights */}
        <div 
          className={`${getElementClasses('topRightLights', "absolute top-[0] right-[8%] w-[10%] h-[40%]")} ${getAnimationClass(6)}`}
        >
          <Image
            src={isTopRightLightsHovered || activeElement === 'topRightLights' ? "/assets/lights.svg" : "/assets/lights-off.svg"}
            alt="Lights"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto scale-140"
            onMouseEnter={() => !activeElement && setIsTopRightLightsHovered(true)}
            onMouseLeave={() => setIsTopRightLightsHovered(false)}
            onClick={() => handleElementClick('topRightLights', cardContent.topRightLights)}
          />
        </div>

        {/* Left Top Letters */}
        <div 
          className={`${getElementClasses('letters', "absolute top-[8%] left-[5%] w-[15%] h-[14%]")} ${getAnimationClass(6)}`}
        >
          <Image
            src={isLettersHovered || activeElement === 'letters' ? "/assets/letters.svg" : "/assets/letters-off.svg"}
            alt="Letters"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto scale-105"
            onMouseEnter={() => !activeElement && setIsLettersHovered(true)}
            onMouseLeave={() => setIsLettersHovered(false)}
            onClick={() => handleElementClick('letters', cardContent.letters)}
          />
        </div>
      </div>
    </div>
  );
} 
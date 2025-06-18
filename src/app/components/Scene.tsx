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
  const [isExiting, setIsExiting] = useState(false);
  const lastScrollY = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTimeRef = useRef(Date.now());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        if (rect.top >= 0) {
          setIsExiting(true);
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 200);
        }
      }
      
      const sceneSection = document.getElementById('scene-section');
      if (sceneSection) {
        const rect = sceneSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView && !isVisible) {
          setIsLeaving(false);
          setIsExiting(false);
          setIsVisible(true);
        } else if (!isInView && isVisible) {
          setIsLeaving(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 600);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
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

    const PARTICLE_COUNT = isMobile ? 50 : 100;
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
  }, [isVisible, isMobile]);

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
    <div id="scene-section" className={`bg-black h-screen relative ${isExiting ? 'fade-out-scene' : ''}`}>
      <div className="h-screen relative overflow-hidden" style={{ zIndex: 20 }}>
        {/* Canvas de partículas */}
        {isVisible && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 25 }}>
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              aria-hidden="true"
            />
          </div>
        )}
        {/* Temple */}
        <div
          className={`temple absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[90vw] sm:w-[48vw] md:w-[48vw] lg:w-[48vw] ${getAnimationClass(1)}`}
          style={{ zIndex: 21 }}
        >
          {/* Sun - Movido al principio para que esté detrás */}
          <div 
            className={`sun absolute top-[30%] left-[48%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[65vw] sm:w-[28vw] md:w-[28vw] lg:w-[28vw] ${getAnimationClass(2)}`}
            style={{ 
              zIndex: 1
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
                onClick={() => {}}
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
                onClick={() => {}}
              />
            )}
          </div>

          {/* Temple Shadow */}
          <div 
            className="absolute top-[100%] left-[50%] -translate-y-1/2 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[40vw] h-[5vw] rounded-[50%]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.1) 50%, rgba(255,0,0,0) 70%)',
              filter: 'blur(40px)',
              zIndex: 20,
              transform: 'translate(-50%, -50%) scale(1.5)',
              boxShadow: '0 0 50px rgba(255,0,0,0.2)'
            }}
          />

          {isTempleHovered || activeElement === 'temple' ? (
            <Temple
              isHovered={isTempleHovered}
              onMouseEnter={() => !activeElement && setIsTempleHovered(true)}
              onMouseLeave={() => setIsTempleHovered(false)}
              className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'temple' ? 'pointer-events-none' : ''}`}
              style={{ 
                pointerEvents: 'visiblePainted',
                position: 'relative',
                zIndex: 2
              }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
            />
          ) : (
            <TempleOff
              isHovered={isTempleHovered}
              onMouseEnter={() => !activeElement && setIsTempleHovered(true)}
              onMouseLeave={() => setIsTempleHovered(false)}
              className={`object-contain cursor-pointer ${activeElement && activeElement !== 'temple' ? 'pointer-events-none' : ''}`}
              style={{ 
                pointerEvents: 'visiblePainted',
                position: 'relative',
                zIndex: 2
              }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
            />
          )}

          {/* Left Lamp Temple */}
          <div 
            className={`absolute left-[-8%] sm:left-[-13%] md:left-[-13%] lg:left-[-13%] top-[55%] transform -translate-y-1/2 w-[45%] sm:w-[40%] md:w-[40%] lg:w-[40%] h-[45%] sm:h-[40%] md:h-[40%] lg:h-[40%] ${getAnimationClass(3)}`}
            style={{ 
              zIndex: 22
            }}
          >
            <div className="pendulum w-full h-full">
              <Image
                src={isLeftLightHovered || activeElement === 'leftLight' ? "/assets/light-on.svg" : "/assets/light-off.svg"}
                alt="Light"
                fill
                priority
                className={`object-contain cursor-pointer scale-90 ${activeElement && activeElement !== 'leftLight' ? 'pointer-events-none' : ''}`}
                onMouseEnter={() => !activeElement && setIsLeftLightHovered(true)}
                onMouseLeave={() => setIsLeftLightHovered(false)}
                onClick={() => handleElementClick('leftLight', cardContent.leftLight)}
              />
            </div>
          </div>
        </div>

        {/* Card */}
        {activeCard && (
          <div className="fixed top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
            <Card
              title={activeCard.title}
              description={activeCard.description}
              buttonText={activeCard.buttonText}
              onClose={handleCloseCard}
              onExplore={handleExplore}
            />
          </div>
        )}

        {/* Bottom Left Flower */}
        <div 
          className={`${getElementClasses('flower', "flower absolute bottom-[-20%] sm:bottom-[-5%] md:bottom-[-5%] lg:bottom-[-5%] left-[0%] transition-all duration-300 w-[35%] h-[55%] sm:w-[20%] sm:h-[40%] md:w-[20%] md:h-[40%] lg:w-[20%] lg:h-[40%]")} ${getAnimationClass(4)}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isFlowerHovered || activeElement === 'flower' ? "/assets/flower.svg" : "/assets/flower-off.svg"}
            alt="Flower"
            fill
            priority
            className="object-contain cursor-pointer scale-140 sm:scale-140 md:scale-140 lg:scale-140"
            onMouseEnter={() => !activeElement && setIsFlowerHovered(true)}
            onMouseLeave={() => setIsFlowerHovered(false)}
            onClick={() => handleElementClick('flower', cardContent.flower)}
          />
        </div>

        {/* Right Bottom Tree*/}
        <div 
          className={`${getElementClasses('tree', "tree absolute bottom-[-10%] right-[6%] transition-all duration-300 w-[25%] h-[35%] sm:w-[20%] sm:h-[30%] md:w-[20%] md:h-[30%] lg:w-[20%] lg:h-[30%]")} ${getAnimationClass(5)}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isTreeHovered || activeElement === 'tree' ? "/assets/tree.svg" : "/assets/tree-off.svg"}
            alt="Tree"
            fill
            priority
            className="object-contain cursor-pointer scale-300 sm:scale-300 md:scale-300 lg:scale-300"
            onMouseEnter={() => !activeElement && setIsTreeHovered(true)}
            onMouseLeave={() => setIsTreeHovered(false)}
            onClick={() => handleElementClick('tree', cardContent.tree)}
          />
        </div>

        {/* Right Top Lights */}
        <div 
          className={`${getElementClasses('topRightLights', "absolute top-[0] right-[8%] w-[15%] h-[50%] sm:w-[10%] sm:h-[40%] md:w-[10%] md:h-[40%] lg:w-[10%] lg:h-[40%]")} ${getAnimationClass(6)}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isTopRightLightsHovered || activeElement === 'topRightLights' ? "/assets/lights.svg" : "/assets/lights-off.svg"}
            alt="Lights"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto scale-140 sm:scale-140 md:scale-140 lg:scale-140"
            onMouseEnter={() => !activeElement && setIsTopRightLightsHovered(true)}
            onMouseLeave={() => setIsTopRightLightsHovered(false)}
            onClick={() => handleElementClick('topRightLights', cardContent.topRightLights)}
          />
        </div>

        {/* Left Top Letters */}
        <div 
          className={`${getElementClasses('letters', "absolute top-[8%] left-[5%] w-[30%] h-[22%] sm:w-[15%] sm:h-[14%] md:w-[15%] md:h-[14%] lg:w-[15%] lg:h-[14%]")} ${getAnimationClass(6)}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isLettersHovered || activeElement === 'letters' ? "/assets/letters.svg" : "/assets/letters-off.svg"}
            alt="Letters"
            fill
            priority
            className="object-contain cursor-pointer w-full h-auto scale-105 sm:scale-105 md:scale-105 lg:scale-105"
            onMouseEnter={() => !activeElement && setIsLettersHovered(true)}
            onMouseLeave={() => setIsLettersHovered(false)}
            onClick={() => handleElementClick('letters', cardContent.letters)}
          />
        </div>
      </div>
    </div>
  );
} 
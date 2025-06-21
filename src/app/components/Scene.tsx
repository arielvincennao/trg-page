'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SunOff from "./assets/SunOff";
import Sun from "./assets/Sun";
import TempleOff from "./assets/TempleOff";
import Temple from './assets/Temple';
import Card from './Card';
import { cardContent, CardContent } from '../data/cardContent';

interface SceneProps {
  show: boolean;
  transitioning: boolean;
  onBack: () => void;
}

type Particle = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  speed: number;
  opacity: number;
  targetOpacity: number;
  delay: number;
};

const Scene: React.FC<SceneProps> = ({ show, transitioning, onBack }) => {
  // const [isSunHovered, setIsSunHovered] = useState(false); // <--- COMENTADO
  const [isTempleHovered, setIsTempleHovered] = useState(false);
  const [isLeftLightHovered, setIsLeftLightHovered] = useState(false);
  const [isFlowerHovered, setIsFlowerHovered] = useState(false);
  const [isTreeHovered, setIsTreeHovered] = useState(false);
  const [isTopRightLightsHovered, setIsTopRightLightsHovered] = useState(false);
  const [isLettersHovered, setIsLettersHovered] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<CardContent | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!show) return;
    // Inicializar partículas al montar el componente
    const width = window.innerWidth;
    const height = window.innerHeight;
    const PARTICLE_COUNT = isMobile ? 36 : 72;
    const INITIAL_DELAY = 2000; // 2 segundos de delay inicial
    const now = Date.now();
    let particlesArr: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      opacity: 0,
      targetOpacity: 0.1 + Math.random() * 0.3,
      delay: now + INITIAL_DELAY
    }));
    setParticles(particlesArr);

    let animationId: number;
    function animate() {
      const now = Date.now();
      const width = window.innerWidth;
      const height = window.innerHeight;
      particlesArr = particlesArr.map(p => {
        // Fade-in según delay y targetOpacity
        let opacity = p.opacity;
        if (now > p.delay && opacity < p.targetOpacity) {
          opacity = Math.min(p.targetOpacity, opacity + 0.02);
        }
        // Movimiento
        let nx = p.x + p.dx;
        let ny = p.y + p.dy;
        if (nx < 0) { nx = 0; p.dx = Math.abs(p.dx); }
        if (nx > width) { nx = width; p.dx = -Math.abs(p.dx); }
        if (ny < 0) { ny = 0; p.dy = Math.abs(p.dy); }
        if (ny > height) { ny = height; p.dy = -Math.abs(p.dy); }
        // Variación aleatoria
        let ndx = p.dx + (Math.random() - 0.5) * 0.1;
        let ndy = p.dy + (Math.random() - 0.5) * 0.1;
        // Limitar velocidad
        const maxSpeed = 1;
        const currentSpeed = Math.sqrt(ndx * ndx + ndy * ndy);
        if (currentSpeed > maxSpeed) {
          ndx = (ndx / currentSpeed) * maxSpeed;
          ndy = (ndy / currentSpeed) * maxSpeed;
        }
        return { ...p, x: nx, y: ny, dx: ndx, dy: ndy, opacity };
      });
      setParticles([...particlesArr]);
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isMobile, show]);

  // Wheel listener para volver de la sección 2 (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!show || transitioning) return;
      if (e.deltaY < 0) {
        onBack();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [show, transitioning, onBack]);

  // Touch listener para volver de la sección 2 (mobile)
  useEffect(() => {
    let lastY: number | null = null;
    const handleTouchStart = (e: TouchEvent) => {
      if (!show || transitioning) return;
      lastY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!show || transitioning || lastY === null) return;
      const currentY = e.touches[0].clientY;
      if (currentY - lastY > 20) {
        onBack();
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [show, transitioning, onBack]);

  if (!show) return null;

  // ---
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

  // Determinar clase de animación de salida
  const fadeOut = !show && transitioning;

  return (
    <div
      id="scene-section"
      className={`h-screen relative${fadeOut ? ' fade-out-scene' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 20,
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.4s',
        pointerEvents: transitioning ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      <div className="h-screen relative overflow-hidden" style={{ zIndex: 20 }}>
        {/* Canvas de partículas DOM animadas */}
        <div className="absolute inset-0 pointer-events-none z-[25]">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                width: particle.r * 2,
                height: particle.r * 2,
                left: particle.x,
                top: particle.y,
                opacity: particle.opacity,
                background: '#fff',
                boxShadow: '0 0 4px 1px #fff',
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
        {/* Temple */}
        <div
          className="temple absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[48vw] md:w-[48vw] lg:w-[48vw] fade-in-up fade-in-up-delay-1"
          style={{ zIndex: 21 }}
        >
          {/* Sun */}
          <div
            className="sun absolute top-[40%] left-[48%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[65vw] sm:w-[28vw] md:w-[28vw] lg:w-[28vw] fade-in-up fade-in-up-delay-2"
            style={{
              zIndex: 0
            }}
          >
            {/*
            {isSunHovered || activeElement === 'sun' ? (
              <Sun
                isHovered={isSunHovered}
                onMouseEnter={() => !activeElement && setIsSunHovered(true)}
                onMouseLeave={() => setIsSunHovered(false)}
                className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'sun' ? 'opacity-15 pointer-events-none' : ''}`}
                style={{
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => { }}
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
                onClick={() => { }}
              />
            )}
            */}
            {/* Sun */}
            {activeElement === 'sun' ? (
              <Sun
                className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'sun' ? 'opacity-15 pointer-events-none' : ''}`}
                style={{
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => { }}
                isHovered={undefined}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              />
            ) : (
              <SunOff
                className={`object-contain cursor-pointer w-full h-auto ${activeElement && activeElement !== 'sun' ? 'opacity-15 pointer-events-none' : ''}`}
                style={{
                  pointerEvents: 'visiblePainted'
                }}
                onClick={() => { }}
                isHovered={undefined}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              />
            )}
          </div>

          {/* Temple Shadow */}
          <div
            className="absolute top-[100%] left-[12%] -translate-y-1/2 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[40vw] h-[5vw] rounded-[50%] fade-in-up fade-in-up-delay-3"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.1) 50%, rgba(255,0,0,0) 70%)',
              filter: 'blur(40px)',
              zIndex: 20,
              transform: 'translate(-50%, -50%) scale(1.5)',
              boxShadow: '0 0 50px rgba(255,0,0,0.2)'
            }}
          />

          {/* Temple */}
          <div
            className={`transform origin-center transition-all duration-500 ${(activeElement === 'temple') ? 'scale-110' : 'scale-100'}`}
            onMouseEnter={() => !activeElement && setIsTempleHovered(true)}
            onMouseLeave={() => setIsTempleHovered(false)}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}
          >
            {isTempleHovered || activeElement === 'temple' ? (
              <Temple
                isHovered={isTempleHovered}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
                className={`object-contain cursor-pointer w-full h-auto ${(isTempleHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'temple' ? 'opacity-15 pointer-events-none' : ''}`}
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
                onMouseEnter={undefined}
                onMouseLeave={undefined}
                className={`object-contain cursor-pointer w-full h-auto ${(isTempleHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'temple' ? 'opacity-15 pointer-events-none' : ''}`}
                style={{
                  pointerEvents: 'visiblePainted',
                  position: 'relative',
                  zIndex: 2
                }}
                onClick={() => handleElementClick('temple', cardContent.temple)}
              />
            )}
          </div>

          {/* Left Lamp Temple */}
          <div
            className={`absolute left-[-27%] sm:left-[-22%] md:left-[-22%] lg:left-[-22%] top-[60%] transform -translate-y-1/2 w-[45%] sm:w-[40%] md:w-[40%] lg:w-[40%] h-[45%] sm:h-[40%] md:h-[40%] lg:h-[40%]`}
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
                className={`object-contain cursor-pointer transform origin-center transition-transform duration-300 ${(activeElement === 'leftLight') ? 'scale-105 sm:scale-105 md:scale-105 lg:scale-105' : 'scale-90 sm:scale-90 md:scale-90 lg:scale-90'} ${(isLeftLightHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'leftLight' ? 'opacity-15 pointer-events-none' : ''}`}
                onMouseEnter={() => !activeElement && setIsLeftLightHovered(true)}
                onMouseLeave={() => setIsLeftLightHovered(false)}
                onClick={() => handleElementClick('leftLight', cardContent.leftLight)}
              />
            </div>
          </div>
        </div>

        {activeCard && (
          <div className="fixed top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] w-full px-2 sm:px-0 max-w-[95vw] sm:max-w-[420px]">
            <Card
              title={activeCard.title}
              description={activeCard.description}
              buttonText={activeCard.buttonText}
              links={activeCard.links}
              onClose={handleCloseCard}
              onExplore={handleExplore}
            />
          </div>
        )}

        {/* Bottom Left Flower */}
        <div
          className={`${getElementClasses('flower', "flower absolute bottom-[-22%] sm:bottom-[-10%] md:bottom-[-8%] lg:bottom-[-8%] left-[-8%] sm:left-[0%] md:left-[-2%] lg:left-[-2%] transition-all duration-300 w-[35%] h-[55%] sm:w-[20%] sm:h-[40%] md:w-[20%] md:h-[40%] lg:w-[20%] lg:h-[40%] fade-in-up fade-in-up-delay-4")}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isFlowerHovered || activeElement === 'flower' ? "/assets/flower.svg" : "/assets/flower-off.svg"}
            alt="Flower"
            fill
            priority
            className={`object-contain cursor-pointer transition-transform duration-300 ${(activeElement === 'flower') ? 'scale-160 sm:scale-160 md:scale-160 lg:scale-160' : 'scale-140 sm:scale-140 md:scale-140 lg:scale-140'} ${(isFlowerHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'flower' ? 'opacity-15 pointer-events-none' : ''}`}
            onMouseEnter={() => !activeElement && setIsFlowerHovered(true)}
            onMouseLeave={() => setIsFlowerHovered(false)}
            onClick={() => handleElementClick('flower', cardContent.flower)}
          />
        </div>

        {/* Right Bottom Tree*/}
        <div
          className={`${getElementClasses('tree', "tree absolute bottom-[-15%] sm:bottom-[-14%] md:bottom-[-11%] lg:bottom-[-11%] right-[-2%] sm:right-[8%] md:right-[8%] lg:right-[8%] transition-all duration-300 w-[25%] h-[35%] sm:w-[20%] sm:h-[30%] md:w-[20%] md:h-[30%] lg:w-[20%] lg:h-[30%] z-10 sm:z-[21] md:z-[21] lg:z-[21] fade-in-up fade-in-up-delay-5")}`}
          style={{}}
        >
          <Image
            src={isTreeHovered || activeElement === 'tree' ? "/assets/tree.svg" : "/assets/tree-off.svg"}
            alt="Tree"
            fill
            priority
            className={`object-contain cursor-pointer transform origin-center transition-transform duration-300 ${(activeElement === 'tree') ? 'scale-350 sm:scale-350 md:scale-350 lg:scale-350' : 'scale-320 sm:scale-320 md:scale-320 lg:scale-320'} ${(isTreeHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'tree' ? 'opacity-15 pointer-events-none' : ''}`}
            onMouseEnter={() => !activeElement && setIsTreeHovered(true)}
            onMouseLeave={() => setIsTreeHovered(false)}
            onClick={() => handleElementClick('tree', cardContent.tree)}
          />
        </div>

        {/* Right Top Lights */}
        <div
          className={`${getElementClasses('topRightLights', "pointer-events-none absolute top-[-10%] sm:top-[-12%] md:top-[-20%] lg:top-[-20%] right-[12%] w-[16%] h-[40%] sm:w-[12%] sm:h-[45%] md:w-[12%] md:h-[45%] lg:w-[12%] lg:h-[45%] fade-in-up fade-in-up-delay-6")}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isTopRightLightsHovered || activeElement === 'topRightLights' ? "/assets/lights.svg" : "/assets/lights-off.svg"}
            alt="Lights"
            fill
            priority
            className={`pointer-events-auto object-contain cursor-pointer transform origin-center transition-transform duration-300 ${(activeElement === 'topRightLights') ? 'scale-180 sm:scale-180 md:scale-180 lg:scale-180' : 'scale-160 sm:scale-160 md:scale-160 lg:scale-160'} ${(isTopRightLightsHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'topRightLights' ? 'opacity-15 pointer-events-none' : ''}`}
            onMouseEnter={() => !activeElement && setIsTopRightLightsHovered(true)}
            onMouseLeave={() => setIsTopRightLightsHovered(false)}
            onClick={() => handleElementClick('topRightLights', cardContent.topRightLights)}
          />
        </div>

        {/* Left Top Letters */}
        <div
          className={`${getElementClasses('letters', "absolute top-[8%] left-[5%] w-[30%] h-[22%] sm:w-[15%] sm:h-[14%] md:w-[15%] md:h-[14%] lg:w-[15%] lg:h-[14%] flex justify-center items-center fade-in-up fade-in-up-delay-7")}`}
          style={{
            zIndex: 21
          }}
        >
          <Image
            src={isLettersHovered || activeElement === 'letters' ? "/assets/letters.svg" : "/assets/letters-off.svg"}
            alt="Letters"
            fill
            priority
            className={`object-contain cursor-pointer transform origin-center transition-transform duration-300 ${(activeElement === 'letters') ? 'scale-120 sm:scale-120 md:scale-120 lg:scale-120' : 'scale-105 sm:scale-105 md:scale-105 lg:scale-105'} ${(isLettersHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'letters' ? 'opacity-15 pointer-events-none' : ''}`}
            onMouseEnter={() => !activeElement && setIsLettersHovered(true)}
            onMouseLeave={() => setIsLettersHovered(false)}
            onClick={() => handleElementClick('letters', cardContent.letters)}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene; 
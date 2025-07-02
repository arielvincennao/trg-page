'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import SunOff from "./assets/SunOff";
import Sun from "./assets/Sun";
import TempleOff from "./assets/TempleOff";
import Temple from './assets/Temple';
import Card from './Card';
import { cardContent, CardContent } from '../data/cardContent';
import ParticlesDOM from './ParticlesDOM';

interface SceneProps {
  show: boolean;
  transitioning: boolean;
  onBack: () => void;
}

const Scene: React.FC<SceneProps> = ({ show, transitioning, onBack }) => {

  const [isTempleHovered, setIsTempleHovered] = React.useState(false);
  const [isLeftLightHovered, setIsLeftLightHovered] = React.useState(false);
  const [isFlowerHovered, setIsFlowerHovered] = React.useState(false);
  const [isTreeHovered, setIsTreeHovered] = React.useState(false);
  const [isTopRightLightsHovered, setIsTopRightLightsHovered] = React.useState(false);
  const [isLettersHovered, setIsLettersHovered] = React.useState(false);
  const [activeElement, setActiveElement] = React.useState<string | null>(null);
  const [activeCard, setActiveCard] = React.useState<CardContent | null>(null);
  const [customCursor, setCustomCursor] = React.useState({ visible: false, x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = React.useState(true);

  // Detect if desktop
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Wheel listener to return from section 2 (desktop)
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!show || transitioning) return;
      if (e.deltaY < 0) {
        onBack();
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [show, transitioning, onBack]);

  // Touch listener to return from section 2 (mobile)
  React.useEffect(() => {
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

  // Handle custom cursor
  useEffect(() => {
    if (!customCursor.visible || !isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCustomCursor(c => ({ ...c, x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [customCursor.visible, isDesktop]);

  // Functions to show/hide custom cursor
  const showSeeMoreCursor = () => { if (isDesktop) setCustomCursor(c => ({ ...c, visible: true })); };
  const hideSeeMoreCursor = () => setCustomCursor(c => ({ ...c, visible: false }));

  if (!show) return null;

  // ---
  const handleCloseCard = () => {
    setActiveCard(null);
    setActiveElement(null);
    setIsTempleHovered(false);
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

  // Determine exit animation class
  const fadeOut = !show && transitioning;

  return (
    <div
      id="scene-section"
      className={`scene-section-container h-screen relative${fadeOut ? ' fade-out-scene' : ''} ${customCursor.visible ? 'scene-see-more-cursor' : ''}`}
      style={{
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.09s',
        pointerEvents: transitioning ? 'none' : 'auto',
      }}
    >
      {/* Scene cursor */}
      {customCursor.visible && isDesktop && (
        <div
          className="scene-see-more-cursor-wrapper"
          style={{ transform: `translate3d(${customCursor.x}px, ${customCursor.y}px, 0)` }}
        >
          <div className="scene-see-more-cursor-label">See more</div>
        </div>
      )}
      <div className="h-screen relative overflow-hidden scene-inner-container">
        {/* Animated DOM particles canvas */}
        <ParticlesDOM countMobile={12} countDesktop={72} zIndexClass="z-[25]" />
        {/* Temple */}
        <div
          className="temple absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[48vw] md:w-[48vw] lg:w-[48vw] fade-in-up fade-in-up-delay-1 scene-temple"
        >
          {/* Sun */}
          <div
            className="sun absolute top-[40%] left-[48%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 w-[65vw] sm:w-[28vw] md:w-[28vw] lg:w-[28vw] fade-in-up fade-in-up-delay-2 scene-sun"
            onMouseEnter={showSeeMoreCursor}
            onMouseLeave={hideSeeMoreCursor}
          >
            {/* Sun */}
            {activeElement === 'sun' ? (
              <Sun
                className={`object-contain${activeElement && activeElement !== 'sun' ? ' opacity-15 pointer-events-none' : ''} w-full h-auto scene-sun-element`}
                style={{}}
                onClick={() => { }}
                isHovered={undefined}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              />
            ) : (
              <SunOff
                className={`object-contain${activeElement && activeElement !== 'sun' ? ' opacity-15 pointer-events-none' : ''} w-full h-auto scene-sun-element`}
                style={{}}
                onClick={() => { }}
                isHovered={undefined}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
              />
            )}
          </div>

          {/* Temple Shadow */}
          <div
            className="absolute top-[100%] left-[12%] -translate-y-1/2 w-[70vw] sm:w-[40vw] md:w-[40vw] lg:w-[40vw] h-[5vw] rounded-[50%] fade-in-up fade-in-up-delay-3 scene-temple-shadow"
          />

          {/* Temple */}
          <div
            className={`transform origin-center transition-all duration-500 scene-temple-container ${(activeElement === 'temple') ? 'scale-115' : 'scale-100'} ${(!activeElement || isTempleHovered) ? 'scene-temple-container-pointer' : 'scene-temple-container-default'} h-[40%]`}
            style={{position: 'relative'}}
          >
            {/* Temple area hitboxes */}
            <div
              className="temple-hitbox temple-hitbox-left"
              onMouseEnter={() => { if (!activeElement) { setIsTempleHovered(true); } showSeeMoreCursor(); }}
              onMouseLeave={() => { setIsTempleHovered(false); hideSeeMoreCursor(); }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
              style={{ pointerEvents: 'auto', cursor: (!activeElement || isTempleHovered) ? 'pointer' : 'default' }}
            />
            <div
              className="temple-hitbox temple-hitbox-right"
              onMouseEnter={() => { if (!activeElement) { setIsTempleHovered(true); } showSeeMoreCursor(); }}
              onMouseLeave={() => { setIsTempleHovered(false); hideSeeMoreCursor(); }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
              style={{ pointerEvents: 'auto', cursor: (!activeElement || isTempleHovered) ? 'pointer' : 'default' }}
            />
            <div
              className="temple-hitbox temple-hitbox-top"
              onMouseEnter={() => { if (!activeElement) { setIsTempleHovered(true); } showSeeMoreCursor(); }}
              onMouseLeave={() => { setIsTempleHovered(false); hideSeeMoreCursor(); }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
              style={{ pointerEvents: 'auto', cursor: (!activeElement || isTempleHovered) ? 'pointer' : 'default' }}
            />
            <div
              className="temple-hitbox temple-hitbox-mid"
              onMouseEnter={() => { if (!activeElement) { setIsTempleHovered(true); } showSeeMoreCursor(); }}
              onMouseLeave={() => { setIsTempleHovered(false); hideSeeMoreCursor(); }}
              onClick={() => handleElementClick('temple', cardContent.temple)}
              style={{ pointerEvents: 'auto', cursor: (!activeElement || isTempleHovered) ? 'pointer' : 'default' }}
            />
            {isTempleHovered || activeElement === 'temple' ? (
              <Temple
                isHovered={isTempleHovered}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
                className={`object-contain${activeElement && activeElement !== 'temple' ? ' opacity-15 pointer-events-none' : ''} w-full h-auto scene-temple-element ${(isTempleHovered && !activeElement) ? 'brightness-125' : ''}`}
                style={{}}
                onClick={undefined}
              />
            ) : (
              <TempleOff
                isHovered={isTempleHovered}
                onMouseEnter={undefined}
                onMouseLeave={undefined}
                className={`object-contain${activeElement && activeElement !== 'temple' ? ' opacity-15 pointer-events-none' : ''} w-full h-auto scene-temple-element ${(isTempleHovered && !activeElement) ? 'brightness-125' : ''}`}
                style={{}}
                onClick={undefined}
              />
            )}
          </div>

          {/* Left Lamp Temple */}
          <div className="absolute left-[0%] top-[60%] transform -translate-y-1/2 w-[20%] h-[45%] scene-left-lamp">
            <div className="pendulum w-full h-full relative">
              <div className="absolute left-[-55%] top-1/2 -translate-y-1/2 w-full h-full z-10 pointer-events-none">
                <Image
                  src={isLeftLightHovered || activeElement === 'leftLight' ? "/assets/light-on.svg" : "/assets/light-off.svg"}
                  alt="Light"
                  fill
                  priority
                  className={`object-contain transform origin-center transition-transform duration-300 ${(activeElement === 'leftLight') ? 'scale-175' : 'scale-160'} ${(isLeftLightHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'leftLight' ? 'opacity-15' : ''}`}
                />
              </div>
              <div
                className="relative w-full h-full z-20 pointer-events-auto cursor-pointer"
                onMouseEnter={() => { if (!activeElement) { setIsLeftLightHovered(true); } showSeeMoreCursor(); }}
                onMouseLeave={() => { setIsLeftLightHovered(false); hideSeeMoreCursor(); }}
                onClick={() => handleElementClick('leftLight', cardContent.leftLight)}
              />
            </div>
          </div>
        </div>

        {activeCard && (
          <>
            <div className="fixed inset-0 z-[999]" onClick={handleCloseCard} />
            <div className="fixed top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] w-full px-2 sm:px-0 max-w-[95vw] sm:max-w-[420px]">
              <div onClick={e => e.stopPropagation()}>
                <Card
                  title={activeCard.title}
                  description={activeCard.description}
                  buttonText={activeCard.buttonText}
                  links={activeCard.links}
                  onClose={handleCloseCard}
                  onExplore={handleExplore}
                />
              </div>
            </div>
          </>
        )}

        {/* Bottom Left Flower */}
        <div
          className={`${getElementClasses('flower', "flower absolute bottom-[-7%] sm:bottom-[-10%] md:bottom-[-8%] lg:bottom-[-8%] left-[-8%] sm:left-[0%] md:left-[-2%] lg:left-[-2%] transition-all duration-300 w-[35%] h-[32%] sm:w-[20%] sm:h-[40%] md:w-[20%] md:h-[40%] lg:w-[20%] lg:h-[40%] fade-in-up fade-in-up-delay-4 scene-flower cursor-pointer")}`}
          onMouseEnter={() => { if (!activeElement) { setIsFlowerHovered(true); } showSeeMoreCursor(); }}
          onMouseLeave={() => { setIsFlowerHovered(false); hideSeeMoreCursor(); }}
        >
          <Image
            src={isFlowerHovered || activeElement === 'flower' ? "/assets/flower.svg" : "/assets/flower-off.svg"}
            alt="Flower"
            fill
            priority
            className={`object-contain${activeElement && activeElement !== 'flower' ? ' opacity-15 pointer-events-none' : ''} transition-transform duration-300 ${(activeElement === 'flower') ? 'scale-155 sm:scale-155 md:scale-155 lg:scale-155' : 'scale-140 sm:scale-140 md:scale-140 lg:scale-140'} ${(isFlowerHovered && !activeElement) ? 'brightness-125' : ''}`}
            onMouseEnter={() => !activeElement && setIsFlowerHovered(true)}
            onMouseLeave={() => setIsFlowerHovered(false)}
            onClick={() => handleElementClick('flower', cardContent.flower)}
          />
        </div>

        {/* Right Bottom Tree*/}
        <div className="absolute bottom-[-7%] sm:bottom-[-14%] md:bottom-[-11%] lg:bottom-[-11%] right-[-2%] sm:right-[8%] md:right-[8%] lg:right-[8%] w-[32%] h-[38%] sm:w-[26%] sm:h-[48%] md:w-[26%] md:h-[48%] lg:w-[26%] lg:h-[48%] z-[21] fade-in-up fade-in-up-delay-5 scene-tree">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src={isTreeHovered || activeElement === 'tree' ? "/assets/tree.svg" : "/assets/tree-off.svg"}
              alt="Tree"
              fill
              priority
              className={`object-contain transform origin-center transition-transform duration-300 ${(activeElement === 'tree') ? 'scale-215' : 'scale-200'} ${(isTreeHovered && !activeElement) ? 'brightness-125' : ''} ${activeElement && activeElement !== 'tree' ? 'opacity-15' : ''}`}
            />
          </div>
          <div
            className="relative w-full h-full z-20 pointer-events-auto cursor-pointer"
            onMouseEnter={() => { if (!activeElement) { setIsTreeHovered(true); } showSeeMoreCursor(); }}
            onMouseLeave={() => { setIsTreeHovered(false); hideSeeMoreCursor(); }}
            onClick={() => handleElementClick('tree', cardContent.tree)}
          />
        </div>

        {/* Right Top Lights */}
        <div
          className={`${getElementClasses('topRightLights', "pointer-events-none absolute top-[-10%] sm:top-[-12%] md:top-[-20%] lg:top-[-20%] right-[12%] w-[16%] h-[40%] sm:w-[12%] sm:h-[45%] md:w-[12%] md:h-[45%] lg:w-[12%] lg:h-[45%] fade-in-up fade-in-up-delay-6 scene-top-right-lights cursor-pointer")}`}
          onMouseEnter={() => { if (!activeElement) { setIsTopRightLightsHovered(true); } showSeeMoreCursor(); }}
          onMouseLeave={() => { setIsTopRightLightsHovered(false); hideSeeMoreCursor(); }}
        >
          <Image
            src={isTopRightLightsHovered || activeElement === 'topRightLights' ? "/assets/lights.svg" : "/assets/lights-off.svg"}
            alt="Lights"
            fill
            priority
            className={`pointer-events-auto object-contain${activeElement && activeElement !== 'topRightLights' ? ' opacity-15 pointer-events-none' : ''} transform origin-center transition-transform duration-300 ${(activeElement === 'topRightLights') ? 'scale-175 sm:scale-175 md:scale-175 lg:scale-175' : 'scale-160 sm:scale-160 md:scale-160 lg:scale-160'} ${(isTopRightLightsHovered && !activeElement) ? 'brightness-125' : ''}`}
            onMouseEnter={() => !activeElement && setIsTopRightLightsHovered(true)}
            onMouseLeave={() => setIsTopRightLightsHovered(false)}
            onClick={() => handleElementClick('topRightLights', cardContent.topRightLights)}
          />
        </div>

        {/* Left Top Letters */}
        <div className={`${getElementClasses('letters', "absolute top-[12%] left-[3%] w-[18%] h-[18%] sm:w-[10%] sm:h-[12%] md:w-[10%] md:h-[12%] lg:w-[10%] lg:h-[12%] flex justify-center items-center fade-in-up fade-in-up-delay-7 scene-letters")}`}>
          <div className="absolute left-[140%] sm:left-[120%] md:left-[120%] lg:left-[120%] top-[85%] sm:top-[70%] md:top-[70%] lg:top-[70%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[36vw] sm:w-[20vw] sm:h-[18vw] md:w-[20vw] md:h-[18vw] lg:w-[20vw] lg:h-[18vw] pointer-events-none">
            <Image
              src={isLettersHovered || activeElement === 'letters' ? "/assets/letters.svg" : "/assets/letters-off.svg"}
              alt="Letters"
              fill
              priority
              className={`object-contain transform origin-center transition-transform duration-300 ${(activeElement === 'letters') ? 'scale-115' : 'scale-100'}`}
            />
          </div>
          <div
            className="relative w-full h-full z-20 pointer-events-auto cursor-pointer"
            onMouseEnter={() => { if (!activeElement) { setIsLettersHovered(true); } showSeeMoreCursor(); }}
            onMouseLeave={() => { setIsLettersHovered(false); hideSeeMoreCursor(); }}
            onClick={() => handleElementClick('letters', cardContent.letters)}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene; 
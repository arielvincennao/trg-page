'use client';
import React, { useRef, useState, useEffect } from 'react';
import Temple from '../components/assets/Temple';
//import TempleOff from '../components/assets/TempleOff';
//import Sun from '../components/assets/Sun';
//import SunOff from '../components/assets/SunOff';
import Image from 'next/image';

const TEXT = 'We advance security and education in the crypto ecosystem with research, tools and resources for the public benefit.';
const COLOR_START = { r: 255, g: 255, b: 255 };
const COLOR_END = { r: 247, g: 57, b: 47 }; // Rojo
const TRANSITION_SCROLL = 500;

function lerpColor(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

export default function TestPage() {
  const [progress, setProgress] = useState(0); // 0 a 1
  const [showSection2, setShowSection2] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [blockScroll, setBlockScroll] = useState(false);
  const [showSection1, setShowSection1] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll listener para animar texto
  useEffect(() => {
    const handleScroll = () => {
      if (showSection2 || transitioning || blockScroll) return;

      const scroll = window.scrollY;
      const p = Math.min(scroll / TRANSITION_SCROLL, 1);
      setProgress(p);

      if (p === 1 && !showSection2) {
        setTransitioning(true);
        setBlockScroll(true);
        setTimeout(() => {
          setShowSection2(true);
          setTransitioning(false);
          setBlockScroll(false);
          window.scrollTo({ top: 0, behavior: 'auto' });
        }, 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSection2, transitioning, blockScroll]);

  // Wheel listener para volver de la sección 2 (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!showSection2 || transitioning || blockScroll) return;

      if (e.deltaY < 0) {
        setTransitioning(true);
        setBlockScroll(true);
        setTimeout(() => {
          setShowSection2(false);
          setShowSection1(false);
          setProgress(0);
          setResetKey(k => k + 1);
          window.scrollTo({ top: 0, behavior: 'auto' });
          setTimeout(() => {
            setShowSection1(true);
            setTransitioning(false);
            setBlockScroll(false);
          }, 100);
        }, 400);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [showSection2, transitioning, blockScroll]);

  // Touch listener para volver de la sección 2 (mobile)
  useEffect(() => {
    let lastY = null as number | null;
    const handleTouchStart = (e: TouchEvent) => {
      if (!showSection2 || transitioning || blockScroll) return;
      lastY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!showSection2 || transitioning || blockScroll || lastY === null) return;
      const currentY = e.touches[0].clientY;
      if (currentY - lastY > 20) { // swipe hacia abajo
        setTransitioning(true);
        setBlockScroll(true);
        setTimeout(() => {
          setShowSection2(false);
          setShowSection1(false);
          setProgress(0);
          setResetKey(k => k + 1);
          window.scrollTo({ top: 0, behavior: 'auto' });
          setTimeout(() => {
            setShowSection1(true);
            setTransitioning(false);
            setBlockScroll(false);
          }, 100);
        }, 400);
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showSection2, transitioning, blockScroll]);

  // Bloqueo de scroll del body
  useEffect(() => {
    document.body.style.overflow = transitioning || blockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [transitioning, blockScroll]);

  // Renderizado de texto animado
  const letters = TEXT.split('').map((char, i) => {
    const t = Math.max(0, Math.min(1, progress * TEXT.length - i));
    const color = lerpColor(COLOR_START, COLOR_END, t);
    return (
      <span
        key={`${i}-${resetKey}`}
        style={{
          color: `rgb(${color.r},${color.g},${color.b})`,
          transition: 'color 0.3s',
          fontFamily: 'var(--font-poppins)',
          fontWeight: 600,
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          letterSpacing: '0.04em',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    );
  });

  return (
    <div ref={scrollContainerRef} style={{ minHeight: '200vh', background: '#000', position: 'relative' }}>
      {/* Sección 1 */}
      {showSection1 && (
        <section
          className={resetKey > 0 ? 'fade-in-up' : ''}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: !showSection2 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            zIndex: 10,
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.4s',
            pointerEvents: transitioning ? 'none' : 'auto',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 800,
            gap: 32,
          }}>
            <div style={{
              width: 169,
              height: 169,
              position: 'relative',
              flexShrink: 0,
              marginBottom: 16,
            }}>
              <img
                src="/assets/trg-logo.svg"
                alt="TRG Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <h1
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                textAlign: 'center',
                width: '100vw',
                maxWidth: 1200,
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontFamily: 'var(--font-poppins)',
                fontWeight: 600,
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                {letters}
              </div>
            </h1>
          </div>
        </section>
      )}

      {/* Sección 2 */}
      {showSection2 && (
        <section
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            zIndex: 20,
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.4s',
            pointerEvents: transitioning ? 'none' : 'auto',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* Temple y Sun */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '48vw', maxWidth: 700, zIndex: 21 }}>
              {/* Temple Shadow */}
              <div className="fade-in-up fade-in-up-delay-2" style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                width: '40vw',
                height: '5vw',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.3) 0%, rgba(255,0,0,0.1) 50%, rgba(255,0,0,0) 70%)',
                filter: 'blur(40px)',
                zIndex: 20,
                transform: 'translate(-50%, -50%) scale(1.5)',
                boxShadow: '0 0 50px rgba(255,0,0,0.2)'
              }} />
              {/* Temple */}
              <div className="fade-in-up fade-in-up-delay-3" style={{ position: 'relative', zIndex: 1 }}>
                <Temple className="" style={{ zIndex: 1, position: 'relative' }} onClick={() => {}} isHovered={false} onMouseEnter={() => {}} onMouseLeave={() => {}} />
              </div>
              {/* Left Lamp Temple */}
              <div className="fade-in-up fade-in-up-delay-4" style={{ position: 'absolute', left: '-22%', top: '60%', transform: 'translateY(-50%)', width: '40%', height: '40%', zIndex: 22 }}>
                <Image src="/assets/light-off.svg" alt="Light" fill priority style={{ objectFit: 'contain' }} />
              </div>
            </div>
            {/* Bottom Left Flower */}
            <div className="fade-in-up fade-in-up-delay-5" style={{ position: 'absolute', bottom: '-10%', left: '0%', width: '20%', height: '40%', zIndex: 21 }}>
              <Image src="/assets/flower-off.svg" alt="Flower" fill priority style={{ objectFit: 'contain' }} />
            </div>
            {/* Right Bottom Tree */}
            <div className="fade-in-up fade-in-up-delay-6" style={{ position: 'absolute', bottom: '-11%', right: '8%', width: '20%', height: '30%', zIndex: 21 }}>
              <Image src="/assets/tree-off.svg" alt="Tree" fill priority style={{ objectFit: 'contain' }} />
            </div>
            {/* Right Top Lights */}
            <div className="fade-in-up fade-in-up-delay-2" style={{ position: 'absolute', top: '-20%', right: '12%', width: '12%', height: '45%', zIndex: 21 }}>
              <Image src="/assets/lights-off.svg" alt="Lights" fill priority style={{ objectFit: 'contain' }} />
            </div>
            {/* Left Top Letters */}
            <div className="fade-in-up fade-in-up-delay-3" style={{ position: 'absolute', top: '8%', left: '5%', width: '15%', height: '14%', zIndex: 21, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src="/assets/letters-off.svg" alt="Letters" fill priority style={{ objectFit: 'contain' }} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

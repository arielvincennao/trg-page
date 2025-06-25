'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const TEXT = 'Advancing crypto security with research, tools and resources for the public good.';
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

const MainContent = ({ onSectionEnd }: { onSectionEnd: () => void }) => {
  const [progress, setProgress] = useState(0); // 0 a 1
  const [transitioning, setTransitioning] = useState(false);
  const [blockScroll, setBlockScroll] = useState(false);
  const [showSection, setShowSection] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (transitioning || blockScroll) return;
      const scroll = window.scrollY;
      const p = Math.min(scroll / TRANSITION_SCROLL, 1);
      setProgress(p);
      if (p === 1 && onSectionEnd) {
        setTransitioning(true);
        setBlockScroll(true);
        setTimeout(() => {
          setShowSection(false);
          setTransitioning(false);
          setBlockScroll(false);
          window.scrollTo({ top: 0, behavior: 'auto' });
          onSectionEnd();
        }, 400);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transitioning, blockScroll, onSectionEnd]);

  useEffect(() => {
    document.body.style.overflow = transitioning || blockScroll ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [transitioning, blockScroll]);

  const lines = [
    'Advancing crypto security',
    ' with research, tools and resources',
    ' for the public good.'
  ];

  if (!showSection) return null;

  return (
    <div style={{ minHeight: '200vh', position: 'relative' }}>
      <section
        ref={scrollContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.09s',
          pointerEvents: transitioning ? 'none' : 'auto',
        }}
      >
        <div className="flex flex-col items-center gap-6 w-full max-w-[800px]">
          <div className="w-[169px] h-[169px] relative flex-shrink-0 [&>*]:!opacity-100 [&>*]:!transition-none">
            <Image
              src="/assets/trg-logo.svg"
              alt="TRG Logo"
              fill
              priority
              className="object-contain"
              sizes="169px"
            />
          </div>
          <h1 className="text-base sm:text-xl lg:text-4xl text-center w-11/12 md:w-[45%] min-h-[120px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              {lines.map((line, lineIndex) => {
                const startIndex = TEXT.indexOf(line);
                return (
                  <div key={lineIndex} className="flex">
                    {line.split('').map((char, charIndex) => {
                      const index = startIndex + charIndex;
                      const t = Math.max(0, Math.min(1, progress * TEXT.length - index));
                      const color = lerpColor(COLOR_START, COLOR_END, t);
                      const isActive = t >= 1;
                      return (
                        <span
                          key={charIndex}
                          style={{
                            color: isActive ? `rgb(${color.r},${color.g},${color.b})` : '#666666',
                            transition: 'color 0.3s, font-family 0.3s',
                            fontFamily: isActive ? 'var(--font-pixelify-sans)' : 'var(--font-poppins)',
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default MainContent;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const MainContent = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isInMain, setIsInMain] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // Ref para controlar si hay transición y bloquear scroll manual
  const isTransitioningRef = useRef(false);
  // Ref para ignorar scroll manual mientras hay transición
  const ignoreScrollRef = useRef(false);
  // Ref para guardar timeout y limpiarlo si es necesario
  const transitionTimeout = useRef<NodeJS.Timeout | null>(null);

  const text =
    'We advance security and education in the crypto ecosystem with research, tools and resources for the public benefit.';
  const lines = [
    'We advance security and education',
    ' in the crypto ecosystem with research,',
    ' tools and resources for the public benefit.',
  ];

  const animationStart = 0;
  const animationEnd = 1000;
  const scrollOffsetPerLetter = (animationEnd - animationStart) / text.length;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleScroll = () => {
      if (ignoreScrollRef.current) {
        // Ignorar scroll manual si estamos en transición
        return;
      }

      const y = window.scrollY;
      setScrollY(y);

      const scene = document.getElementById('scene-section');
      if (!scene) return;

      const sceneTop = scene.offsetTop;

      // Ir a escena automáticamente si el texto se completó
      if (
        isInMain &&
        y >= animationEnd &&
        !isTransitioningRef.current
      ) {
        isTransitioningRef.current = true;
        ignoreScrollRef.current = true; // Bloqueo scroll manual

        window.scrollTo({ top: sceneTop, behavior: 'smooth' });

        if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
        transitionTimeout.current = setTimeout(() => {
          setIsInMain(false);
          isTransitioningRef.current = false;
          ignoreScrollRef.current = false; // Liberar scroll manual
        }, 1000);
      }

      // Volver a Main al scrollear arriba desde escena
      if (
        !isInMain &&
        y < sceneTop - 200 &&
        !isTransitioningRef.current
      ) {
        isTransitioningRef.current = true;
        ignoreScrollRef.current = true; // Bloqueo scroll manual

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
        transitionTimeout.current = setTimeout(() => {
          setScrollY(0);
          setIsInMain(true);
          isTransitioningRef.current = false;
          ignoreScrollRef.current = false; // Liberar scroll manual
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, [hasMounted, isInMain]);

  return (
    <div className="min-h-[400vh] flex flex-col items-center justify-center gap-6 relative">
      {/* Sección principal con logo y texto */}
      <div
        id="main-content-wrapper"
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] flex flex-col items-center gap-6 transition-opacity duration-300 ease-out ${
          isInMain ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
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

        <h1 className="text-base sm:text-xl lg:text-4xl text-center w-11/12 md:w-[45%] min-h-[120px] flex items-center justify-center text-white">
          <div className="flex flex-col items-center gap-2">
            {lines.map((line, lineIndex) => {
              const startIndex = text.indexOf(line);
              return (
                <div key={lineIndex} className="flex">
                  {line.split('').map((char, charIndex) => {
                    const index = startIndex + charIndex;
                    const threshold = animationStart + index * scrollOffsetPerLetter;

                    const isActive = scrollY > threshold;

                    const charClass = isActive
                      ? 'text-[color:var(--color-primary)] opacity-100 font-[family-name:var(--font-pixelify-sans)] leading-[1.2]'
                      : 'text-white opacity-40 font-[family-name:var(--font-poppins)] leading-[1.2]';

                    return (
                      <span key={charIndex} className={charClass}>
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
    </div>
  );
};

export default MainContent;

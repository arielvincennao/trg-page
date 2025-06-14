'use client';

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const MainContent = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const text = "We advance security and education in the crypto ecosystem with research, tools and resources for the public benefit.";
  const lines = [
    "We advance security and education",
    " in the crypto ecosystem with research,",
    " tools and resources for the public benefit."
  ];

  const animationStart = 0; // ScrollY first letter
  const animationEnd = 1000;   // ScrollY last letter
  const scrollOffsetPerLetter = (animationEnd - animationStart) / text.length;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      setScrollY(currentScrollY);

      // Resetear cuando volvemos arriba
      if (currentScrollY < animationEnd) {
        setIsVisible(true);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      }

      // Obtener la posición de Scene
      const sceneElement = document.getElementById('scene-section');
      const scenePosition = sceneElement?.offsetTop || 0;

      // Si estamos cerca de Scene o scrolleando muy rápido, desaparecer MainContent inmediatamente
      if (currentScrollY >= scenePosition - 600 || 
          (isScrollingDown && currentScrollY - lastScrollY.current > 50)) {
        setIsVisible(false);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      }
      // Activar el scroll automático cuando el texto está rojo
      else if (isScrollingDown && currentScrollY >= animationEnd && isVisible) {
        // Esperar 0.1 segundo
        scrollTimeout.current = setTimeout(() => {
          if (sceneElement) {
            window.scrollTo({
              top: sceneElement.offsetTop,
              behavior: 'auto'
            });
            // Desaparecer MainContent después de llegar a Scene
            setTimeout(() => {
              setIsVisible(false);
            }, 100);
          }
        }, 100);
      }

      // Si estamos volviendo de Scene (scrolleando hacia arriba desde Scene)
      if (!isScrollingDown && currentScrollY < scenePosition - 600 && !isVisible) {
        setIsVisible(true);
        // Posicionar en la mitad de la animación
        window.scrollTo({
          top: animationEnd,
          behavior: 'auto'
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isVisible]);

  return (
    <div className="min-h-[400vh] flex flex-col items-center justify-center gap-6 relative bg-black">
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src="/assets/trg-logo.svg"
          alt="TRG Logo"
          width={169}
          height={169}
          priority
        />
        <h1 className="text-base sm:text-xl lg:text-4xl text-center w-11/12 md:w-[45%]">
          <div className="flex flex-col items-center gap-2">
            {lines.map((line, lineIndex) => {
              const startIndex = text.indexOf(line);
              return (
                <div key={lineIndex} className="flex">
                  {line.split('').map((char, charIndex) => {
                    const index = startIndex + charIndex;
                    const letterThreshold = animationStart + (index * scrollOffsetPerLetter);
                    const isActive = scrollY > letterThreshold;

                    const charClassName = isActive
                      ? "text-[color:var(--color-primary)] opacity-100 font-[family-name:var(--font-pixelify-sans)]"
                      : "text-white opacity-40 font-[family-name:var(--font-poppins)]";

                    return (
                      <span key={charIndex} className={charClassName}>
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
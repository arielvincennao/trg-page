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

      // Obtener la posición de Scene
      const sceneElement = document.getElementById('scene-section');
      const scenePosition = sceneElement?.offsetTop || 0;
      const mainContentLimit = animationEnd + 200; // Límite adicional después de la animación

      // Resetear cuando volvemos arriba
      if (currentScrollY < animationEnd) {
        setIsVisible(true);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      }

      // Si sobrepasamos el límite de MainContent, ir a Scene
      if (currentScrollY > mainContentLimit && isScrollingDown) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(() => {
          if (sceneElement) {
            window.scrollTo({
              top: scenePosition,
              behavior: 'smooth'
            });
            setTimeout(() => {
              setIsVisible(false);
            }, 300);
          }
        }, 50);
      }
      // Si estamos cerca de Scene o scrolleando muy rápido, desaparecer MainContent con una transición suave
      else if (currentScrollY >= scenePosition - 600 || 
          (isScrollingDown && currentScrollY - lastScrollY.current > 50)) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        // Pequeño delay antes de ocultar para evitar el "apagón"
        scrollTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, 50);
      }
      // Activar el scroll automático cuando el texto está rojo
      else if (isScrollingDown && currentScrollY >= animationEnd && isVisible) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        // Esperar un poco más antes de hacer el scroll automático
        scrollTimeout.current = setTimeout(() => {
          if (sceneElement) {
            window.scrollTo({
              top: sceneElement.offsetTop,
              behavior: 'smooth'
            });
            // Desaparecer MainContent después de llegar a Scene
            setTimeout(() => {
              setIsVisible(false);
            }, 300);
          }
        }, 150);
      }

      // Si estamos volviendo de Scene (scrolleando hacia arriba desde Scene)
      if (!isScrollingDown && currentScrollY < scenePosition - 600 && !isVisible) {
        setIsVisible(true);
        // Posicionar en la mitad de la animación con una transición suave
        window.scrollTo({
          top: animationEnd,
          behavior: 'smooth'
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
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] flex flex-col items-center gap-6 transition-all duration-200 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-[169px] h-[169px] relative flex-shrink-0">
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
              const startIndex = text.indexOf(line);
              return (
                <div key={lineIndex} className="flex">
                  {line.split('').map((char, charIndex) => {
                    const index = startIndex + charIndex;
                    const letterThreshold = animationStart + (index * scrollOffsetPerLetter);
                    const isActive = scrollY > letterThreshold;

                    const charClassName = isActive
                      ? "text-[color:var(--color-primary)] opacity-100 font-[family-name:var(--font-pixelify-sans)] leading-[1.2]"
                      : "text-white opacity-40 font-[family-name:var(--font-poppins)] leading-[1.2]";

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
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const MainContent = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasCompletedAnimation, setHasCompletedAnimation] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTransitioningRef = useRef(false);
  const resettingRef = useRef(false);
  const cooldownRef = useRef(false);
  const ticking = useRef(false);

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

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      const sceneElement = document.getElementById('scene-section');
      const scenePosition = sceneElement?.offsetTop || 0;

      if (isVisible && !isTransitioningRef.current) {
        if (!hasCompletedAnimation) {
          if (currentScrollY >= animationEnd) {
            setHasCompletedAnimation(true);
            setScrollY(animationEnd);
          } else {
            setScrollY(currentScrollY);
          }
        } else {
          setScrollY(animationEnd);
        }
      }

      // MAIN -> SCENE
      if (
        isVisible &&
        isScrollingDown &&
        currentScrollY >= animationEnd &&
        !cooldownRef.current
      ) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          if (sceneElement) {
            window.scrollTo({ top: scenePosition, behavior: 'smooth' });
            setTimeout(() => setIsVisible(false), 300);
          }
        }, 100);
      }

      // SCENE -> MAIN
      if (!isVisible && !isScrollingDown && currentScrollY < scenePosition - 600) {
        if (!cooldownRef.current) {
          isTransitioningRef.current = true;
          resettingRef.current = true;
          cooldownRef.current = true;

          requestAnimationFrame(() => {
            setIsVisible(true);
            setScrollY(0);
            setHasCompletedAnimation(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
              isTransitioningRef.current = false;
              resettingRef.current = false;
            }, 500);

            // Cooldown para evitar reinicios inmediatos
            setTimeout(() => {
              cooldownRef.current = false;
            }, 800);
          });
        }
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (isTransitioningRef.current) return;
      if (!ticking.current) {
        requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [hasMounted, isVisible, hasCompletedAnimation]);

  return (
    <div className="min-h-[400vh] flex flex-col items-center justify-center gap-6 relative">
      <div
        id="main-content-wrapper"
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] flex flex-col items-center gap-6 transition-opacity duration-300 ease-out pointer-events-auto ${
          isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
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
                    const letterThreshold = animationStart + index * scrollOffsetPerLetter;
                    const isActive =
                      !resettingRef.current &&
                      ((isVisible && scrollY > letterThreshold) || hasCompletedAnimation);

                    const charClassName = isActive
                      ? 'text-[color:var(--color-primary)] opacity-100 font-[family-name:var(--font-pixelify-sans)] leading-[1.2]'
                      : 'text-white opacity-40 font-[family-name:var(--font-poppins)] leading-[1.2]';

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

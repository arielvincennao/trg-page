'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface IndicatorsProps {
  inMain?: boolean;
  inScene?: boolean;
}

const Indicators = ({ inMain, inScene }: IndicatorsProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 text-[#666666] text-sm z-50`} style={{ minHeight: 40 }}>
      {/* Scroll to view content (solo en MainContent) */}
      <div
        className={`flex flex-row items-center gap-2 transition-all duration-500
          ${inMain ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
          absolute left-1/2 -translate-x-1/2`}
        style={{ position: 'absolute' }}
      >
        <Image
          src="/assets/arrow-down.svg"
          alt="Arrow down"
          width={20}
          height={20}
          className="animate-bounce-arrow"
          style={{ filter: 'invert(36%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%)' }}
        />
        <span className="font-[family-name:var(--font-poppins)] whitespace-nowrap">
          Scroll to view
        </span>
      </div>
      {/* Hover/Tap to explore content (solo en Scene) */}
      <div
        className={`flex flex-row items-center gap-2 transition-all duration-500
          ${inScene ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
          absolute left-1/2 -translate-x-1/2`}
        style={{ position: 'absolute' }}
      >
        <Image
          src={isMobile ? "/assets/tap.svg" : "/assets/mouse.svg"}
          alt={isMobile ? "Tap icon" : "Mouse icon"}
          width={20}
          height={20}
          className={isMobile ? "animate-tap" : "animate-mouse-circle"}
        />
        <span className="font-[family-name:var(--font-poppins)] whitespace-nowrap">
          {isMobile ? "Tap to explore" : "Hover to explore"}
        </span>
      </div>
    </div>
  );
};

export default Indicators; 
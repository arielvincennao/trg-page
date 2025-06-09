'use client';

import Image from "next/image";
import React, { useState, useEffect } from "react";

const MainContent = () => {
  const [scrollY, setScrollY] = useState(0);
  const text = "We advance security and education in the crypto ecosystem with research, tools and resources for the public benefit.";

  const animationStart = 0; // ScrollY first letter
  const animationEnd = 250;   // ScrollY last letter
  const scrollOffsetPerLetter = (animationEnd - animationStart) / text.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 relative">
      <Image
        src="/assets/trg-logo.svg"
        alt="TRG Logo"
        width={169}
        height={169}
        priority
      />
      <h1 className="text-xl lg:text-4xl text-center mt-4 w-11/12 md:w-[45%]">
        {text.split('').map((char, index) => {
          const letterThreshold = animationStart + (index * scrollOffsetPerLetter);
          const isActive = scrollY > letterThreshold;

          const charClassName = isActive
            ? "text-[color:var(--color-primary)] opacity-100 font-[family-name:var(--font-pixelify-sans)]"
            : "text-white opacity-40 font-[family-name:var(--font-poppins)]";

          return (
            <span key={index} className={charClassName}>
              {char}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

export default MainContent; 
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const BackgroundClouds = () => {
  const [cloudLeftOpacity, setCloudLeftOpacity] = useState(0.5);
  const [cloudRightOpacity, setCloudRightOpacity] = useState(0.5);
  const [crossOpacity, setCrossOpacity] = useState(0.3);
  const [glitchLeftOpacity, setGlitchLeftOpacity] = useState(0.4);
  const [glitchRightOpacity, setGlitchRightOpacity] = useState(0.4);

  useEffect(() => {
    const createRandomGlitch = (setOpacity: (value: number) => void, baseOpacity: number, maxOpacity: number) => {
      const flash = () => {
        setOpacity(maxOpacity);
        setTimeout(() => setOpacity(baseOpacity), 50);
        setTimeout(() => setOpacity(maxOpacity), 100);
        setTimeout(() => setOpacity(baseOpacity), 150);
      };

      const randomTime = Math.random() * 6000 + 2000;
      setTimeout(() => {
        flash();
        createRandomGlitch(setOpacity, baseOpacity, maxOpacity);
      }, randomTime);
    };

    // Iniciar efectos independientes para cada elemento
    createRandomGlitch(setCloudLeftOpacity, 0.5, 0.8);
    createRandomGlitch(setCloudRightOpacity, 0.5, 0.8);
    createRandomGlitch(setCrossOpacity, 0.3, 0.6);
    createRandomGlitch(setGlitchLeftOpacity, 0.4, 0.8);
    createRandomGlitch(setGlitchRightOpacity, 0.4, 0.8);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible">
      {/* Nube izquierda */}
      <div className="absolute top-[4%] left-[-3%] w-[200px] h-[176px] sm:w-[280px] sm:h-[246px] md:w-[320px] md:h-[281px] lg:w-[360px] lg:h-[316px] overflow-visible scale-150">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-cloud.svg"
            alt="Cloud background"
            width={359}
            height={316}
            style={{ opacity: cloudLeftOpacity }}
            className="object-contain [mix-blend-mode:screen] brightness-[14.28] absolute inset-0 transition-opacity duration-50"
            priority
          />
        </div>
      </div>
      
      {/* Nube derecha - igual a la izquierda */}
      <div className="absolute top-[30%] right-[-2%] w-[200px] h-[176px] sm:w-[280px] sm:h-[246px] md:w-[320px] md:h-[281px] lg:w-[360px] lg:h-[316px] overflow-visible scale-150">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-cloud.svg"
            alt="Cloud background"
            width={359}
            height={316}
            style={{ opacity: cloudRightOpacity }}
            className="object-contain [mix-blend-mode:screen] brightness-[14.28] absolute inset-0 transition-opacity duration-50"
            priority
          />
        </div>
      </div>
      
      {/* Cruz decorativa */}
      <div className="absolute bottom-[0%] left-[0%] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] overflow-visible">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-cross.svg"
            alt="Decorative cross"
            width={300}
            height={300}
            style={{ opacity: crossOpacity }}
            className="object-contain [mix-blend-mode:screen] brightness-[1.5] absolute inset-0 transition-opacity duration-50"
            priority
          />
        </div>
      </div>
      
      {/* Glitch izquierdo */}
      <div className="absolute top-[58%] left-[-2%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] overflow-visible -translate-y-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-glitch.svg"
            alt="Glitch effect"
            width={200}
            height={200}
            style={{ opacity: glitchLeftOpacity }}
            className="object-contain [mix-blend-mode:screen] brightness-[1.2] absolute inset-0 transition-opacity duration-50"
            priority
          />
        </div>
      </div>

      {/* Glitch derecho */}
      <div className="absolute top-[80%] right-[5%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] overflow-visible -translate-y-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/assets/background/bg-glitch.svg"
            alt="Glitch effect"
            width={200}
            height={200}
            style={{ opacity: glitchRightOpacity, transform: 'scaleX(-1)' }}
            className="object-contain [mix-blend-mode:screen] brightness-[1.2] absolute inset-0 transition-opacity duration-50"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundClouds; 
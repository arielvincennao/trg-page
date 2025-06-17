'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  enabled?: boolean;
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  enabled = true,
  onLoadingComplete 
}) => {
  const [isLoading, setIsLoading] = useState(enabled);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    const duration = 2000; // 2 segundos
    const interval = 20; // Actualizar cada 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFading(true);
          setTimeout(() => {
            setIsLoading(false);
            onLoadingComplete?.();
          }, 500); // Duración del fade out
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="glitch-container mb-8">
        <div className="glitch-image">
          <Image
            src="/assets/navbar-logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="relative z-10"
          />
        </div>
      </div>
      <div className="glitch-text text-white text-xl mb-8">Loading...</div>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-500 glitch-progress"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { cardContent } from "../data/cardContent";
import BackgroundClouds from "../components/BackgroundClouds";

// Sistema de partículas DOM igual que en Scene
type Particle = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  speed: number;
  opacity: number;
  targetOpacity: number;
  delay: number;
};

function ParticlesDOM() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const PARTICLE_COUNT = isMobile ? 24 : 48;
    const INITIAL_DELAY = 2000;
    const now = Date.now();
    let particlesArr: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      opacity: 0,
      targetOpacity: 0.1 + Math.random() * 0.3,
      delay: now + INITIAL_DELAY
    }));
    setParticles(particlesArr);

    let animationId: number;
    function animate() {
      const now = Date.now();
      const width = window.innerWidth;
      const height = window.innerHeight;
      particlesArr = particlesArr.map(p => {
        // Fade-in según delay y targetOpacity
        let opacity = p.opacity;
        if (now > p.delay && opacity < p.targetOpacity) {
          opacity = Math.min(p.targetOpacity, opacity + 0.02);
        }
        // Movimiento
        let nx = p.x + p.dx;
        let ny = p.y + p.dy;
        if (nx < 0) { nx = 0; p.dx = Math.abs(p.dx); }
        if (nx > width) { nx = width; p.dx = -Math.abs(p.dx); }
        if (ny < 0) { ny = 0; p.dy = Math.abs(p.dy); }
        if (ny > height) { ny = height; p.dy = -Math.abs(p.dy); }
        // Variación aleatoria
        let ndx = p.dx + (Math.random() - 0.5) * 0.1;
        let ndy = p.dy + (Math.random() - 0.5) * 0.1;
        // Limitar velocidad
        const maxSpeed = 1;
        const currentSpeed = Math.sqrt(ndx * ndx + ndy * ndy);
        if (currentSpeed > maxSpeed) {
          ndx = (ndx / currentSpeed) * maxSpeed;
          ndy = (ndy / currentSpeed) * maxSpeed;
        }
        return { ...p, x: nx, y: ny, dx: ndx, dy: ndy, opacity };
      });
      setParticles([...particlesArr]);
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: particle.r * 2,
            height: particle.r * 2,
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            background: '#fff',
            boxShadow: '0 0 4px 1px #fff',
            transition: 'opacity 0.2s',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}

export default function InitiativesPage() {
  const handleExplore = (title: string) => {
    console.log('Explorar clickeado:', title);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <BackgroundClouds />
      <ParticlesDOM />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-8 relative z-20">
        <h1 className="text-4xl font-bold mb-12 text-center text-white font-[family-name:var(--font-poppins)]">Our Initiatives</h1>
        <div className="flex flex-col gap-6 items-center justify-center px-0 sm:px-8 overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:py-3 lg:gap-6 lg:py-3">
          {Object.entries(cardContent).map(([key, content]) => (
            <div 
              key={key}
              className="relative w-auto max-w-[420px] min-h-[260px] sm:min-h-[250px] md:min-h-[300px] overflow-visible py-3 md:py-0 lg:py-0"
            >
              <Card
                title={content.title}
                description={content.description}
                buttonText={content.buttonText}
                links={content.links}
                onExplore={() => handleExplore(content.title)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 
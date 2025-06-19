'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { cardContent } from "../data/cardContent";
import BackgroundClouds from "../components/BackgroundClouds";

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return { width: window.innerWidth, height: window.innerHeight };
    };
    let { width, height } = updateCanvasSize();
    const PARTICLE_COUNT = isMobile ? 50 : 100;
    const INITIAL_DELAY = 2000;
    const startTime = Date.now();
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.5,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      opacity: 0,
      targetOpacity: 0.1 + Math.random() * 0.3,
      delay: INITIAL_DELAY
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const currentTime = Date.now() - startTime;
      for (const p of particles) {
        if (currentTime < p.delay) continue;
        const fadeInDuration = 1000;
        const timeSinceDelay = currentTime - p.delay;
        const fadeProgress = Math.min(timeSinceDelay / fadeInDuration, 1);
        p.opacity = p.targetOpacity * fadeProgress;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }
    function update() {
      const currentTime = Date.now() - startTime;
      for (const p of particles) {
        if (currentTime < p.delay) continue;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) { p.x = 0; p.dx = Math.abs(p.dx); }
        if (p.x > width) { p.x = width; p.dx = -Math.abs(p.dx); }
        if (p.y < 0) { p.y = 0; p.dy = Math.abs(p.dy); }
        if (p.y > height) { p.y = height; p.dy = -Math.abs(p.dy); }
        p.dx += (Math.random() - 0.5) * 0.1;
        p.dy += (Math.random() - 0.5) * 0.1;
        const maxSpeed = 1;
        const currentSpeed = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (currentSpeed > maxSpeed) {
          p.dx = (p.dx / currentSpeed) * maxSpeed;
          p.dy = (p.dy / currentSpeed) * maxSpeed;
        }
      }
    }
    function animate() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();
    function handleResize() {
      const newSize = updateCanvasSize();
      width = newSize.width;
      height = newSize.height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        aria-hidden="true"
      />
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
      <ParticlesBackground />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-20">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">Our Initiatives</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {Object.entries(cardContent).map(([key, content]) => (
            <div 
              key={key}
              className="relative w-full h-[200px] sm:h-[250px] md:h-[300px]"
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
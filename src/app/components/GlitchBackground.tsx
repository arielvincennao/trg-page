'use client';

import React, { useEffect, useRef } from 'react';

const GlitchBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let squares: { 
      x: number; 
      y: number; 
      size: number; 
      color: string;
      opacity: number;
      isVisible: boolean;
      glitch: number;
    }[] = [];

    // Función para crear los cuadrados
    const createSquares = () => {
      const isMobile = window.innerWidth <= 640;
      const numSquares = isMobile ? 4 : 8;
      
      squares = [];
      for (let i = 0; i < numSquares; i++) {
        squares.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 5,
          color: Math.random() > 0.5 ? '#ff0000' : '#ffffff',
          opacity: 0,
          isVisible: false,
          glitch: Math.random() * 100
        });
      }
    };

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createSquares(); // Recrear los cuadrados al cambiar el tamaño
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Función para dibujar un cuadrado con efecto glitch
    const drawGlitchSquare = (x: number, y: number, size: number, glitch: number, color: string, opacity: number) => {
      if (Math.random() * 100 < glitch) {
        // Efecto de glitch
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8;
        const glitchSize = size * (0.8 + Math.random() * 0.4);

        // Efecto de glitch en rojo
        ctx.fillStyle = `rgba(255, 0, 0, ${opacity * 0.4})`;
        ctx.fillRect(x + offsetX, y + offsetY, glitchSize, glitchSize);

        // Efecto de glitch en blanco
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
        ctx.fillRect(x - offsetX, y - offsetY, glitchSize, glitchSize);
      }

      // Cuadrado principal
      ctx.fillStyle = color === '#ff0000' 
        ? `rgba(255, 0, 0, ${opacity * 0.2})` 
        : `rgba(255, 255, 255, ${opacity * 0.2})`;
      ctx.fillRect(x, y, size, size);
    };

    // Función de animación
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      squares.forEach((square) => {
        // Actualizar visibilidad y opacidad
        if (square.isVisible) {
          square.opacity = Math.min(1, square.opacity + 0.2);
          if (square.opacity >= 1) {
            // Ocasionalmente hacer invisible
            if (Math.random() < 0.05) {
              square.isVisible = false;
            }
          }
        } else {
          square.opacity = Math.max(0, square.opacity - 0.2);
          if (square.opacity <= 0) {
            // Ocasionalmente hacer visible
            if (Math.random() < 0.15) {
              square.isVisible = true;
              square.x = Math.random() * canvas.width;
              square.y = Math.random() * canvas.height;
              square.color = Math.random() > 0.5 ? '#ff0000' : '#ffffff';
            }
          }
        }

        // Dibujar cuadrado si tiene alguna opacidad
        if (square.opacity > 0) {
          drawGlitchSquare(square.x, square.y, square.size, square.glitch, square.color, square.opacity);
        }

        // Ocasionalmente cambiar el nivel de glitch
        if (Math.random() < 0.01) {
          square.glitch = Math.random() * 100;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default GlitchBackground; 
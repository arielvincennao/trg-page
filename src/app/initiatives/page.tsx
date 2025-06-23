'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { cardContent } from "../data/cardContent";
import BackgroundClouds from "../components/BackgroundClouds";
import ParticlesDOM from '../components/ParticlesDOM';

export default function InitiativesPage() {
  const handleExplore = (title: string) => {
    console.log('Explorar clickeado:', title);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <BackgroundClouds />
      <ParticlesDOM countMobile={24} countDesktop={48} />
      <Navbar />
      <main className="container mx-auto px-4 pt-45 pb-8 relative z-20">
        <h1 className="text-lg sm:text-xl mb-5 text-center text-white font-[family-name:var(--font-pixelify-sans)] px-6">Initiatives</h1>
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
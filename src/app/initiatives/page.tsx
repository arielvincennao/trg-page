'use client';

import React from 'react';
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
        <h1 className="text-lg sm:text-xl mb-8 text-center text-white font-spartan-title px-6">Initiatives</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-0 sm:px-8 overflow-visible">
          {Object.entries(cardContent).map(([key, content]) => (
            <div 
              key={key}
              className="relative w-auto overflow-visible"
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
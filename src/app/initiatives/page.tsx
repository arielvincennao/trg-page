'use client';

import React from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { cardContent } from "../data/cardContent";
import BackgroundClouds from "../components/BackgroundClouds";

export default function InitiativesPage() {
  const handleExplore = (title: string) => {
    console.log('Explorar clickeado:', title);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <BackgroundClouds />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-center text-white">Our Initiatives</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {Object.entries(cardContent).map(([key, content]) => (
            <div 
              key={key}
              className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] bg-black/50 rounded-2xl"
            >
              <Card
                title={content.title}
                description={content.description}
                buttonText={content.buttonText}
                onExplore={() => handleExplore(content.title)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 
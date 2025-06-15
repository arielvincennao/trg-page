import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClose: () => void;
  onExplore: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClose, onExplore }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <button 
        className="absolute -top-3 -right-3 w-8 h-8 bg-black/80 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors text-xl"
        onClick={onClose}
      >
        ×
      </button>
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-white/80 text-base sm:text-lg md:text-xl mb-6 flex-grow">{description}</p>
      <button 
        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-base sm:text-lg rounded-lg transition-colors w-full sm:w-auto"
        onClick={onExplore}
      >
        Explorar
      </button>
    </div>
  );
};

export default Card; 
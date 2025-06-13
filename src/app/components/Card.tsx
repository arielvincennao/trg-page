import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClose: () => void;
  onExplore: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClose, onExplore }) => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[35%] aspect-[16/9] bg-black/80 backdrop-blur-sm p-[2vw] rounded-lg border border-white/20 z-50">
      <button 
        className="absolute -top-3 -right-3 w-6 h-6 bg-black/80 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        ×
      </button>
      <h2 className="text-white text-[1.8vw] md:text-[1.5vw] lg:text-[1.2vw] font-bold mb-[1vw]">{title}</h2>
      <p className="text-white/80 text-[1.2vw] md:text-[1vw] lg:text-[0.8vw] mb-[1.5vw]">{description}</p>
      <button 
        className="bg-white/10 hover:bg-white/20 text-white px-[1.5vw] py-[0.6vw] text-[1vw] md:text-[0.9vw] lg:text-[0.7vw] rounded-lg transition-colors"
        onClick={onExplore}
      >
        Explorar
      </button>
    </div>
  );
};

export default Card; 
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  onClose?: () => void;
  onExplore: () => void;
  buttonText?: string;
}

const Card: React.FC<CardProps> = ({ title, description, onClose, onExplore, buttonText }) => {
  return (
    <div className={`relative w-full h-full ${onClose ? 'fixed top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 !w-[85%] sm:!w-[70%] md:!w-[50%] lg:!w-[35%] max-w-[400px] h-auto max-h-[30vh] sm:max-h-[35vh] z-50' : ''}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4a0000]/70 via-[#2d0000]/60 to-black/80 backdrop-blur-2xl rounded-2xl border border-red-500/50" />
        <div className="relative z-10 p-3 sm:p-4 md:p-5 flex flex-col h-full">
          {onClose && (
            <button 
              className="absolute -top-3 -right-3 w-8 h-8 bg-black/80 rounded-full border border-red-500 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={onClose}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-2">{title}</h2>
          <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg mb-3 flex-grow line-clamp-3">{description}</p>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
            className="text-white hover:text-white/80 text-xs sm:text-sm md:text-base lg:text-lg font-medium border-b border-white pb-1 transition-colors uppercase mt-auto"
          >
            {buttonText || "Explore"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card; 
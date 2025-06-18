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
    <div className="relative w-[90vw] sm:w-[420px]">
      <div className="relative w-full">
        <div className="absolute inset-0 bg-black rounded-2xl border border-red-500/50" />
        <div className="relative z-10 p-6 flex flex-col">
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
          <h2 className="text-white text-xl font-bold mb-4 font-[family-name:var(--font-poppins)]">{title}</h2>
          <p className="text-white/80 text-base mb-6 font-[family-name:var(--font-poppins)]">{description}</p>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
            className="text-white hover:text-white/80 text-base font-medium inline-block transition-colors uppercase font-[family-name:var(--font-poppins)]"
            style={{
              borderBottom: '1px solid white',
              width: 'fit-content'
            }}
          >
            {buttonText || "Explore"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card; 
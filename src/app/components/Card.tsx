import React from 'react';

import { CardLink } from '../data/cardContent';

interface CardProps {
  title: string;
  description: string;
  onClose?: () => void;
  onExplore: () => void;
  buttonText?: string;
  links?: CardLink[];
}

const Card: React.FC<CardProps> = ({ title, description, onClose, onExplore, buttonText, links }) => {
  return (
    <div className="relative w-full h-auto sm:h-[33vh]">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-[#D02D301A] backdrop-blur-[15px] rounded-2xl border border-[#D02D30]" />
        <div className="relative z-10 p-4 pt-5 pb-6 flex flex-col h-full justify-between">
          <div>
            {onClose && (
              <button 
                className="absolute -top-3 -right-3 w-8 h-8 bg-white/80 rounded-full border border-[#D02D30] flex items-center justify-center text-[#D02D30] hover:bg-white transition-colors cursor-pointer"
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <h2 className="text-white text-xl font-spartan-title mb-4">{title}</h2>
            <p className="text-white/80 text-base font-spartan-body" 
               dangerouslySetInnerHTML={{ __html: description.replace(
                 /<a /g,
                 "<a style='text-decoration:underline;color:#fff;' "
               ) }} 
            />
          </div>
          {links && links.length > 0 ? (
            <div className="flex flex-col gap-3 mt-6">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 text-base font-spartan-subtitle transition-colors underline underline-offset-2 decoration-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onExplore();
              }}
              className="text-white hover:text-white/80 text-base font-spartan-subtitle transition-colors uppercase underline underline-offset-2 decoration-white mt-6"
            >
              {buttonText || "Explore"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card; 
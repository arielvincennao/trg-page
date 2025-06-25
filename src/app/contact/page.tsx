'use client';

import Navbar from "../components/Navbar";
import BackgroundClouds from "../components/BackgroundClouds";
import ParticlesDOM from '../components/ParticlesDOM';
import XIcon from '../components/assets/XIcon';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center">
      <BackgroundClouds />
      <ParticlesDOM countMobile={24} countDesktop={48} />
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-8 relative z-30 flex flex-col items-center justify-center w-full">
        <h1 className="text-lg sm:text-xl text-center text-white font-[family-name:var(--font-pixelify-sans)] px-6">Contact Us</h1>
        <div className="mx-auto flex flex-col items-center justify-center mt-10 backdrop-blur-[15px] contact-card">
          <div className="flex flex-1 items-center justify-between w-full px-8 contact-card-content">
            {/* Social media */}
            <a href="https://x.com/theredguild" className="w-12 h-12 flex items-center justify-center" target="_blank" rel="noopener noreferrer">
              <XIcon className="w-7 h-7 text-white contact-icon" />
            </a>
            <a href="mailto:hello@theredguild.org" className="w-12 h-12 flex items-center justify-center" target="_blank" rel="noopener noreferrer">
              <img src="/assets/contact-section/letter-icon.svg" alt="Letter" className="w-9 h-9 contact-icon" />
            </a>
            <a href="https://github.com/theredguild" className="w-12 h-12 flex items-center justify-center" target="_blank" rel="noopener noreferrer">
              <img src="/assets/contact-section/github-icon.svg" alt="GitHub" className="w-8 h-8 contact-icon" />
            </a>
            <a href="https://blog.theredguild.org/" className="w-12 h-12 flex items-center justify-center" target="_blank" rel="noopener noreferrer">
              <img src="/assets/contact-section/blog-icon.svg" alt="Blog" className="w-12 h-12 contact-icon" />
            </a>
          </div>
        </div>
        {/* Supporters & Collaborators */}
        <div className="flex flex-col items-center justify-center mt-30">
          <span className="text-white text-lg mb-4 font-[family-name:var(--font-pixelify-sans)]">Supporters & Collaborators</span>
          <div className="flex flex-row gap-30">
            <a href="https://ethereum.foundation/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/contact-section/ethereum-foundation.svg" alt="Ethereum Foundation" className="w-40 h-24 object-contain" />
            </a>
            <a href="https://www.securityalliance.org/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/contact-section/security-alliance.svg" alt="Security Alliance" className="w-40 h-24 object-contain" />
            </a>
          </div>
          <p className="text-gray-500 text-center mt-4 text-sm font-[family-name:var(--font-poppins)] max-w-full md:whitespace-nowrap whitespace-normal">
            The Red Guild works thanks to grants and donations - if you'd like to support our public-benefit work, get in touch.
          </p>
        </div>
      </main>
    </div>
  );
} 
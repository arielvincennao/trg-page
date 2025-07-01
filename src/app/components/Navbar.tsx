'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-11/12 md:w-[45%] bg-[#191919] text-white px-4 md:px-10 py-2 rounded-full flex items-center justify-between gap-4 md:gap-8 lg:gap-12 border border-white/50 font-spartan-body z-[60]">
      <div className="flex items-center gap-2">
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/assets/navbar-logo.svg"
            alt="TRG Logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-4 md:gap-6 lg:gap-10">
        <li>
          <Link 
            href="/" 
            data-text="Home"
            className={`transition-all duration-300 relative ${pathname === "/" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-xs md:text-sm" : "text-xs md:text-sm"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/initiatives" 
            data-text="Initiatives"
            className={`transition-all duration-300 relative ${pathname === "/initiatives" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-xs md:text-sm" : "text-xs md:text-sm"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
          >
            Initiatives
          </Link>
        </li>
        <li>
          <a 
            href="https://blog.theredguild.org/" 
            target="_blank"
            rel="noopener noreferrer"
            data-text="Blog"
            className="transition-all duration-300 relative text-xs md:text-sm hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect"
          >
            Blog
          </a>
        </li>
        <li>
          <Link 
            href="/contact" 
            data-text="Contact"
            className={`transition-all duration-300 relative ${pathname === "/contact" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-xs md:text-sm" : "text-xs md:text-sm"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 top-16 bottom-0 bg-black/80 z-50 md:hidden" onClick={closeMenu}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-11/12 bg-[#191919] rounded-2xl border border-white/50 p-6" onClick={(e) => e.stopPropagation()}>
            <ul className="flex flex-col gap-6">
              <li>
                <Link 
                  href="/" 
                  data-text="Home"
                  className={`block transition-all duration-300 relative ${pathname === "/" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-lg" : "text-lg"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/initiatives" 
                  data-text="Initiatives"
                  className={`block transition-all duration-300 relative ${pathname === "/initiatives" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-lg" : "text-lg"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
                  onClick={closeMenu}
                >
                  Initiatives
                </Link>
              </li>
              <li>
                <a 
                  href="https://blog.theredguild.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  data-text="Blog"
                  className="block transition-all duration-300 relative text-lg hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect"
                  onClick={closeMenu}
                >
                  Blog
                </a>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  data-text="Contact"
                  className={`block transition-all duration-300 relative ${pathname === "/contact" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-lg" : "text-lg"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 
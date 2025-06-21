'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-11/12 md:w-[45%] bg-[#191919] text-white px-4 md:px-10 py-2 rounded-full flex items-center justify-between gap-12 border border-white/50 font-[family-name:var(--font-poppins)] z-50">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/assets/navbar-logo.svg"
            alt="TRG Logo"
            width={40}
            height={40}
          />
        </Link>
      </div>
      <ul className="flex gap-10">
        <li>
          <Link 
            href="/initiatives" 
            data-text="Initiatives"
            className={`transition-all duration-300 relative ${pathname === "/initiatives" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-sm" : "text-sm"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
          >
            Initiatives
          </Link>
        </li>
        <li>
          <a 
            href="https://theredguild.org/" 
            target="_blank"
            rel="noopener noreferrer"
            data-text="Blog"
            className="transition-all duration-300 relative text-sm hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect"
          >
            Blog
          </a>
        </li>
        <li>
          <Link 
            href="/contact" 
            data-text="Contact"
            className={`transition-all duration-300 relative ${pathname === "/contact" ? "text-[color:var(--color-primary)] font-[family-name:var(--font-pixelify-sans)] text-sm" : "text-sm"} hover:text-[color:var(--color-primary)] hover:font-[family-name:var(--font-pixelify-sans)] hover:glitch-effect`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 
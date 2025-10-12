'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.2; // Hero section height
      const videoStart = heroHeight;
      
      setIsScrolled(scrollY > 20);
      setIsOverVideo(scrollY > videoStart);
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOverVideo ? 'over-video' : ''}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-fixed)',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '0 var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80px',
          position: 'relative',
        }}
        className="navbar-container"
      >
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              setIsLogoHovered(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              setIsLogoHovered(false);
            }}
          >
            <Image 
              src="/usethis.png" 
              alt="Elluminate Capital" 
              width={200} 
              height={60}
              style={{ 
                objectFit: 'contain',
                height: 'auto',
                maxHeight: '50px'
              }}
              priority
            />
          </Link>
        </div>


        {/* Center Section - Navigation Links */}
        <div className="navbar-center">
          <button onClick={() => scrollToSection('insights')} className="nav-link">
            Insights
          </button>
          <button onClick={() => scrollToSection('story')} className="nav-link">
            Story
          </button>
          <button onClick={() => scrollToSection('companies')} className="nav-link">
            Companies
          </button>
        </div>
      </div>


      <style jsx>{`
        .navbar {
          background: transparent;
          border: none;
        }
        
        .navbar.scrolled {
          background: transparent;
          backdrop-filter: none;
          border: none;
          box-shadow: none;
        }
        
        /* Over video section - keep transparent */
        .navbar.over-video {
          background: transparent;
          backdrop-filter: none;
          box-shadow: none;
          border: none;
        }
        
        .navbar.over-video .navbar-container {
          color: var(--text-primary);
        }
        
        .navbar.over-video .navbar-container span {
          color: var(--text-primary) !important;
        }
        
        .navbar-container {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
        
        .navbar-left {
          position: absolute;
          left: var(--space-6);
          top: 50%;
          transform: translateY(-50%);
        }
        
        .navbar-center {
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }
        
        .nav-link {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          padding: var(--space-2) var(--space-4);
          transition: all var(--transition-fast);
          position: relative;
          outline: none;
        }
        
        .nav-link:focus {
          outline: none;
          box-shadow: none;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 1px;
          background: #B8956A;
          transition: transform var(--transition-fast);
        }
        
        .nav-link:hover {
          color: #B8956A;
        }
        
        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        
      `}</style>
    </nav>
  );
};

export default Navbar;

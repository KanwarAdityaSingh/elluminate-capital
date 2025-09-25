'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import ClientThemeToggle from './ClientThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.2; // Hero section height
      const videoStart = heroHeight;
      
      setIsScrolled(scrollY > 20);
      setIsOverVideo(scrollY > videoStart);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOverVideo ? 'over-video' : ''}`}
      style={{
        position: 'fixed',
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
          justifyContent: 'space-between',
          height: '80px',
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div className="logo-icon">
              <Building2 size={24} />
            </div>
            <span
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-family-heading)',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Elluminate Capital
            </span>
          </Link>
        </div>


        {/* Right Section - Theme Toggle */}
        <div className="navbar-right">
          <ClientThemeToggle />
        </div>
      </div>


      <style jsx>{`
        .navbar {
          background: transparent;
          border-bottom: 1px solid var(--border-primary);
        }
        
        .navbar.scrolled {
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-primary);
        }
        
        [data-theme="light"] .navbar {
          background: transparent;
        }
        
        [data-theme="light"] .navbar.scrolled {
          background: rgba(255, 255, 255, 0.95);
        }
        
        [data-theme="dark"] .navbar {
          background: transparent;
        }
        
        [data-theme="dark"] .navbar.scrolled {
          background: rgba(10, 10, 10, 0.95);
        }
        
        /* Over video section - always visible */
        [data-theme="light"] .navbar.over-video {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        
        [data-theme="light"] .navbar.over-video .navbar-container {
          color: var(--text-primary);
        }
        
        [data-theme="light"] .navbar.over-video .navbar-container span {
          color: var(--text-primary) !important;
        }
        
        [data-theme="dark"] .navbar.over-video {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
        }
        
        [data-theme="dark"] .navbar.over-video .navbar-container {
          color: var(--text-primary);
        }
        
        [data-theme="dark"] .navbar.over-video .navbar-container span {
          color: var(--text-primary) !important;
        }
        
        .navbar-container {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
        }
        
        .navbar-left {
          flex: 0 0 auto;
        }
        
        .navbar-right {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--gradient-accent);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-gold);
        }
        
        .logo-icon svg {
          color: var(--text-primary);
        }
        
        [data-theme="dark"] .logo-icon {
          box-shadow: none;
          background: #000000;
          border: 2px solid #D4AF37;
        }
        
        [data-theme="dark"] .logo-icon svg {
          color: #D4AF37 !important;
        }
        
      `}</style>
    </nav>
  );
};

export default Navbar;

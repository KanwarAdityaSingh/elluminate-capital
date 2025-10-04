'use client';

import React from 'react';
import Image from 'next/image';

interface LogoWithThemeProps {
  width?: number;
  height?: number;
  className?: string;
  isHovered?: boolean;
}

const LogoWithTheme: React.FC<LogoWithThemeProps> = ({ 
  width = 200, 
  height = 60, 
  className = '',
  isHovered = false
}) => {
  return (
    <div 
      className={`logo-container ${className}`}
      style={{
        position: 'relative',
        width: width,
        height: height,
        maxHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isHovered ? '#6b4c7a' : '#4a2c5a', // Direct hex colors instead of CSS vars
        borderRadius: '8px',
        border: `2px solid ${isHovered ? '#d4af37' : 'rgba(212, 175, 55, 0.6)'}`,
        padding: '8px 12px',
        transition: 'all 0.3s ease',
        filter: isHovered 
          ? 'drop-shadow(0 4px 15px rgba(212, 175, 55, 0.4))' 
          : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered 
          ? '0 4px 20px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
          : '0 2px 10px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      <Image 
        src="/usethis.png" 
        alt="Elluminate Capital" 
        width={width - 24} // Account for padding
        height={height - 16} // Account for padding
        style={{ 
          objectFit: 'contain',
          height: 'auto',
          maxHeight: '40px',
          zIndex: 2,
          position: 'relative'
        }}
        priority
      />
      
      {/* Subtle gradient overlay for luxury effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '8px',
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(212, 175, 55, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(212, 175, 55, 0.05) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default LogoWithTheme;

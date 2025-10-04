'use client';

import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  isHovered?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  width = 200, 
  height = 60, 
  className = '',
  isHovered = false
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 80"
      className={className}
      style={{ maxHeight: '50px', height: 'auto' }}
    >
      {/* Background Rectangle matching original logo */}
      <rect
        width="320"
        height="80"
        rx="6"
        fill={isHovered ? "var(--color-purple-soft)" : "var(--color-purple)"}
        stroke={isHovered ? "var(--color-accent)" : "rgba(212, 175, 55, 0.6)"}
        strokeWidth={isHovered ? "2" : "1"}
        style={{
          transition: 'all 0.3s ease',
          filter: isHovered ? 'drop-shadow(0 4px 15px rgba(212, 175, 55, 0.4))' : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
        }}
      />
      
      {/* Triangle Icon - recreating the logo's triangle */}
      <g transform="translate(15, 15)">
        {/* Main Triangle - golden */}
        <polygon
          points="25,10 40,45 10,45"
          fill="var(--color-accent)"
          style={{
            filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' : 'none'
          }}
        />
        {/* Triangle highlight */}
        <polygon
          points="25,15 35,40 15,40"
          fill="var(--color-accent-soft)"
          opacity="0.7"
        />
      </g>
      
      {/* ELLUMINATE Text */}
      <text
        x="65"
        y="32"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="white"
        letterSpacing="1.5px"
        style={{
          textShadow: isHovered ? '0 1px 3px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.3)'
        }}
      >
        ELLUMINATE
      </text>
      
      {/* CAPITAL Text */}
      <text
        x="65"
        y="52"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="var(--color-accent)"
        letterSpacing="2px"
        style={{
          textShadow: isHovered ? '0 1px 3px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.3)'
        }}
      >
        CAPITAL
      </text>
      
      {/* Subtle shine effect on hover */}
      {isHovered && (
        <rect
          width="320"
          height="80"
          rx="6"
          fill="url(#shineGradient)"
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      {/* Gradients */}
      <defs>
        <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
          <stop offset="50%" stopColor="rgba(212, 175, 55, 0.1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;

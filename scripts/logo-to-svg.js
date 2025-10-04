const ImageTracer = require('imagetracer');
const fs = require('fs');
const path = require('path');

async function convertLogoToSVG() {
  try {
    console.log('🎨 Converting company logo to SVG...');
    
    const inputPath = path.join(__dirname, '../public/CompanyLogo.jpeg');
    const outputPath = path.join(__dirname, '../public/CompanyLogo.svg');
    
    // Read the image file directly
    const imageBuffer = fs.readFileSync(inputPath);
    
    // Convert to base64 for ImageTracer
    const base64 = imageBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    
    // Configure ImageTracer options for clean SVG
    const options = {
      ltres: 1,        // Line threshold
      qtres: 1,        // Quad threshold  
      pathomit: 8,     // Path omit threshold
      rightangleenhance: true,
      colorsampling: 1,
      numberofcolors: 16,
      mincolorratio: 0.02,
      colorquantcycles: 3,
      scale: 1,
      simplifytolerance: 0,
      roundcoords: 1,
      lcpr: 0,
      qcpr: 0,
      desc: false,
      viewbox: false,
      blurradius: 0,
      blurdelta: 20
    };
    
    // Convert to SVG using the correct ImageTracer API
    const svgString = ImageTracer.ImageTracer(dataUrl, options);
    
    // Clean up the SVG and add theme color variables
    let cleanSVG = svgString
      // Replace common colors with CSS variables
      .replace(/fill="rgb\(74,44,90\)"/g, 'fill="var(--color-purple)"')
      .replace(/fill="rgb\(212,175,55\)"/g, 'fill="var(--color-accent)"')
      .replace(/fill="rgb\(255,255,255\)"/g, 'fill="white"')
      .replace(/fill="rgb\(0,0,0\)"/g, 'fill="var(--color-purple-dark)"')
      // Add proper viewBox and dimensions
      .replace(/<svg[^>]*>/, '<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" style="max-height: 50px; height: auto;">')
      // Remove any background rectangles that might interfere
      .replace(/<rect[^>]*fill="white"[^>]*\/>/g, '');
    
    // Write the SVG file
    fs.writeFileSync(outputPath, cleanSVG);
    
    console.log('✅ SVG logo created successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    
    // Also create a React component that uses the SVG
    const componentCode = `'use client';

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
    <div 
      className={className}
      style={{
        width: width,
        height: height,
        maxHeight: '50px',
        transition: 'all 0.3s ease',
        filter: isHovered ? 'drop-shadow(0 4px 15px rgba(212, 175, 55, 0.4))' : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      dangerouslySetInnerHTML={{
        __html: \`${cleanSVG.replace(/'/g, "\\'")}\`
      }}
    />
  );
};

export default Logo;`;
    
    const componentPath = path.join(__dirname, '../src/components/LogoConverted.tsx');
    fs.writeFileSync(componentPath, componentCode);
    
    console.log('🔧 React component created at:', componentPath);
    console.log('💡 You can now use <LogoConverted /> instead of the manual SVG!');
    
  } catch (error) {
    console.error('❌ Error converting logo:', error);
  }
}

convertLogoToSVG();

const sharp = require('sharp');
const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

async function convertLogoToSVG() {
  try {
    const inputPath = path.join(__dirname, '../public/CompanyLogo.jpeg');
    const outputPath = path.join(__dirname, '../public/CompanyLogo.svg');
    
    console.log('Converting logo to SVG...');
    
    // First, process the image with sharp to remove background and enhance contrast
    const processedBuffer = await sharp(inputPath)
      .removeAlpha() // Remove any alpha channel
      .threshold(128) // Convert to black and white with threshold
      .png()
      .toBuffer();
    
    // Convert to SVG using potrace
    potrace.trace(processedBuffer, {
      background: 'transparent',
      color: 'auto',
      threshold: 128,
      optTolerance: 0.4,
      turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
      turdSize: 100,
      alphaMax: 1,
      optCurve: true,
      flipColors: false
    }, function(err, svg) {
      if (err) {
        console.error('Error converting to SVG:', err);
        return;
      }
      
      // Clean up the SVG and add our theme colors
      let cleanSVG = svg
        .replace(/fill="#000000"/g, 'fill="var(--color-purple)"')
        .replace(/fill="#ffffff"/g, 'fill="var(--color-accent)"')
        .replace(/fill="black"/g, 'fill="var(--color-purple)"')
        .replace(/fill="white"/g, 'fill="var(--color-accent)"')
        .replace(/<svg[^>]*>/, '<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">');
      
      // Write the SVG file
      fs.writeFileSync(outputPath, cleanSVG);
      console.log('SVG logo created successfully at:', outputPath);
    });
    
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

convertLogoToSVG();

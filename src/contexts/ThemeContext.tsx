'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export type FontFamily = 
  | 'inter'
  | 'roboto'
  | 'open-sans'
  | 'lato'
  | 'montserrat'
  | 'nunito'
  | 'poppins'
  | 'raleway'
  | 'playfair-display'
  | 'merriweather'
  | 'crimson-text'
  | 'libre-baskerville'
  | 'source-serif-4'
  | 'jetbrains-mono'
  | 'fira-code'
  | 'space-mono'
  | 'ubuntu-mono'
  | 'work-sans'
  | 'dm-sans'
  | 'manrope'
  | 'outfit'
  | 'plus-jakarta-sans'
  | 'figtree'
  | 'geist-sans'
  | 'cabinet-grotesk'
  | 'satoshi'
  | 'clash-display'
  | 'chillax'
  | 'switzer'
  | 'epilogue'
  | 'lexend'
  | 'readex-pro'
  | 'ibm-plex-sans'
  | 'source-sans-3'
  | 'noto-sans'
  | 'rubik'
  | 'quicksand'
  | 'mulish'
  | 'karla'
  | 'tajawal'
  | 'cormorant-garamond'
  | 'libre-caslon-display'
  | 'baskervville'
  | 'crimson-pro'
  | 'lora'
  | 'vollkorn'
  | 'alegreya'
  | 'domine'
  | 'spectral'
  | 'pt-serif'
  | 'source-code-pro'
  | 'jetbrains-mono'
  | 'fira-code'
  | 'space-mono'
  | 'ubuntu-mono'
  | 'cascadia-code'
  | 'roboto-mono'
  | 'inconsolata'
  | 'courier-prime';

export interface FontConfig {
  name: string;
  category: 'sans-serif' | 'serif' | 'monospace';
  variable: string;
  fallback: string;
}

export const FONT_CONFIGS: Record<FontFamily, FontConfig> = {
  'inter': {
    name: 'Inter',
    category: 'sans-serif',
    variable: '--font-inter',
    fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif'
  },
  'roboto': {
    name: 'Roboto',
    category: 'sans-serif',
    variable: '--font-roboto',
    fallback: 'Arial, sans-serif'
  },
  'open-sans': {
    name: 'Open Sans',
    category: 'sans-serif',
    variable: '--font-open-sans',
    fallback: 'Arial, sans-serif'
  },
  'lato': {
    name: 'Lato',
    category: 'sans-serif',
    variable: '--font-lato',
    fallback: 'Arial, sans-serif'
  },
  'montserrat': {
    name: 'Montserrat',
    category: 'sans-serif',
    variable: '--font-montserrat',
    fallback: 'Arial, sans-serif'
  },
  'nunito': {
    name: 'Nunito',
    category: 'sans-serif',
    variable: '--font-nunito',
    fallback: 'Arial, sans-serif'
  },
  'poppins': {
    name: 'Poppins',
    category: 'sans-serif',
    variable: '--font-poppins',
    fallback: 'Arial, sans-serif'
  },
  'raleway': {
    name: 'Raleway',
    category: 'sans-serif',
    variable: '--font-raleway',
    fallback: 'Arial, sans-serif'
  },
  'playfair-display': {
    name: 'Playfair Display',
    category: 'serif',
    variable: '--font-playfair-display',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'merriweather': {
    name: 'Merriweather',
    category: 'serif',
    variable: '--font-merriweather',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'crimson-text': {
    name: 'Crimson Text',
    category: 'serif',
    variable: '--font-crimson-text',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'libre-baskerville': {
    name: 'Libre Baskerville',
    category: 'serif',
    variable: '--font-libre-baskerville',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'source-serif-4': {
    name: 'Source Serif 4',
    category: 'serif',
    variable: '--font-source-serif-4',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'jetbrains-mono': {
    name: 'JetBrains Mono',
    category: 'monospace',
    variable: '--font-jetbrains-mono',
    fallback: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace'
  },
  'fira-code': {
    name: 'Fira Code',
    category: 'monospace',
    variable: '--font-fira-code',
    fallback: 'Monaco, "Cascadia Code", "Roboto Mono", monospace'
  },
  'space-mono': {
    name: 'Space Mono',
    category: 'monospace',
    variable: '--font-space-mono',
    fallback: 'Monaco, "Cascadia Code", "Roboto Mono", monospace'
  },
  'ubuntu-mono': {
    name: 'Ubuntu Mono',
    category: 'monospace',
    variable: '--font-ubuntu-mono',
    fallback: 'Monaco, "Cascadia Code", "Roboto Mono", monospace'
  },
  // Professional Marketing Sans-serif Fonts
  'work-sans': {
    name: 'Work Sans',
    category: 'sans-serif',
    variable: '--font-work-sans',
    fallback: 'Arial, sans-serif'
  },
  'dm-sans': {
    name: 'DM Sans',
    category: 'sans-serif',
    variable: '--font-dm-sans',
    fallback: 'Arial, sans-serif'
  },
  'manrope': {
    name: 'Manrope',
    category: 'sans-serif',
    variable: '--font-manrope',
    fallback: 'Arial, sans-serif'
  },
  'outfit': {
    name: 'Outfit',
    category: 'sans-serif',
    variable: '--font-outfit',
    fallback: 'Arial, sans-serif'
  },
  'plus-jakarta-sans': {
    name: 'Plus Jakarta Sans',
    category: 'sans-serif',
    variable: '--font-plus-jakarta-sans',
    fallback: 'Arial, sans-serif'
  },
  'figtree': {
    name: 'Figtree',
    category: 'sans-serif',
    variable: '--font-figtree',
    fallback: 'Arial, sans-serif'
  },
  'geist-sans': {
    name: 'Geist Sans',
    category: 'sans-serif',
    variable: '--font-geist-sans',
    fallback: 'Arial, sans-serif'
  },
  'cabinet-grotesk': {
    name: 'Cabinet Grotesk',
    category: 'sans-serif',
    variable: '--font-cabinet-grotesk',
    fallback: 'Arial, sans-serif'
  },
  'satoshi': {
    name: 'Satoshi',
    category: 'sans-serif',
    variable: '--font-satoshi',
    fallback: 'Arial, sans-serif'
  },
  'clash-display': {
    name: 'Clash Display',
    category: 'sans-serif',
    variable: '--font-clash-display',
    fallback: 'Arial, sans-serif'
  },
  'chillax': {
    name: 'Chillax',
    category: 'sans-serif',
    variable: '--font-chillax',
    fallback: 'Arial, sans-serif'
  },
  'switzer': {
    name: 'Switzer',
    category: 'sans-serif',
    variable: '--font-switzer',
    fallback: 'Arial, sans-serif'
  },
  'epilogue': {
    name: 'Epilogue',
    category: 'sans-serif',
    variable: '--font-epilogue',
    fallback: 'Arial, sans-serif'
  },
  'lexend': {
    name: 'Lexend',
    category: 'sans-serif',
    variable: '--font-lexend',
    fallback: 'Arial, sans-serif'
  },
  'readex-pro': {
    name: 'Readex Pro',
    category: 'sans-serif',
    variable: '--font-readex-pro',
    fallback: 'Arial, sans-serif'
  },
  'ibm-plex-sans': {
    name: 'IBM Plex Sans',
    category: 'sans-serif',
    variable: '--font-ibm-plex-sans',
    fallback: 'Arial, sans-serif'
  },
  'source-sans-3': {
    name: 'Source Sans 3',
    category: 'sans-serif',
    variable: '--font-source-sans-3',
    fallback: 'Arial, sans-serif'
  },
  'noto-sans': {
    name: 'Noto Sans',
    category: 'sans-serif',
    variable: '--font-noto-sans',
    fallback: 'Arial, sans-serif'
  },
  'rubik': {
    name: 'Rubik',
    category: 'sans-serif',
    variable: '--font-rubik',
    fallback: 'Arial, sans-serif'
  },
  'quicksand': {
    name: 'Quicksand',
    category: 'sans-serif',
    variable: '--font-quicksand',
    fallback: 'Arial, sans-serif'
  },
  'mulish': {
    name: 'Mulish',
    category: 'sans-serif',
    variable: '--font-mulish',
    fallback: 'Arial, sans-serif'
  },
  'karla': {
    name: 'Karla',
    category: 'sans-serif',
    variable: '--font-karla',
    fallback: 'Arial, sans-serif'
  },
  'tajawal': {
    name: 'Tajawal',
    category: 'sans-serif',
    variable: '--font-tajawal',
    fallback: 'Arial, sans-serif'
  },
  // Professional Marketing Serif Fonts
  'cormorant-garamond': {
    name: 'Cormorant Garamond',
    category: 'serif',
    variable: '--font-cormorant-garamond',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'libre-caslon-display': {
    name: 'Libre Caslon Display',
    category: 'serif',
    variable: '--font-libre-caslon-display',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'baskervville': {
    name: 'Baskervville',
    category: 'serif',
    variable: '--font-baskervville',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'crimson-pro': {
    name: 'Crimson Pro',
    category: 'serif',
    variable: '--font-crimson-pro',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'lora': {
    name: 'Lora',
    category: 'serif',
    variable: '--font-lora',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'vollkorn': {
    name: 'Vollkorn',
    category: 'serif',
    variable: '--font-vollkorn',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'alegreya': {
    name: 'Alegreya',
    category: 'serif',
    variable: '--font-alegreya',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'domine': {
    name: 'Domine',
    category: 'serif',
    variable: '--font-domine',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'spectral': {
    name: 'Spectral',
    category: 'serif',
    variable: '--font-spectral',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  'pt-serif': {
    name: 'PT Serif',
    category: 'serif',
    variable: '--font-pt-serif',
    fallback: 'Georgia, "Times New Roman", serif'
  },
  // Additional Monospace Fonts
  'source-code-pro': {
    name: 'Source Code Pro',
    category: 'monospace',
    variable: '--font-source-code-pro',
    fallback: 'Monaco, "Cascadia Code", "Roboto Mono", monospace'
  },
  'cascadia-code': {
    name: 'Cascadia Code',
    category: 'monospace',
    variable: '--font-cascadia-code',
    fallback: 'Monaco, "Roboto Mono", monospace'
  },
  'roboto-mono': {
    name: 'Roboto Mono',
    category: 'monospace',
    variable: '--font-roboto-mono',
    fallback: 'Monaco, "Cascadia Code", monospace'
  },
  'inconsolata': {
    name: 'Inconsolata',
    category: 'monospace',
    variable: '--font-inconsolata',
    fallback: 'Monaco, "Cascadia Code", "Roboto Mono", monospace'
  },
  'courier-prime': {
    name: 'Courier Prime',
    category: 'monospace',
    variable: '--font-courier-prime',
    fallback: 'Monaco, "Cascadia Code", "Roboto Mono", monospace'
  }
};

interface ThemeContextType {
  theme: Theme;
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
  getFontConfig: (font: FontFamily) => FontConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useState<Theme>('dark');
  const [fontFamily, setFontFamilyState] = useState<FontFamily>('inter');
  const [mounted, setMounted] = useState(false);

  // Apply font to document
  const applyFont = React.useCallback((font: FontFamily) => {
    const config = FONT_CONFIGS[font];
    if (config) {
      // Update CSS custom properties
      const fontFamilyValue = `var(${config.variable}), ${config.fallback}`;
      document.documentElement.style.setProperty('--font-family-primary', fontFamilyValue);
      
      // Also apply directly to body for immediate effect
      document.body.style.fontFamily = fontFamilyValue;
      
      // Store in localStorage
      localStorage.setItem('fontFamily', font);
      
    }
  }, []);

  // Font family setter
  const setFontFamily = React.useCallback((font: FontFamily) => {
    setFontFamilyState(font);
    applyFont(font);
  }, [applyFont]);

  // Get font config helper
  const getFontConfig = React.useCallback((font: FontFamily): FontConfig => {
    return FONT_CONFIGS[font] || FONT_CONFIGS['inter'];
  }, []);

  // Initialize theme and font
  useEffect(() => {
    setMounted(true);
    
    // Set theme
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    // Get font from localStorage or default to 'inter'
    const savedFont = localStorage.getItem('fontFamily') as FontFamily;
    const initialFont = savedFont && FONT_CONFIGS[savedFont] ? savedFont : 'inter';
    setFontFamilyState(initialFont);
    
    // Apply initial font
    applyFont(initialFont);
  }, [applyFont]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div 
        style={{ 
          visibility: 'hidden',
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      fontFamily, 
      setFontFamily, 
      getFontConfig 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

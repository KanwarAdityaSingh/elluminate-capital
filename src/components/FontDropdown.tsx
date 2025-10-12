'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, FontFamily, FontConfig, FONT_CONFIGS } from '@/contexts/ThemeContext';

// Loading component for when context is not ready
const FontDropdownLoading: React.FC = () => (
  <div className="font-dropdown-container">
    <button
      className="font-selector-button"
      disabled
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-3)',
        background: 'rgba(74, 44, 90, 0.1)',
        border: '1px solid var(--border-purple-soft)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--text-primary)',
        fontSize: 'var(--text-sm)',
        minWidth: '140px',
        justifyContent: 'space-between',
        opacity: 0.5
      }}
    >
      <span>Aa</span>
      <span>Loading...</span>
      <span>▼</span>
    </button>
  </div>
);

// Main dropdown component that uses the theme context
const FontDropdownContent: React.FC = () => {
  const { fontFamily, setFontFamily, getFontConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group fonts by category
  const fontCategories = {
    'Sans-serif': Object.entries(FONT_CONFIGS).filter(([_, config]) => config.category === 'sans-serif'),
    'Serif': Object.entries(FONT_CONFIGS).filter(([_, config]) => config.category === 'serif'),
    'Monospace': Object.entries(FONT_CONFIGS).filter(([_, config]) => config.category === 'monospace'),
  };

  // Filter fonts based on search term
  const filteredCategories = Object.entries(fontCategories).reduce((acc, [category, fonts]) => {
    const filtered = fonts.filter(([key, config]) => 
      config.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      (acc as any)[category] = filtered;
    }
    return acc;
  }, {} as Record<string, [string, FontConfig][]>);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);


  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleFontSelect = (fontKey: FontFamily) => {
    setFontFamily(fontKey);
    setIsOpen(false);
    setSearchTerm('');
  };

  const currentFont = getFontConfig(fontFamily);

  return (
    <div className="font-dropdown-container" ref={dropdownRef}>
      {/* Font Selector Button */}
      <button
        className="font-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select font family"
        style={{ 
          border: isOpen ? '1px solid var(--border-accent)' : '1px solid var(--border-purple-soft)',
          backgroundColor: isOpen ? 'rgba(74, 44, 90, 0.2)' : 'rgba(74, 44, 90, 0.1)'
        }}
      >
        <span className="font-selector-icon">Aa</span>
        <span className="font-selector-text">{currentFont.name}</span>
        <span className={`font-selector-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="font-dropdown-menu">
          {/* Search Input */}
          <div className="font-search-container">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search fonts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-search-input"
              onKeyDown={handleKeyDown}
            />
          </div>

           {/* Font List */}
           <div 
             ref={scrollContainerRef}
             className="font-list-container"
             onWheel={(e) => {
               // Convert wheel events to scroll
               e.preventDefault();
               e.stopPropagation();
               const container = e.currentTarget;
               container.scrollTop += e.deltaY;
             }}
           >
             {Object.entries(filteredCategories).map(([category, fonts]) => (
               <div key={category} className="font-category">
                 <div className="font-category-header">{category}</div>
                 {fonts.map(([fontKey, config]) => (
                   <button
                     key={fontKey}
                     className={`font-option ${fontKey === fontFamily ? 'selected' : ''}`}
                     onClick={() => handleFontSelect(fontKey as FontFamily)}
                     style={{
                       fontFamily: `var(${config.variable}), ${config.fallback}`
                     }}
                   >
                     <span className="font-option-name">{config.name}</span>
                     <span className="font-option-preview">Aa</span>
                   </button>
                 ))}
               </div>
             ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .font-dropdown-container {
          position: relative;
          display: inline-block;
          /* Ensure container doesn't interfere with page scroll */
          isolation: isolate;
        }

        .font-selector-button {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: rgba(74, 44, 90, 0.1);
          border: 1px solid var(--border-purple-soft);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-size: var(--text-sm);
          min-width: 140px;
          justify-content: space-between;
        }

        .font-selector-button:hover {
          background: rgba(74, 44, 90, 0.2);
          border-color: var(--border-accent);
        }

        .font-selector-button:focus {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }

        .font-selector-icon {
          font-weight: var(--font-weight-bold);
          font-size: var(--text-base);
        }

        .font-selector-text {
          flex: 1;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .font-selector-arrow {
          transition: transform var(--transition-fast);
          font-size: var(--text-xs);
        }

        .font-selector-arrow.open {
          transform: rotate(180deg);
        }

        .font-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: var(--space-1);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          z-index: var(--z-dropdown);
          max-height: 400px;
          min-height: 200px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          /* Ensure proper positioning */
          position: absolute !important;
        }

        .font-search-container {
          padding: var(--space-3);
          border-bottom: 1px solid var(--border-primary);
        }

        .font-search-input {
          width: 100%;
          padding: var(--space-2) var(--space-3);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-secondary);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: var(--text-sm);
          transition: border-color var(--transition-fast);
        }

        .font-search-input:focus {
          outline: none;
          border-color: var(--border-focus);
        }

        .font-search-input::placeholder {
          color: var(--text-muted);
        }

        .font-list-container {
          flex: 1;
          overflow-y: scroll !important;
          overflow-x: hidden;
          max-height: 300px;
          min-height: 200px;
          padding: var(--space-2);
          /* Force scrolling to work */
          -webkit-overflow-scrolling: touch;
          /* Ensure scrollable content */
          position: relative;
        }

        /* Custom scrollbar for the font list */
        .font-list-container::-webkit-scrollbar {
          width: 6px;
        }

        .font-list-container::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .font-list-container::-webkit-scrollbar-thumb {
          background: var(--border-secondary);
          border-radius: var(--radius-sm);
        }

        .font-list-container::-webkit-scrollbar-thumb:hover {
          background: var(--border-accent);
        }

        /* Firefox scrollbar */
        .font-list-container {
          scrollbar-width: thin;
          scrollbar-color: var(--border-secondary) var(--bg-tertiary);
        }

        .font-category {
          margin-bottom: var(--space-3);
        }

        .font-category:last-child {
          margin-bottom: 0;
        }

        .font-category-header {
          padding: var(--space-1) var(--space-2);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-semibold);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          border-bottom: 1px solid var(--border-primary);
          margin-bottom: var(--space-2);
        }

        .font-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: var(--space-2) var(--space-3);
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          font-size: var(--text-sm);
        }

        .font-option:hover {
          background: rgba(74, 44, 90, 0.1);
        }

        .font-option:focus {
          outline: 2px solid var(--border-focus);
          outline-offset: -2px;
        }

        .font-option.selected {
          background: rgba(212, 175, 55, 0.1);
          color: var(--text-accent);
        }

        .font-option.selected .font-option-preview {
          color: var(--text-accent);
        }

        .font-option-name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .font-option-preview {
          font-weight: var(--font-weight-bold);
          font-size: var(--text-base);
          margin-left: var(--space-2);
          opacity: 0.7;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .font-dropdown-menu {
            left: -100px;
            right: -100px;
            min-width: 250px;
          }
        }

        /* Prevent body scroll when dropdown is open */
        .font-dropdown-container:has(.font-dropdown-menu) {
          position: relative;
        }
      `}</style>
    </div>
  );
};

// Wrapper component that handles context safety
const FontDropdown: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state until mounted
  if (!mounted) {
    return <FontDropdownLoading />;
  }

  // Try to render the main component, fallback to loading if context error
  try {
    return <FontDropdownContent />;
  } catch (error) {
    return <FontDropdownLoading />;
  }
};

export default FontDropdown;

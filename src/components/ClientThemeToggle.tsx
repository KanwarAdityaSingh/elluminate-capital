'use client';

import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const ClientThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  return <ThemeToggle />;
};

export default ClientThemeToggle;

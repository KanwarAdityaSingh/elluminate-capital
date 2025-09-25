'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top when pathname changes
  useEffect(() => {
    // Small delay to ensure the page has rendered
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      // Also scroll the Lenis instance if it exists
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScrollProvider;
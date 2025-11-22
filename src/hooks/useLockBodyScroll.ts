import { useLayoutEffect } from 'react';

export function useLockBodyScroll(locked: boolean): void {
  useLayoutEffect(() => {
    const { body } = document;
    if (!body) return;

    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    if (locked) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}




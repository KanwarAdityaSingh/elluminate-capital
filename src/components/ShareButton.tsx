'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

type ShareButtonProps = {
  title: string;
};

export default function ShareButton({ title }: ShareButtonProps) {
  const handleClick = () => {
    if (typeof window === 'undefined') return;
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      alert('Link copied to clipboard');
    }
  };

  return (
    <button
      style={{
        padding: '10px 16px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-accent)',
        color: 'var(--text-inverse)',
        border: 'none',
        fontWeight: 600,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Share2 size={16} /> Share
      </span>
    </button>
  );
}



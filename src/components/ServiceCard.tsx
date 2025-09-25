'use client';

import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div
      style={{
        padding: 'var(--space-8)',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-primary)',
        boxShadow: 'var(--shadow-lg)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
        minWidth: '250px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
        e.currentTarget.style.borderColor = 'var(--border-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = 'var(--border-primary)';
      }}
    >
      <h3
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-4)',
          fontFamily: 'var(--font-family-heading)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;

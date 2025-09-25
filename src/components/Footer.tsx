'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Investment Advisory', href: '/services#advisory' },
        { name: 'Capital Markets', href: '/services#capital' },
        { name: 'M&A Advisory', href: '/services#ma' },
        { name: 'Wealth Management', href: '/services#wealth' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/about#team' },
        { name: 'Careers', href: '/careers' },
        { name: 'News & Insights', href: '/insights' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Market Reports', href: '/insights#reports' },
        { name: 'Research', href: '/insights#research' },
        { name: 'Client Portal', href: '/portal' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
  ];

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        marginTop: 'var(--space-20)',
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6) var(--space-8)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-12)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {/* Company Info */}
          <div>
            <h3
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
              }}
            >
              Elluminate Capital
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: 'var(--space-6)',
              }}
            >
              Professional investment banking services with a focus on delivering exceptional 
              value to our clients through strategic advisory and comprehensive financial solutions.
            </p>
            
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Mail size={16} color="var(--text-accent)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  info@elluminatecapital.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Phone size={16} color="var(--text-accent)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <MapPin size={16} color="var(--text-accent)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  123 Financial District, New York, NY 10004
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {section.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.name} style={{ marginBottom: 'var(--space-2)' }}>
                    <Link
                      href={link.href}
                      style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: 'var(--text-sm)',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--border-primary)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-accent)';
                    e.currentTarget.style.color = 'var(--text-inverse)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-primary)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  aria-label={social.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--color-accent)',
              color: 'var(--text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-dark)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: 'var(--bg-tertiary)',
          borderTop: '1px solid var(--border-primary)',
          padding: 'var(--space-4) var(--space-6)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-sm)',
              margin: 0,
            }}
          >
            © {currentYear} Elluminate Capital. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <Link
              href="/privacy"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: 'var(--text-sm)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

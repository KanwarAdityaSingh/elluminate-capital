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
        background: 'var(--bg-primary)',
        borderTop: '1px solid rgba(184, 149, 106, 0.3)',
        marginTop: '0',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/videos/853853-hd_1920_1080_24fps.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2,
        }}
      />

      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6) var(--space-8)',
          position: 'relative',
          zIndex: 3,
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
                color: '#B8956A',
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
                <Mail size={16} color="#B8956A" />
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  info@elluminatecapital.com
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Phone size={16} color="#B8956A" />
                <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <MapPin size={16} color="#B8956A" />
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
                  color: '#B8956A',
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
                        e.currentTarget.style.color = '#B8956A';
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
            borderTop: '1px solid rgba(184, 149, 106, 0.3)',
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
                    background: 'transparent',
                    border: '1px solid rgba(184, 149, 106, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(184, 149, 106, 0.1)';
                    e.currentTarget.style.borderColor = '#B8956A';
                    e.currentTarget.style.color = '#B8956A';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(184, 149, 106, 0.3)';
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
              background: 'transparent',
              color: '#ffffff',
              border: '2px solid #ffffff',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ffffff';
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
          background: 'transparent',
          borderTop: 'none',
          padding: 'var(--space-4) var(--space-6)',
          position: 'relative',
          zIndex: 3,
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
                e.currentTarget.style.color = '#B8956A';
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
                e.currentTarget.style.color = '#B8956A';
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

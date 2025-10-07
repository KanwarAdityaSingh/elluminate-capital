'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart3, Globe, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { HeroContent } from '../types/api';

interface HeroSectionProps {
  heroContent: HeroContent | null;
  visionContent?: HeroContent | null;
  isVisible?: boolean;
}

export default function HeroSection({ heroContent, visionContent, isVisible: parentIsVisible }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ clients: 0, deals: 0, years: 0, assets: 0 });
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(parentIsVisible ?? true);
    
    // Only animate if we have hero content data
    if (!heroContent) return;
    
    // Animate statistics using API data or fallback values
    const animateStats = () => {
      const targets = heroContent?.stats || { clients: 500, deals: 1200, years: 15, assets: 50 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          clients: Math.floor(targets.clients * easeOut),
          deals: Math.floor(targets.deals * easeOut),
          years: Math.floor(targets.years * easeOut),
          assets: Math.floor(targets.assets * easeOut)
        });
        
        if (step >= steps) clearInterval(timer);
      }, stepDuration);
      
      // Cleanup function to clear timer if component unmounts
      return () => clearInterval(timer);
    };
    
    const timeoutId = setTimeout(animateStats, 500);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [heroContent]); // Only re-run when heroContent changes

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            {heroContent?.title ? (
              (() => {
                const words = heroContent.title.split(' ');
                return (
                  <>
                    <span className="hero-title-main">{words[0]}</span>
                    <span className="hero-title-accent">{words.slice(1, -1).join(' ')}</span>
                    <span className="hero-title-sub">{words[words.length - 1]}</span>
                  </>
                );
              })()
            ) : (
              <>
                <span className="hero-title-main">Elevating</span>
                <span className="hero-title-accent">Capital Markets</span>
                <span className="hero-title-sub">Excellence</span>
              </>
            )}
          </h1>
          
          <p className="hero-description">
            {heroContent?.subtitle || "We deliver sophisticated investment banking solutions that drive growth, maximize value, and create lasting success for our clients across global markets."}
          </p>
          
          {/* Statistics within Hero */}
          <div className="hero-stats">
            {heroContent?.displayStats?.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            )) || (
              <>
                <div className="stat-item">
                  <div className="stat-number">{stats.clients}+</div>
                  <div className="stat-label">Global Clients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">${stats.deals}B+</div>
                  <div className="stat-label">Deals Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.years}+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">${stats.assets}B+</div>
                  <div className="stat-label">Assets Under Management</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Merged Video & Insights Section */}
      <section className="merged-video-section">
        <div className="video-background">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
          >
            <source src="/videos/mainvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        
        <div className="merged-content">
          <h2 className="merged-title">
            {visionContent?.title ? (
              (() => {
                const words = visionContent.title.split(' ');
                return (
                  <>
                    {words.map((word, index) => (
                      <span key={index} className={word.toLowerCase().includes('vision') || word.toLowerCase().includes('insights') ? 'highlight' : ''}>
                        {word}{index < words.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </>
                );
              })()
            ) : (
              <>
                Where <span className="highlight">Vision</span> Meets <span className="highlight">Expert Insights</span>
              </>
            )}
          </h2>
          
          <p className="merged-description">
            {visionContent?.subtitle || "Experience the power of strategic investment banking combined with comprehensive market research, cutting-edge analysis, and proven strategies that drive exceptional results across global markets."}
          </p>
          
          <div className="merged-features">
            {visionContent?.features?.map((feature, index) => {
              const icons = [BarChart3, Globe, DollarSign];
              const IconComponent = icons[index] || BarChart3;
              
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={28} />
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            }) || (
              <>
                <div className="feature-card">
                  <div className="feature-icon">
                    <BarChart3 size={28} />
                  </div>
                  <div className="feature-content">
                    <h4>Advanced Market Analysis</h4>
                    <p>In-depth research and trend analysis with real-time market intelligence</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <Globe size={28} />
                  </div>
                  <div className="feature-content">
                    <h4>Global Market Coverage</h4>
                    <p>Worldwide insights and opportunities across all major financial markets</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <DollarSign size={28} />
                  </div>
                  <div className="feature-content">
                    <h4>Strategic Investment Solutions</h4>
                    <p>Proven strategies for portfolio optimization and wealth maximization</p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="merged-actions">
            <Link 
              href="/insights" 
              className="btn-primary-action"
              onMouseEnter={() => setHoveredButton('primary-action')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-5) var(--space-10)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-bold)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                fontSize: 'var(--text-lg)',
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                color: '#000',
                boxShadow: hoveredButton === 'primary-action' 
                  ? '0 15px 35px rgba(212, 175, 55, 0.6)' 
                  : '0 8px 25px rgba(212, 175, 55, 0.4)',
                transform: hoveredButton === 'primary-action' ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
              }}
            >
              {visionContent?.buttons?.[0] || "Explore Market Insights"}
              <ArrowRight size={22} />
            </Link>
            <Link 
              href="/records"
              className="btn-tertiary-action"
              onMouseEnter={() => setHoveredButton('tertiary-action')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-5) var(--space-10)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(212, 175, 55, 0.8)',
                fontSize: 'var(--text-lg)',
                background: hoveredButton === 'tertiary-action' 
                  ? 'rgba(212, 175, 55, 0.2)' 
                  : 'transparent',
                color: '#D4AF37',
                backdropFilter: 'blur(15px)',
                transform: hoveredButton === 'tertiary-action' ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
              }}
            >
              {visionContent?.buttons?.[1] || "Get Custom Analysis"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

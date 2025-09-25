'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, ArrowRight, BarChart3, Globe, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ clients: 0, deals: 0, years: 0, assets: 0 });
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate statistics
    const animateStats = () => {
      const targets = { clients: 500, deals: 1200, years: 15, assets: 50 };
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
    };
    
    setTimeout(animateStats, 500);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-content">

          
          <h1 className="hero-title">
            <span className="hero-title-main">Elevating</span>
            <span className="hero-title-accent">Capital Markets</span>
            <span className="hero-title-sub">Excellence</span>
          </h1>
          
          <p className="hero-description">
            We deliver sophisticated investment banking solutions that drive growth, 
            maximize value, and create lasting success for our clients across global markets.
          </p>
          
          {/* Statistics within Hero */}
          <div className="hero-stats">
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
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
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
        
        <div className="video-content">
          <h2 className="video-title">
            Where <span className="highlight">Vision</span> Meets <span className="highlight">Execution</span>
          </h2>
          
          <p className="video-description">
            Experience the power of strategic investment banking through our state-of-the-art 
            facilities and cutting-edge technology that drives exceptional results.
          </p>
          
          <div className="video-actions">
            <Link 
              href="/about" 
              className="btn-primary"
              onMouseEnter={() => setHoveredButton('primary')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-medium)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                fontSize: 'var(--text-lg)',
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                color: '#000',
                boxShadow: hoveredButton === 'primary' 
                  ? '0 8px 25px rgba(212, 175, 55, 0.4)' 
                  : '0 4px 15px rgba(212, 175, 55, 0.3)',
                transform: hoveredButton === 'primary' ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              Learn About Us
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contact" 
              className="btn-outline"
              onMouseEnter={() => setHoveredButton('outline')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-medium)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                fontSize: 'var(--text-lg)',
                background: hoveredButton === 'outline' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'transparent',
                color: 'white',
                backdropFilter: 'blur(10px)',
                transform: hoveredButton === 'outline' ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-gradient"></div>
          <div className="cta-pattern"></div>
        </div>
        
        <div className="cta-content">
 
          
          <h2 className="cta-title">
            Stay Ahead with <span className="cta-title-accent">Expert Insights</span>
          </h2>
          
          <p className="cta-description">
            Access our comprehensive market research, investment analysis, and strategic insights 
            to make informed decisions in today's dynamic financial landscape.
          </p>
          
          <div className="cta-features">
            <div className="cta-feature">
              <div className="cta-feature-icon">
                <BarChart3 size={24} />
              </div>
              <div className="cta-feature-text">
                <h4>Market Analysis</h4>
                <p>In-depth research and trend analysis</p>
              </div>
            </div>
            <div className="cta-feature">
              <div className="cta-feature-icon">
                <Globe size={24} />
              </div>
              <div className="cta-feature-text">
                <h4>Global Coverage</h4>
                <p>Worldwide market insights and opportunities</p>
              </div>
            </div>
            <div className="cta-feature">
              <div className="cta-feature-icon">
                <DollarSign size={24} />
              </div>
              <div className="cta-feature-text">
                <h4>Investment Strategies</h4>
                <p>Proven strategies for portfolio optimization</p>
              </div>
            </div>
          </div>
          
          <div className="cta-actions">
            <Link 
              href="/insights" 
              className="btn-cta-primary"
              onMouseEnter={() => setHoveredButton('cta-primary')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                fontSize: 'var(--text-lg)',
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                color: '#000',
                boxShadow: hoveredButton === 'cta-primary' 
                  ? '0 12px 30px rgba(212, 175, 55, 0.5)' 
                  : '0 6px 20px rgba(212, 175, 55, 0.3)',
                transform: hoveredButton === 'cta-primary' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              }}
            >
              Explore Insights
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contact" 
              className="btn-cta-outline"
              onMouseEnter={() => setHoveredButton('cta-outline')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid var(--color-accent)',
                fontSize: 'var(--text-lg)',
                background: hoveredButton === 'cta-outline' 
                  ? 'var(--color-accent)' 
                  : 'transparent',
                color: hoveredButton === 'cta-outline' ? '#000' : 'var(--color-accent)',
                transform: hoveredButton === 'cta-outline' ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              }}
            >
              Get Custom Report
            </Link>
          </div>
        </div>
      </section>

      {/* Ending Section */}
      <section className="ending-section">
        <div className="ending-background">
          <div className="ending-gradient"></div>
          <div className="ending-pattern"></div>
        </div>
        
        <div className="ending-content">
          <div className="ending-main">
            <h2 className="ending-title">
              Ready to <span className="ending-title-accent">Transform</span> Your Investment Strategy?
            </h2>
            
            <p className="ending-description">
              Join hundreds of successful investors who trust Elluminate Capital for their most critical financial decisions. 
              Let our expertise guide you toward unprecedented growth and success.
            </p>
            
            <div className="ending-stats">
              <div className="ending-stat">
                <div className="ending-stat-number">15+</div>
                <div className="ending-stat-label">Years of Excellence</div>
              </div>
              <div className="ending-stat">
                <div className="ending-stat-number">500+</div>
                <div className="ending-stat-label">Successful Clients</div>
              </div>
              <div className="ending-stat">
                <div className="ending-stat-number">$50B+</div>
                <div className="ending-stat-label">Assets Managed</div>
              </div>
              <div className="ending-stat">
                <div className="ending-stat-number">98%</div>
                <div className="ending-stat-label">Client Satisfaction</div>
              </div>
            </div>
            
            <div className="ending-actions">
              <Link 
                href="/records" 
                className="btn-ending-primary"
                onMouseEnter={() => setHoveredButton('ending-primary')}
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
                  fontSize: 'var(--text-xl)',
                  background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                  color: '#000',
                  boxShadow: hoveredButton === 'ending-primary' 
                    ? '0 15px 35px rgba(212, 175, 55, 0.6)' 
                    : '0 8px 25px rgba(212, 175, 55, 0.4)',
                  transform: hoveredButton === 'ending-primary' ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
                }}
              >
                View Our Track Record
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        
        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 120vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 80px 0 var(--space-20);
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            var(--bg-primary) 0%, 
            var(--bg-secondary) 50%, 
            var(--bg-primary) 100%);
        }
        
        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 25% 25%, var(--color-accent) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, var(--color-accent) 0%, transparent 50%);
          opacity: 0.1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          text-align: center;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.6s ease;
        }
        
        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          font-family: var(--font-family-heading);
        }
        
        .hero-title-main {
          display: block;
          color: var(--text-primary);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .hero-title-accent {
          display: block;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
        }
        
        .hero-title-sub {
          display: block;
          color: var(--text-primary);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
        }
        
        .hero-description {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto var(--space-12);
          line-height: 1.6;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .hero-stats {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 1.2s;
        }
        
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: var(--text-5xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-accent);
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
        }
        
        .stat-label {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }
        
        /* Video Section */
        .video-section {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .background-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.9) 100%
          );
          z-index: 2;
        }
        
        .video-content {
          position: relative;
          z-index: 3;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          text-align: center;
          color: white;
        }
        
        .video-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.2;
          margin-bottom: var(--space-8);
          font-family: var(--font-family-heading);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
          color: white;
        }
        
        .video-title .highlight {
          background: linear-gradient(45deg, #D4AF37, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        }
        
        .video-description {
          font-size: var(--text-xl);
          color: white;
          max-width: 600px;
          margin: 0 auto var(--space-8);
          line-height: 1.6;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }
        
        .video-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
          margin-top: var(--space-8);
        }
        
        .btn-primary, .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          transition: all var(--transition-normal);
          border: 2px solid transparent;
          font-size: var(--text-lg);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #000;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
        }
        
        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }
        
        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          transform: translateY(-2px);
        }
        
        /* Responsive Design for Video Section */
        @media (max-width: 768px) {
          .video-section {
            height: 80vh;
          }
          
          .video-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn-primary, .btn-outline {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
        
        /* CTA Section */
        .cta-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: var(--space-20) 0;
          background: var(--bg-primary);
        }
        
        .cta-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .cta-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            var(--bg-primary) 0%, 
            var(--bg-secondary) 30%, 
            var(--bg-accent) 70%,
            var(--bg-primary) 100%);
        }
        
        .cta-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, var(--color-accent) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, var(--color-accent) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, var(--color-accent-soft) 0%, transparent 30%);
          opacity: 0.08;
        }
        
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          text-align: center;
        }
        
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-full);
          color: var(--text-accent);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-8);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(20px)'};
          transition: all 0.6s ease;
          box-shadow: var(--shadow-md);
        }
        
        .cta-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          font-family: var(--font-family-heading);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .cta-title-accent {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .cta-description {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto var(--space-12);
          line-height: 1.6;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
        }
        
        .cta-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-8);
          margin-bottom: var(--space-12);
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
        }
        
        .cta-feature {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-sm);
        }
        
        .cta-feature:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-accent);
        }
        
        .cta-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: var(--gradient-accent);
          border-radius: var(--radius-lg);
          color: #000;
          flex-shrink: 0;
        }
        
        .cta-feature-text {
          text-align: left;
        }
        
        .cta-feature-text h4 {
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
        }
        
        .cta-feature-text p {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
        
        .cta-actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .btn-cta-primary, .btn-cta-outline {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-semibold);
          text-decoration: none;
          transition: all var(--transition-normal);
          border: 2px solid transparent;
          font-size: var(--text-lg);
        }
        
        .btn-cta-primary {
          background: linear-gradient(135deg, #D4AF37, #FFD700);
          color: #000;
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
        }
        
        .btn-cta-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(212, 175, 55, 0.5);
        }
        
        .btn-cta-outline {
          background: transparent;
          color: var(--color-accent);
          border: 2px solid var(--color-accent);
        }
        
        .btn-cta-outline:hover {
          background: var(--color-accent);
          color: #000;
          transform: translateY(-3px) scale(1.02);
        }
        
        /* Responsive Design for CTA Section */
        @media (max-width: 768px) {
          .cta-section {
            min-height: 80vh;
            padding: var(--space-16) 0;
          }
          
          .cta-features {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
          
          .cta-feature {
            flex-direction: column;
            text-align: center;
          }
          
          .cta-feature-text {
            text-align: center;
          }
          
          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .btn-cta-primary, .btn-cta-outline {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
        
        /* Ending Section */
        .ending-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--bg-primary);
        }
        
        .ending-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .ending-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            var(--bg-primary) 0%, 
            var(--bg-secondary) 40%, 
            var(--bg-accent) 80%,
            var(--bg-primary) 100%);
        }
        
        .ending-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 15% 15%, var(--color-accent) 0%, transparent 35%),
            radial-gradient(circle at 85% 85%, var(--color-accent) 0%, transparent 35%),
            radial-gradient(circle at 50% 50%, var(--color-accent-soft) 0%, transparent 25%);
          opacity: 0.06;
        }
        
        .ending-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .ending-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: var(--space-20) var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        
        .ending-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: var(--font-weight-bold);
          line-height: 1.1;
          margin-bottom: var(--space-6);
          font-family: var(--font-family-heading);
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.2s;
        }
        
        .ending-title-accent {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .ending-description {
          font-size: var(--text-xl);
          color: var(--text-secondary);
          max-width: 800px;
          margin: 0 auto var(--space-12);
          line-height: 1.6;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
        }
        
        .ending-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-8);
          margin-bottom: var(--space-12);
          max-width: 1000px;
          width: 100%;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.6s;
        }
        
        .ending-stat {
          text-align: center;
          padding: var(--space-6);
          background: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          transition: all var(--transition-normal);
        }
        
        .ending-stat:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-accent);
        }
        
        .ending-stat-number {
          font-size: var(--text-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-accent);
          margin-bottom: var(--space-2);
          font-family: var(--font-family-heading);
        }
        
        .ending-stat-label {
          font-size: var(--text-lg);
          color: var(--text-secondary);
          font-weight: var(--font-weight-medium);
        }
        
        .ending-actions {
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.8s;
        }
        
        .btn-ending-primary {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-5) var(--space-10);
          border-radius: var(--radius-lg);
          font-weight: var(--font-weight-bold);
          text-decoration: none;
          transition: all var(--transition-normal);
          border: 2px solid transparent;
          font-size: var(--text-xl);
        }
        
        .btn-ending-primary:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.6);
        }
        
        /* Responsive Design for Ending Section */
        @media (max-width: 768px) {
          .ending-section {
            min-height: 80vh;
          }
          
          .ending-main {
            padding: var(--space-16) var(--space-4);
          }
          
          .ending-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-4);
          }
          
          .btn-ending-primary {
            padding: var(--space-4) var(--space-8);
            font-size: var(--text-lg);
          }
        }
        
        @media (max-width: 480px) {
          .ending-stats {
            grid-template-columns: 1fr;
          }
        }
        
      `}</style>
    </div>
  );
}
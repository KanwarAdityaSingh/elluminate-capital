'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, ArrowRight, BarChart3, Globe, DollarSign, Building2, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { HeroContent } from '../types/api';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [visionContent, setVisionContent] = useState<HeroContent | null>(null);
  const [storyContent, setStoryContent] = useState<HeroContent | null>(null);
  const [leadershipContent, setLeadershipContent] = useState<HeroContent | null>(null);
  const [investmentStrategyContent, setInvestmentStrategyContent] = useState<HeroContent | null>(null);
  const [partnersContent, setPartnersContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Fetch page content on component mount
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        // Fetch landing, vision, story, leadership team, investment strategy, and partners content in parallel
        const [landingResponse, visionResponse, storyResponse, leadershipResponse, investmentStrategyResponse, partnersResponse] = await Promise.all([
          fetch('http://localhost:5050/page/getPageContent?pageType=landing'),
          fetch('http://localhost:5050/page/getPageContent?pageType=vision'),
          fetch('http://localhost:5050/page/getPageContent?pageType=story'),
          fetch('http://localhost:5050/page/getPageContent?pageType=leadershipTeam'),
          fetch('http://localhost:5050/page/getPageContent?pageType=investmentStrategy'),
          fetch('http://localhost:5050/page/getPageContent?pageType=partners')
        ]);

        const [landingData, visionData, storyData, leadershipData, investmentStrategyData, partnersData] = await Promise.all([
          landingResponse.json(),
          visionResponse.json(),
          storyResponse.json(),
          leadershipResponse.json(),
          investmentStrategyResponse.json(),
          partnersResponse.json()
        ]);

        // Transform landing data
        if (landingData.success && landingData.data) {
          const transformedLandingData = {
            title: landingData.data.title,
            subtitle: landingData.data.subtitle,
            stats: {
              clients: parseFloat(landingData.data.numbers[0]?.value.replace(/[^\d.]/g, '') || '500'),
              deals: parseFloat(landingData.data.numbers[1]?.value.replace(/[^\d.]/g, '') || '1200'),
              years: parseFloat(landingData.data.numbers[2]?.value.replace(/[^\d.]/g, '') || '15'),
              assets: parseFloat(landingData.data.numbers[3]?.value.replace(/[^\d.]/g, '') || '50')
            },
            displayStats: landingData.data.numbers,
            features: landingData.data.items,
            buttons: landingData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Landing API Data received:', landingData.data);
          console.log('Transformed landing data:', transformedLandingData);
          setHeroContent(transformedLandingData);
        }

        // Transform vision data
        if (visionData.success && visionData.data) {
          const transformedVisionData = {
            title: visionData.data.title,
            subtitle: visionData.data.subtitle,
            stats: {
              clients: parseFloat(visionData.data.numbers[0]?.value.replace(/[^\d.]/g, '') || '500'),
              deals: parseFloat(visionData.data.numbers[1]?.value.replace(/[^\d.]/g, '') || '1200'),
              years: parseFloat(visionData.data.numbers[2]?.value.replace(/[^\d.]/g, '') || '15'),
              assets: parseFloat(visionData.data.numbers[3]?.value.replace(/[^\d.]/g, '') || '50')
            },
            displayStats: visionData.data.numbers,
            features: visionData.data.items,
            buttons: visionData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Vision API Data received:', visionData.data);
          console.log('Transformed vision data:', transformedVisionData);
          setVisionContent(transformedVisionData);
        }

        // Transform story data
        if (storyData.success && storyData.data) {
          const transformedStoryData = {
            title: storyData.data.title,
            subtitle: storyData.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: [],
            features: [],
            buttons: []
          };
          console.log('Story API Data received:', storyData.data);
          console.log('Transformed story data:', transformedStoryData);
          setStoryContent(transformedStoryData);
        }

        // Transform leadership team data
        if (leadershipData.success && leadershipData.data) {
          const transformedLeadershipData = {
            title: leadershipData.data.title,
            subtitle: leadershipData.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: [],
            features: leadershipData.data.items,
            buttons: leadershipData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Leadership API Data received:', leadershipData.data);
          console.log('Transformed leadership data:', transformedLeadershipData);
          setLeadershipContent(transformedLeadershipData);
        }

        // Transform investment strategy data
        if (investmentStrategyData.success && investmentStrategyData.data) {
          const transformedInvestmentStrategyData = {
            title: investmentStrategyData.data.title,
            subtitle: investmentStrategyData.data.subtitle,
            stats: {
              clients: parseFloat(investmentStrategyData.data.numbers[0]?.value.replace(/[^\d.]/g, '') || '500'),
              deals: parseFloat(investmentStrategyData.data.numbers[1]?.value.replace(/[^\d.]/g, '') || '2500'),
              years: parseFloat(investmentStrategyData.data.numbers[2]?.value.replace(/[^\d.]/g, '') || '15'),
              assets: parseFloat(investmentStrategyData.data.numbers[3]?.value.replace(/[^\d.]/g, '') || '98')
            },
            displayStats: investmentStrategyData.data.numbers,
            features: investmentStrategyData.data.items,
            buttons: investmentStrategyData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Investment Strategy API Data received:', investmentStrategyData.data);
          console.log('Transformed investment strategy data:', transformedInvestmentStrategyData);
          setInvestmentStrategyContent(transformedInvestmentStrategyData);
        }

        // Transform partners data
        if (partnersData.success && partnersData.data) {
          const transformedPartnersData = {
            title: partnersData.data.title,
            subtitle: partnersData.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: [],
            features: [],
            buttons: []
          };
          console.log('Partners API Data received:', partnersData.data);
          console.log('Transformed partners data:', transformedPartnersData);
          setPartnersContent(transformedPartnersData);
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
        // Set fallback content
        setHeroContent(null);
        setVisionContent(null);
        setStoryContent(null);
        setLeadershipContent(null);
        setInvestmentStrategyContent(null);
        setPartnersContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, []); // Empty dependency array - only run once

  const clients: string[] = [
    'Trading.jpeg',
    'trading1.png', 
    'trading2.png',
    'usethis.png'
  ];

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollClients = (direction: 'next' | 'prev') => {
    const el = document.getElementById('carousel-viewport');
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.9, 320);
    el.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-300">
          Loading...
        </div>
              </div>
    );
  }

  return (
    <div className="landing-page min-h-screen bg-gray-900 text-white">
      <HeroSection heroContent={heroContent} visionContent={visionContent} isVisible={isVisible} />

      {/* Our Story & Team Section */}
      <section className="story-team-section">
        <div className="story-team-background">
          <div className="story-team-gradient"></div>
          <div className="story-team-pattern"></div>
        </div>
        
        <div className="story-team-content">
          <div className="story-section">
            <div className="story-header">
              <h2 className="story-title">
                {storyContent?.title ? (
                  <>
                    {storyContent.title.split(' ').map((word, index) => (
                      <span key={index} className={index === 1 ? "story-title-accent" : ""}>
                        {word}{index < storyContent.title.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                Our <span className="story-title-accent">Story</span>
                  </>
                )}
              </h2>
              <p className="story-description">
                {storyContent?.subtitle || "Founded on the principles of excellence and innovation, we have built a legacy of trust and success in the capital markets. Our journey began with a vision to democratize sophisticated investment strategies and make them accessible to clients worldwide."}
              </p>
            </div>
          </div>
          
          <div className="team-section">
            <div className="team-header">
              <h2 className="team-title">
                {leadershipContent?.title ? (
                  <>
                    {leadershipContent.title.split(' ').map((word, index) => (
                      <span key={index} className={index === 1 ? "team-title-accent" : ""}>
                        {word}{index < leadershipContent.title.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    Meet Our <span className="team-title-accent">Leadership</span>
                  </>
                )}
              </h2>
              <p className="team-description">
                {leadershipContent?.subtitle || "Our team of seasoned professionals brings decades of experience in investment banking, portfolio management, and market analysis."}
              </p>
            </div>
            
            <div className="team-grid">
              {leadershipContent?.features?.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-image">
                    <img src="/CompanyLogo.jpeg" alt="Team Member" />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.title}</h3>
                    <p className="member-position">{member.description}</p>
                  </div>
                </div>
              )) || (
                <>
              <div className="team-member">
                <div className="member-image">
                      <img src="/CompanyLogo.jpeg" alt="Team Member" />
                </div>
                <div className="member-info">
                      <h3 className="member-name">Sarah Johnson</h3>
                  <p className="member-position">Chief Executive Officer</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-image">
                      <img src="/CompanyLogo.jpeg" alt="Team Member" />
                </div>
                <div className="member-info">
                      <h3 className="member-name">Michael Chen</h3>
                  <p className="member-position">Chief Investment Officer</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-image">
                      <img src="/CompanyLogo.jpeg" alt="Team Member" />
                </div>
                <div className="member-info">
                  <h3 className="member-name">Emily Rodriguez</h3>
                      <p className="member-position">Head of Research</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-image">
                      <img src="/CompanyLogo.jpeg" alt="Team Member" />
                </div>
                <div className="member-info">
                      <h3 className="member-name">David Thompson</h3>
                      <p className="member-position">Managing Director</p>
                </div>
              </div>
                </>
              )}
            </div>
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
            {investmentStrategyContent?.title ? (
              <>
                {investmentStrategyContent.title.split(' ').map((word, index) => (
                  <span key={index} className={word.toLowerCase().includes('transform') ? "ending-title-accent" : ""}>
                    {word}{index < investmentStrategyContent.title.split(' ').length - 1 ? ' ' : ''}
                  </span>
                ))}
              </>
            ) : (
              <>
              Ready to <span className="ending-title-accent">Transform</span> Your Investment Strategy?
              </>
            )}
            </h2>
            <p className="ending-description">
            {investmentStrategyContent?.subtitle || "Join thousands of satisfied clients who trust us with their most important financial decisions. Let us help you achieve your investment goals with our proven strategies and expert guidance."}
            </p>
            
            <div className="ending-stats">
            {investmentStrategyContent?.displayStats?.map((stat, index) => (
              <div key={index} className="ending-stat">
                <div className="ending-stat-number">{stat.value}</div>
                <div className="ending-stat-label">{stat.label}</div>
              </div>
            )) || (
              <>
              <div className="ending-stat">
                <div className="ending-stat-number">500+</div>
                  <div className="ending-stat-label">Happy Clients</div>
              </div>
              <div className="ending-stat">
                  <div className="ending-stat-number">$2.5B+</div>
                <div className="ending-stat-label">Assets Managed</div>
              </div>
                <div className="ending-stat">
                  <div className="ending-stat-number">15+</div>
                  <div className="ending-stat-label">Years Experience</div>
              </div>
              <div className="ending-stat">
                <div className="ending-stat-number">98%</div>
                  <div className="ending-stat-label">Success Rate</div>
              </div>
              </>
            )}
            </div>
            
            <div className="ending-actions">
              <Link 
              href={investmentStrategyContent?.buttons?.[0]?.toLowerCase().includes('track') || investmentStrategyContent?.buttons?.[0]?.toLowerCase().includes('record') ? "/records" : "/contact"} 
                className="btn-ending-primary"
            >
              {investmentStrategyContent?.buttons?.[0] || "Get Started Today"}
              <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="clients-background">
          <div className="clients-gradient"></div>
          <div className="clients-pattern"></div>
        </div>

        <div className="clients-content">
          <h2 className="clients-title">
            {partnersContent?.title ? (
              <>
                {partnersContent.title.split(' ').map((word, index) => (
                  <span key={index} className={word.toLowerCase().includes('partner') ? "clients-title-accent" : ""}>
                    {word}{index < partnersContent.title.split(' ').length - 1 ? ' ' : ''}
                  </span>
                ))}
              </>
            ) : (
              <>
                Trusted by <span className="clients-title-accent">Leading</span> Organizations
              </>
            )}
          </h2>
          <p className="clients-description">
            {partnersContent?.subtitle || "We're proud to work with some of the most respected names in business, helping them achieve their financial objectives through strategic investment solutions."}
          </p>
          
          <div className="clients-carousel">
            <div className="carousel-viewport" id="carousel-viewport">
              {clients.map((client, index) => (
                <div key={index} className="client-item">
                  <div className="client-card">
                    <img 
                      src={`/${client}`} 
                      alt={`Client ${index + 1}`}
                      className="client-image"
                    />
                    <div className="client-overlay"></div>
                    <div className="client-logo-mark">
                      {client.split('.')[0].toUpperCase()}
                  </div>
                  </div>
                  <div className="client-meta">
                    {client.split('.')[0].replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="clients-nav">
              <button 
                className="clients-btn"
                onClick={() => scrollClients('prev')}
                aria-label="Previous clients"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="clients-btn"
                onClick={() => scrollClients('next')}
                aria-label="Next clients"
              >
                <ChevronRight size={20} />
              </button>
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
          background: var(--gradient-hero);
        }
        
        .hero-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, var(--color-accent) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, var(--color-purple) 0%, transparent 35%),
            radial-gradient(circle at 50% 20%, var(--color-accent-soft) 0%, transparent 30%);
          opacity: 0.08;
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
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: ${isVisible ? 1 : 0};
          transform: ${isVisible ? 'translateY(0)' : 'translateY(30px)'};
          transition: all 0.8s ease 0.4s;
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
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
        
        /* Mobile Responsiveness for Hero Section */
        @media (max-width: 768px) {
          .hero-section {
            min-height: 100vh;
            padding: 60px 0 var(--space-16);
          }
          
          .hero-content {
            padding: 0 var(--space-4);
          }
          
          .hero-title {
            font-size: clamp(2.5rem, 10vw, 4rem);
            margin-bottom: var(--space-4);
          }
          
          .hero-description {
            font-size: var(--text-lg);
            margin-bottom: var(--space-8);
            padding: 0 var(--space-2);
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
            margin-top: var(--space-8);
          }
          
          .stat-item {
            padding: var(--space-4);
          }
          
          .stat-number {
            font-size: var(--text-3xl);
            margin-bottom: var(--space-1);
          }
          
          .stat-label {
            font-size: var(--text-sm);
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            padding: 40px 0 var(--space-12);
          }
          
          .hero-title {
            font-size: clamp(2rem, 12vw, 3rem);
            line-height: 1.2;
          }
          
          .hero-description {
            font-size: var(--text-base);
            line-height: 1.5;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }
          
          .stat-item {
            padding: var(--space-3);
            background: rgba(255, 255, 255, 0.05);
            border-radius: var(--radius-lg);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Award, ArrowRight, BarChart3, Globe, DollarSign, Building2, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeroContent } from '../types/api';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [visionContent, setVisionContent] = useState<HeroContent | null>(null);
  const [storyContent, setStoryContent] = useState<HeroContent | null>(null);
  const [leadershipContent, setLeadershipContent] = useState<HeroContent | null>(null);
  const [investmentStrategyContent, setInvestmentStrategyContent] = useState<HeroContent | null>(null);
  const [partnersContent, setPartnersContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [storyVisible, setStoryVisible] = useState(false);
  const [companiesVisible, setCompaniesVisible] = useState(false);

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

  // Hardcoded company data
  const companies = [
    {
      name: "Sunstone",
      logo: "/logos/Sunstone-logo.png",
      sections: [
        {
          title: "About",
          content: "Leading education technology company focused on higher education and professional development."
        },
        {
          title: "Investment Stage",
          content: "Series A"
        }
      ]
    },
    {
      name: "One",
      logo: "/logos/one-logo.png",
      sections: [
        {
          title: "About",
          content: "Digital banking platform providing seamless financial services and payment solutions."
        },
        {
          title: "Investment Stage",
          content: "Series B"
        }
      ]
    },
    {
      name: "Battery Smart",
      logo: "/logos/battery-smart.webp",
      sections: [
        {
          title: "About",
          content: "Electric vehicle battery swapping network enabling sustainable mobility solutions."
        },
        {
          title: "Investment Stage",
          content: "Series A"
        }
      ]
    },
    {
      name: "Jiraaf",
      logo: "/logos/jiraaf-launches-indias-first-bond-analyser-to-decode-fixed-income-investing.webp",
      sections: [
        {
          title: "About",
          content: "Fixed income investment platform with India's first bond analyser for retail investors."
        },
        {
          title: "Investment Stage",
          content: "Seed"
        }
      ]
    },
    {
      name: "Farmart",
      logo: "/logos/Farmart-logo.webp",
      sections: [
        {
          title: "About",
          content: "Agricultural technology platform connecting farmers with buyers and providing market insights."
        },
        {
          title: "Investment Stage",
          content: "Series A"
        }
      ]
    },
    {
      name: "Damensch",
      logo: "/logos/Damensch.png",
      sections: [
        {
          title: "About",
          content: "Direct-to-consumer men's fashion brand specializing in premium innerwear and casual wear."
        },
        {
          title: "Investment Stage",
          content: "Series B"
        }
      ]
    },
    {
      name: "Vegrow",
      logo: "/logos/vegrow.webp",
      sections: [
        {
          title: "About",
          content: "B2B marketplace for fresh produce, connecting farmers directly with retailers and restaurants."
        },
        {
          title: "Investment Stage",
          content: "Series A"
        }
      ]
    },
    {
      name: "Captain Fresh",
      logo: "/logos/captainFresh.png",
      sections: [
        {
          title: "About",
          content: "Seafood supply chain platform ensuring fresh and traceable seafood from ocean to table."
        },
        {
          title: "Investment Stage",
          content: "Series B"
        }
      ]
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const carousel = document.getElementById('carousel-viewport');
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    let animationFrameId: number;

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when reaching halfway point (since we duplicated items)
      const maxScroll = carousel.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll animation for story section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStoryVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const storySection = document.querySelector('.story-section-wrapper');
    if (storySection) {
      observer.observe(storySection);
    }

    return () => {
      if (storySection) {
        observer.unobserve(storySection);
      }
    };
  }, []);

  // Scroll animation for companies section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCompaniesVisible(true);
            // Animate each card one by one
            const cards = document.querySelectorAll('.company-logo-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('flip-in');
              }, index * 100); // 100ms delay between each card
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const companiesSection = document.querySelector('.companies-grid-section');
    if (companiesSection) {
      observer.observe(companiesSection);
    }

    return () => {
      if (companiesSection) {
        observer.unobserve(companiesSection);
      }
    };
  }, []);

  return (
    <div className="landing-page min-h-screen">
      <HeroSection heroContent={heroContent} visionContent={visionContent} isVisible={isVisible} />

      {/* Our Story Section */}
      <section 
        id="story" 
        className="story-section-wrapper story-section-clickable"
        onClick={() => router.push('/records')}
        style={{ cursor: 'pointer' }}
      >
        <div className="story-background">
          <div className="story-gradient"></div>
        </div>
        
        <div className="story-content">
          <div className="story-section">
            <div className="story-header">
              <div className={`story-title-wrapper ${storyVisible ? 'animate' : ''}`}>
                <h2 className="story-title-line story-title-first">
                  {storyContent?.title ? storyContent.title.split(' ')[0] : 'Our'}
                </h2>
                <h2 className="story-title-line story-title-second">
                  {storyContent?.title ? storyContent.title.split(' ')[1] : 'Story'}
                </h2>
              </div>
              <div className={`story-vertical-divider ${storyVisible ? 'animate' : ''}`}></div>
              <p className={`story-description ${storyVisible ? 'animate' : ''}`}>
                {storyContent?.subtitle || "Founded on the principles of excellence and innovation, we have built a legacy of trust and success in the capital markets. Our journey began with a vision to democratize sophisticated investment strategies and make them accessible to clients worldwide."}
              </p>
            </div>
          </div>
        </div>
        <div className="story-arrow-container">
          <ChevronRight size={80} color="#B8956A" />
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="team-section-wrapper">
        <div className="team-background">
          <div className="team-gradient"></div>
        </div>
        
        <div className="team-content">
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

      {/* Companies Section */}
      <section id="companies" className="companies-grid-section">
        <div className="companies-background">
          <div className="companies-gradient"></div>
        </div>
        
        <div className="companies-grid-content">
          <h2 className="companies-grid-title">Companies</h2>
          
          <div className="companies-logos-grid">
            {companies.map((company, index) => (
              <div key={index} className="company-logo-item">
                <div className="company-logo-card">
                  <img src={company.logo} alt={company.name} className="company-logo-img" />
                </div>
                
                <div className="company-hover-details">
                  <div className="company-detail-header">
                    <img src={company.logo} alt={company.name} className="company-detail-logo" />
                    <h3 className="company-detail-name">{company.name}</h3>
                  </div>
                  
                  {company.sections.map((section, sectionIdx) => (
                      <div key={sectionIdx} className="company-detail-info">
                      <h4>{section.title}</h4>
                      {Array.isArray(section.content) ? (
                        section.content.map((item, itemIdx) => (
                          <p key={itemIdx}>{item}</p>
                        ))
                      ) : (
                        <p>{section.content}</p>
                      )}
                    </div>
                  ))}
                  
                  <button className="company-detail-arrow">→</button>
                </div>
              </div>
            ))}
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
              {/* Render clients twice for infinite loop effect */}
              {[...clients, ...clients].map((client, index) => (
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
          </div>
        </div>
      </section>

      <Footer />

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
'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Users, BarChart3, Star, Quote, CheckCircle, ArrowRight, Download, Calendar, Building2 } from 'lucide-react';
import { HeroContent } from '../../types/api';
import Footer from '../../components/Footer';

export default function RecordsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [availableYears, setAvailableYears] = useState(['2024', '2023', '2022']);
  const [successStoriesContent, setSuccessStoriesContent] = useState<HeroContent | null>(null);
  const [performanceMetricsContent, setPerformanceMetricsContent] = useState<HeroContent | null>(null);
  const [joinSuccessContent, setJoinSuccessContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [awardsVisible, setAwardsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalDeals: 0,
    totalValue: 0,
    successRate: 0,
    clientSatisfaction: 0
  });

  // Fetch success stories and performance metrics content on component mount
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        // Fetch success stories, performance metrics, and join success content in parallel
        const [successStoriesResponse, performanceMetricsResponse, joinSuccessResponse] = await Promise.all([
          fetch('http://localhost:5050/page/getPageContent?pageType=successStories'),
          fetch('http://localhost:5050/page/getPageContent?pageType=performanceMetrics'),
          fetch('http://localhost:5050/page/getPageContent?pageType=joinSuccess')
        ]);

        const [successStoriesData, performanceMetricsData, joinSuccessData] = await Promise.all([
          successStoriesResponse.json(),
          performanceMetricsResponse.json(),
          joinSuccessResponse.json()
        ]);

        // Transform success stories data
        if (successStoriesData.success && successStoriesData.data) {
          const transformedSuccessStoriesData = {
            title: successStoriesData.data.title,
            subtitle: successStoriesData.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: [],
            features: [],
            buttons: successStoriesData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Success Stories API Data received:', successStoriesData.data);
          console.log('Transformed success stories data:', transformedSuccessStoriesData);
          setSuccessStoriesContent(transformedSuccessStoriesData);
        }

        // Transform performance metrics data
        if (performanceMetricsData.success && performanceMetricsData.data) {
          const transformedPerformanceMetricsData = {
            title: performanceMetricsData.data.title,
            subtitle: performanceMetricsData.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: performanceMetricsData.data.numbers,
            features: [],
            buttons: performanceMetricsData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Performance Metrics API Data received:', performanceMetricsData.data);
          console.log('Transformed performance metrics data:', transformedPerformanceMetricsData);
          setPerformanceMetricsContent(transformedPerformanceMetricsData);
          
          // Set available years from API data
          const yearsFromAPI = performanceMetricsData.data.btnTxt.map((btn: any) => btn.buttonText);
          setAvailableYears(yearsFromAPI);
          
          // Set the first year as selected if current selection is not in the new list
          if (!yearsFromAPI.includes(selectedYear)) {
            setSelectedYear(yearsFromAPI[0] || '2024');
          }
        }

        // Transform join success data
        if (joinSuccessData.success && joinSuccessData.data) {
          const transformedJoinSuccessData = {
            title: joinSuccessData.data.title,
            subtitle: joinSuccessData.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: [],
            features: [],
            buttons: joinSuccessData.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Join Success API Data received:', joinSuccessData.data);
          console.log('Transformed join success data:', transformedJoinSuccessData);
          setJoinSuccessContent(transformedJoinSuccessData);
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
        setSuccessStoriesContent(null);
        setPerformanceMetricsContent(null);
        setJoinSuccessContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHeroVisible(true); // Show hero section immediately
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations for each section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -200px 0px'
    };

    const observers: IntersectionObserver[] = [];

    const metricsSection = document.getElementById('metrics-section');
    const awardsSection = document.getElementById('awards-section');
    const ctaSection = document.getElementById('cta-section');

    if (metricsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMetricsVisible(true);
          }
        });
      }, observerOptions);
      observer.observe(metricsSection);
      observers.push(observer);
    }

    if (awardsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAwardsVisible(true);
          }
        });
      }, observerOptions);
      observer.observe(awardsSection);
      observers.push(observer);
    }

    if (ctaSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          }
        });
      }, observerOptions);
      observer.observe(ctaSection);
      observers.push(observer);
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Animate metrics when they become visible
  useEffect(() => {
    if (!metricsVisible) return;

    const currentYearData = performanceMetrics.find(metric => metric.year === selectedYear) || performanceMetrics[0];
    
    const targets = {
      totalDeals: currentYearData.totalDeals,
      totalValue: currentYearData.totalValue,
      successRate: currentYearData.successRate,
      clientSatisfaction: currentYearData.clientSatisfaction
    };

    // Animate each metric individually with staggered delays
    const animateMetric = (metricName: keyof typeof animatedMetrics, delay: number) => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      const timeoutId = setTimeout(() => {
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          setAnimatedMetrics(prev => ({
            ...prev,
            [metricName]: parseFloat((targets[metricName] * easeOut).toFixed(1))
          }));
          
          if (step >= steps) {
            clearInterval(timer);
            // Set final value to ensure accuracy
            setAnimatedMetrics(prev => ({
              ...prev,
              [metricName]: targets[metricName]
            }));
          }
        }, stepDuration);
        
        return () => clearInterval(timer);
      }, delay);
      
      return () => clearTimeout(timeoutId);
    };
    
    // Stagger each metric animation
    const cleanup1 = animateMetric('totalDeals', 400);
    const cleanup2 = animateMetric('totalValue', 600);
    const cleanup3 = animateMetric('successRate', 800);
    const cleanup4 = animateMetric('clientSatisfaction', 1000);
    
    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
    };
  }, [metricsVisible, selectedYear]);

  const performanceMetrics = [
    {
      year: '2024',
      totalDeals: 127,
      totalValue: 8.2,
      successRate: 98.5,
      clientSatisfaction: 4.9,
      growth: '+15%'
    },
    {
      year: '2023',
      totalDeals: 110,
      totalValue: 7.1,
      successRate: 97.2,
      clientSatisfaction: 4.8,
      growth: '+12%'
    },
    {
      year: '2022',
      totalDeals: 98,
      totalValue: 6.3,
      successRate: 96.8,
      clientSatisfaction: 4.7,
      growth: '+8%'
    }
  ];

  const clientTestimonials = [
    {
      name: 'Sarah Mitchell',
      title: 'CEO, TechVentures Inc.',
      company: 'Technology',
      dealValue: '$2.5B',
      rating: 5,
      testimonial: 'Elluminate Capital transformed our M&A strategy. Their expertise and attention to detail resulted in a deal that exceeded all our expectations. The team\'s professionalism and market insights are unmatched.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'David Chen',
      title: 'CFO, Global Manufacturing Corp.',
      company: 'Manufacturing',
      dealValue: '$1.8B',
      rating: 5,
      testimonial: 'Working with Elluminate Capital was a game-changer for our company. Their strategic guidance and market knowledge helped us navigate complex negotiations and achieve optimal outcomes.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      title: 'Managing Partner, Private Equity Fund',
      company: 'Private Equity',
      dealValue: '$3.2B',
      rating: 5,
      testimonial: 'Elluminate Capital\'s track record speaks for itself. Their comprehensive market analysis and execution excellence have been instrumental in our fund\'s success. Highly recommended.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Michael Thompson',
      title: 'President, Energy Solutions Ltd.',
      company: 'Energy',
      dealValue: '$4.1B',
      rating: 5,
      testimonial: 'The team at Elluminate Capital delivered exceptional results on our largest transaction to date. Their industry expertise and strategic approach made all the difference.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const awards = [
    {
      title: 'Investment Bank of the Year',
      organization: 'Financial Times',
      year: '2024',
      category: 'Excellence in M&A'
    },
    {
      title: 'Best M&A Advisory Firm',
      organization: 'Global Finance Magazine',
      year: '2024',
      category: 'Client Satisfaction'
    },
    {
      title: 'Top Performer in Technology Deals',
      organization: 'Investment Banking Review',
      year: '2023',
      category: 'Industry Leadership'
    },
    {
      title: 'Excellence in Private Equity',
      organization: 'Private Equity International',
      year: '2023',
      category: 'Deal Execution'
    }
  ];

  const currentYearData = performanceMetrics.find(metric => metric.year === selectedYear) || performanceMetrics[0];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* Fixed Background Image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/success.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
      
      {/* Light Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}
      />

      <div style={{ paddingTop: '80px', position: 'relative', zIndex: 50 }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            minHeight: '80vh',
            padding: 'var(--space-20) var(--space-6)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s ease-out',
          }}
        >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              background: 'transparent',
              border: '1px solid #ffffff',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-accent)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-md)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}
          >
            <Award size={20} />
            {successStoriesContent?.buttons?.[0] || "Proven Track Record"}
          </div>
          
          <h1
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {successStoriesContent?.title || "Our Success Stories"}
          </h1>
          
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              maxWidth: '800px',
              margin: '0 auto var(--space-8)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {successStoriesContent?.subtitle || "Discover our proven track record of delivering exceptional results for clients across diverse industries. Our success is measured by the success of our clients."}
          </p>
        </div>
      </section>

      {/* Connecting Line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '630px',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '180px',
          background: 'linear-gradient(180deg, rgba(184, 149, 106, 0.3), rgba(184, 149, 106, 0.8))',
          opacity: heroVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.6s',
          zIndex: 100,
        }}
      >
        {/* Dot at the end with surrounding circle */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid rgba(184, 149, 106, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner solid dot */}
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#B8956A',
              boxShadow: '0 0 10px rgba(184, 149, 106, 0.5)',
            }}
          />
        </div>
      </div>

      {/* Performance Metrics & Client Testimonials Combined */}
      <section
        id="metrics-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          padding: 'var(--space-20) var(--space-6)',
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
          <source src="/videos/176521-855920743_small.mp4" type="video/mp4" />
        </video>

        {/* Performance Metrics Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
              textAlign: 'center',
              opacity: metricsVisible ? 1 : 0,
              transform: metricsVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {performanceMetricsContent?.title || "Performance Metrics"}
          </h2>
          
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              marginBottom: 'var(--space-12)',
              flexWrap: 'wrap',
            }}
          >
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'transparent',
                  color: selectedYear === year ? '#ffffff' : '#ffffff',
                  border: '1px solid #ffffff',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  opacity: metricsVisible ? 1 : 0,
                  transform: metricsVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {year}
              </button>
            ))}
          </div>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-8)',
              opacity: metricsVisible ? 1 : 0,
              transform: metricsVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {performanceMetricsContent?.displayStats?.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: '#B8956A',
                    marginBottom: 'var(--space-2)',
                    fontFamily: 'var(--font-family-heading)',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
                  {stat.label}
                </div>
              </div>
            )) || (
              <>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#B8956A',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {Math.floor(animatedMetrics.totalDeals)}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
                    Total Deals
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#B8956A',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    ${animatedMetrics.totalValue.toFixed(1)}B+
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
                    Deal Value
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#B8956A',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {animatedMetrics.successRate.toFixed(1)}%
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
                    Success Rate
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#B8956A',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {animatedMetrics.clientSatisfaction.toFixed(1)}/5
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
                    Client Rating
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: '#B8956A',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {currentYearData.growth}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
                    YoY Growth
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Client Testimonials */}
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-8)',
              marginTop: 'var(--space-20)',
              fontFamily: 'var(--font-family-heading)',
              textAlign: 'center',
            }}
          >
            Client Testimonials
          </h2>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {clientTestimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: 'transparent',
                  padding: 'var(--space-8)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(184, 149, 106, 0.3)',
                  boxShadow: 'none',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.border = '1px solid #B8956A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.border = '1px solid rgba(184, 149, 106, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: '#B8956A',
                        marginBottom: 'var(--space-1)',
                        fontFamily: 'var(--font-family-heading)',
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: 'var(--text-sm)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {testimonial.title}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                      }}
                    >
                      <Building2 size={14} color="rgba(255, 255, 255, 0.7)" />
                      <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'var(--text-xs)' }}>
                        {testimonial.company} • {testimonial.dealValue}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-1)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#B8956A" color="#B8956A" />
                  ))}
                </div>
                
                <blockquote
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                    position: 'relative',
                    paddingLeft: 'var(--space-6)',
                  }}
                >
                  <Quote
                    size={20}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      color: 'rgba(255, 255, 255, 0.3)',
                      opacity: 0.3,
                    }}
                  />
                  {testimonial.testimonial}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section
        id="awards-section"
        style={{
          minHeight: '70vh',
          padding: 'var(--space-20) var(--space-6)',
          opacity: awardsVisible ? 1 : 0,
          transform: awardsVisible ? 'translateY(0)' : 'translateY(80px)',
          transition: 'all 1.2s ease-out',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
              textAlign: 'center',
            }}
          >
            Awards & Recognition
          </h2>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {awards.map((award, index) => (
              <div
                key={index}
                style={{
                  background: 'transparent',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(184, 149, 106, 0.3)',
                  textAlign: 'center',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#B8956A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(184, 149, 106, 0.3)';
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'transparent',
                    border: '2px solid #B8956A',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-4)',
                  }}
                >
                  <Award size={24} color="#B8956A" />
                </div>
                
                <h4
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: '#B8956A',
                    marginBottom: 'var(--space-2)',
                    fontFamily: 'var(--font-family-heading)',
                  }}
                >
                  {award.title}
                </h4>
                
                <p
                  style={{
                    color: 'var(--text-accent)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {award.organization}
                </p>
                
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {award.category}
                </p>
                
                <div
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {award.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta-section"
        style={{
          minHeight: '50vh',
          padding: 'var(--space-20) var(--space-6)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(80px)',
          transition: 'all 1.2s ease-out',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: '#B8956A',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {joinSuccessContent?.title || "Ready to Join Our Success Story?"}
          </h2>
          
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {joinSuccessContent?.subtitle || "Let our proven track record work for you. Contact us today to discuss how we can help achieve your investment goals."}
          </p>
          
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.6s',
            }}
          >
            <a
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                fontSize: 'var(--text-lg)',
                transition: 'all var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {joinSuccessContent?.buttons?.[0] || "Start Your Journey"}
              <ArrowRight size={20} />
            </a>
            
            <a
              href="/insights"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-4) var(--space-8)',
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                fontSize: 'var(--text-lg)',
                transition: 'all var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {joinSuccessContent?.buttons?.[1] || "View Insights"}
            </a>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </div>
  );
}

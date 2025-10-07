'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Users, BarChart3, Star, Quote, CheckCircle, ArrowRight, Download, Calendar, Building2 } from 'lucide-react';
import { HeroContent } from '../../types/api';

export default function RecordsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [availableYears, setAvailableYears] = useState(['2024', '2023', '2022']);
  const [successStoriesContent, setSuccessStoriesContent] = useState<HeroContent | null>(null);
  const [performanceMetricsContent, setPerformanceMetricsContent] = useState<HeroContent | null>(null);
  const [joinSuccessContent, setJoinSuccessContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

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
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const notableDeals = [
    {
      client: 'TechVentures Inc.',
      dealType: 'M&A Acquisition',
      value: '$2.5B',
      industry: 'Technology',
      year: '2024',
      description: 'Strategic acquisition of AI startup portfolio',
      status: 'Completed'
    },
    {
      client: 'Global Manufacturing Corp.',
      dealType: 'IPO Advisory',
      value: '$1.8B',
      industry: 'Manufacturing',
      year: '2024',
      description: 'Successful public offering and market debut',
      status: 'Completed'
    },
    {
      client: 'Energy Solutions Ltd.',
      dealType: 'Private Equity Exit',
      value: '$4.1B',
      industry: 'Energy',
      year: '2023',
      description: 'Strategic divestiture to international consortium',
      status: 'Completed'
    },
    {
      client: 'Financial Services Group',
      dealType: 'Debt Restructuring',
      value: '$3.2B',
      industry: 'Financial Services',
      year: '2023',
      description: 'Complex debt restructuring and refinancing',
      status: 'Completed'
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
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--gradient-subtle)',
          padding: 'var(--space-20) var(--space-6)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3) var(--space-6)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-accent)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-md)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
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
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {successStoriesContent?.title ? (
              (() => {
                const words = successStoriesContent.title.split(' ');
                return (
                  <>
                    {words.map((word, index) => (
                      <span key={index} style={{
                        background: word.toLowerCase().includes('success') || word.toLowerCase().includes('stories') 
                          ? 'var(--gradient-accent)' 
                          : 'transparent',
                        WebkitBackgroundClip: word.toLowerCase().includes('success') || word.toLowerCase().includes('stories') 
                          ? 'text' 
                          : 'initial',
                        WebkitTextFillColor: word.toLowerCase().includes('success') || word.toLowerCase().includes('stories') 
                          ? 'transparent' 
                          : 'var(--text-primary)',
                        backgroundClip: word.toLowerCase().includes('success') || word.toLowerCase().includes('stories') 
                          ? 'text' 
                          : 'initial',
                      }}>
                        {word}{index < words.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </>
                );
              })()
            ) : (
              <>
                Our <span style={{
                  background: 'var(--gradient-accent)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Success Stories</span>
              </>
            )}
          </h1>
          
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              maxWidth: '800px',
              margin: '0 auto var(--space-8)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {successStoriesContent?.subtitle || "Discover our proven track record of delivering exceptional results for clients across diverse industries. Our success is measured by the success of our clients."}
          </p>
        </div>
      </section>

      {/* Performance Metrics */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
              textAlign: 'center',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
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
                  background: selectedYear === year ? 'var(--color-accent)' : 'var(--bg-secondary)',
                  color: selectedYear === year ? 'var(--text-inverse)' : 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
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
              background: 'var(--bg-secondary)',
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-lg)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            {performanceMetricsContent?.displayStats?.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 'var(--text-4xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--text-accent)',
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
                      color: 'var(--text-accent)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {currentYearData.totalDeals}
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
                      color: 'var(--text-accent)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    ${currentYearData.totalValue}B+
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
                      color: 'var(--text-accent)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {currentYearData.successRate}%
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
                      color: 'var(--text-accent)',
                      marginBottom: 'var(--space-2)',
                      fontFamily: 'var(--font-family-heading)',
                    }}
                  >
                    {currentYearData.clientSatisfaction}/5
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
                      color: 'var(--text-accent)',
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
        </div>
      </section>

      {/* Client Testimonials */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
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
                  background: 'var(--bg-primary)',
                  padding: 'var(--space-8)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-primary)',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
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
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-1)',
                        fontFamily: 'var(--font-family-heading)',
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
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
                      <Building2 size={14} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
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
                    <Star key={i} size={16} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>
                
                <blockquote
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
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
                      color: 'var(--color-accent)',
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

      {/* Notable Deals */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
              textAlign: 'center',
            }}
          >
            Notable Deals
          </h2>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {notableDeals.map((deal, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-primary)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: 'var(--text-xl)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--text-primary)',
                        marginBottom: 'var(--space-2)',
                        fontFamily: 'var(--font-family-heading)',
                      }}
                    >
                      {deal.client}
                    </h4>
                    <p
                      style={{
                        color: 'var(--text-accent)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-medium)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {deal.dealType}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--text-accent)',
                        fontFamily: 'var(--font-family-heading)',
                      }}
                    >
                      {deal.value}
                    </div>
                    <div
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      {deal.year}
                    </div>
                  </div>
                </div>
                
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {deal.description}
                </p>
                
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <CheckCircle size={16} color="var(--color-accent)" />
                    <span
                      style={{
                        color: 'var(--text-accent)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {deal.status}
                    </span>
                  </div>
                  <span
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {deal.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
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
                  background: 'var(--bg-primary)',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-primary)',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'var(--gradient-accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-4)',
                  }}
                >
                  <Award size={24} color="#000" />
                </div>
                
                <h4
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
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
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--gradient-subtle)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
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
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
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
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
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
                background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
                color: '#000',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                fontSize: 'var(--text-lg)',
                transition: 'all var(--transition-normal)',
                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.3)';
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
                color: 'var(--color-accent)',
                border: '2px solid var(--color-accent)',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                fontSize: 'var(--text-lg)',
                transition: 'all var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {joinSuccessContent?.buttons?.[1] || "View Insights"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

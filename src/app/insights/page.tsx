'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, TrendingUp, BarChart3, Globe, DollarSign, Clock, ExternalLink } from 'lucide-react';

export default function InsightsPage() {
  const featuredArticle = {
    slug: 'market-outlook-2024',
    title: 'Market Outlook 2024: Navigating Economic Uncertainty',
    excerpt: 'Our comprehensive analysis of global markets and investment opportunities in an uncertain economic environment.',
    author: 'Sarah Mitchell',
    date: 'December 15, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    category: 'Market Analysis'
  };

  const articles = [
    {
      title: 'The Future of Sustainable Investing',
      slug: 'future-of-sustainable-investing',
      excerpt: 'Exploring ESG trends and their impact on investment strategies.',
      author: 'David Chen',
      date: 'December 10, 2023',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop',
      category: 'ESG'
    },
    {
      title: 'Private Equity Trends in 2024',
      slug: 'private-equity-trends-2024',
      excerpt: 'Key insights into private equity market dynamics and opportunities.',
      author: 'Emily Rodriguez',
      date: 'December 8, 2023',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      category: 'Private Equity'
    },
    {
      title: 'Technology Sector Analysis',
      slug: 'technology-sector-analysis',
      excerpt: 'Deep dive into tech valuations and growth prospects.',
      author: 'Michael Thompson',
      date: 'December 5, 2023',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      category: 'Technology'
    },
    {
      title: 'Real Estate Investment Strategies',
      slug: 'real-estate-investment-strategies',
      excerpt: 'Navigating commercial real estate in changing market conditions.',
      author: 'Sarah Mitchell',
      date: 'December 3, 2023',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      category: 'Real Estate'
    },
    {
      title: 'Emerging Markets Opportunities',
      slug: 'emerging-markets-opportunities',
      excerpt: 'Identifying growth potential in developing economies.',
      author: 'David Chen',
      date: 'November 30, 2023',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      category: 'Emerging Markets'
    },
    {
      title: 'Fixed Income Market Update',
      slug: 'fixed-income-market-update',
      excerpt: 'Interest rate environment and bond market outlook.',
      author: 'Emily Rodriguez',
      date: 'November 28, 2023',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      category: 'Fixed Income'
    }
  ];

  const reports = [
    {
      title: 'Q4 2023 Market Report',
      description: 'Comprehensive quarterly analysis of global markets and investment opportunities.',
      downloadCount: '2.5K',
      size: '2.4 MB',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
      title: 'ESG Investment Guide 2024',
      description: 'Complete guide to environmental, social, and governance investing.',
      downloadCount: '1.8K',
      size: '3.1 MB',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      title: 'Private Equity Outlook',
      description: 'In-depth analysis of private equity trends and opportunities.',
      downloadCount: '1.2K',
      size: '2.8 MB',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop'
    }
  ];

  const newsItems = [
    {
      title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
      summary: 'The Federal Reserve hints at possible interest rate reductions as inflation shows signs of cooling.',
      source: 'Financial Times',
      timeAgo: '2 hours ago',
      category: 'Monetary Policy',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      url: '#'
    },
    {
      title: 'Tech Stocks Rally on Strong Q4 Earnings Reports',
      summary: 'Major technology companies report better-than-expected quarterly results, driving market optimism.',
      source: 'Bloomberg',
      timeAgo: '4 hours ago',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
      url: '#'
    },
    {
      title: 'European Markets Open Higher Amid Economic Recovery Signs',
      summary: 'European stock markets show positive momentum as economic indicators suggest recovery.',
      source: 'Reuters',
      timeAgo: '6 hours ago',
      category: 'Markets',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      url: '#'
    },
    {
      title: 'Sustainable Investment Funds See Record Inflows',
      summary: 'ESG-focused investment products attract unprecedented capital as investors prioritize sustainability.',
      source: 'Wall Street Journal',
      timeAgo: '8 hours ago',
      category: 'ESG',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop',
      url: '#'
    },
    {
      title: 'Cryptocurrency Market Shows Signs of Stabilization',
      summary: 'Digital asset prices consolidate as regulatory clarity improves and institutional adoption grows.',
      source: 'CoinDesk',
      timeAgo: '10 hours ago',
      category: 'Crypto',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      url: '#'
    },
    {
      title: 'Real Estate Investment Trusts Post Strong Performance',
      summary: 'REITs outperform broader market as commercial real estate shows resilience.',
      source: 'Real Estate Weekly',
      timeAgo: '12 hours ago',
      category: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      url: '#'
    }
  ];

  const categories = ['All', 'Market Analysis', 'ESG', 'Private Equity', 'Technology', 'Real Estate', 'Emerging Markets', 'Fixed Income'];

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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Market Insights
          </h1>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
            }}
          >
            Stay informed with our latest research, market analysis, and investment insights 
            from our team of financial experts.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section
        style={{
          padding: 'var(--space-8) var(--space-6)',
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: category === 'All' ? 'var(--color-accent)' : 'var(--bg-secondary)',
                  color: category === 'All' ? 'var(--text-inverse)' : 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (category !== 'All') {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (category !== 'All') {
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Featured Article
          </h2>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-8)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-primary)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              style={{
                position: 'relative',
                minHeight: '300px',
              }}
            >
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  left: 'var(--space-4)',
                  background: 'var(--color-accent)',
                  color: 'var(--text-inverse)',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                {featuredArticle.category}
              </div>
            </div>
            
            <div style={{ padding: 'var(--space-8)' }}>
              <h3
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-4)',
                  fontFamily: 'var(--font-family-heading)',
                }}
              >
                {featuredArticle.title}
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--space-6)',
                  fontSize: 'var(--text-lg)',
                }}
              >
                {featuredArticle.excerpt}
              </p>
              
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <User size={16} color="var(--text-accent)" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {featuredArticle.author}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Calendar size={16} color="var(--text-accent)" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {featuredArticle.date}
                  </span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  {featuredArticle.readTime}
                </span>
              </div>
              
              <Link
                href={`/insights/${featuredArticle.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--color-accent)',
                  color: 'var(--text-inverse)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
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
                Read More
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Latest Articles
          </h2>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {articles.map((article, index) => (
              <article
                key={index}
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-primary)',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      left: 'var(--space-3)',
                      background: 'var(--color-accent)',
                      color: 'var(--text-inverse)',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {article.category}
                  </div>
                </div>
                
                <div style={{ padding: 'var(--space-6)' }}>
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-3)',
                      lineHeight: '1.3',
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: 'var(--space-4)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {article.excerpt}
                  </p>
                  
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-4)',
                      flexWrap: 'wrap',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <User size={14} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                        {article.author}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <Calendar size={14} color="var(--text-accent)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                        {article.date}
                      </span>
                    </div>
                  </div>
                  
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                      {article.readTime}
                    </span>
                    <Link
                      href={`/insights/${article.slug}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        background: 'none',
                        color: 'var(--text-accent)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-accent-dark)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-accent)';
                      }}
                    >
                      Read More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-8)',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}
          >
            <h2
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-family-heading)',
              }}
            >
              Latest News
            </h2>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3) var(--space-6)',
                background: 'var(--color-accent)',
                color: 'var(--text-inverse)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
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
              View All News
              <ExternalLink size={16} />
            </button>
          </div>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {newsItems.map((news, index) => (
              <article
                key={index}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-primary)',
                  transition: 'all var(--transition-normal)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => window.open(news.url, '_blank')}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={news.image}
                    alt={news.title}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      left: 'var(--space-3)',
                      background: 'var(--color-accent)',
                      color: 'var(--text-inverse)',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {news.category}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                    }}
                  >
                    <Clock size={12} />
                    {news.timeAgo}
                  </div>
                </div>
                
                <div style={{ padding: 'var(--space-6)' }}>
                  <h3
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-3)',
                      lineHeight: '1.4',
                    }}
                  >
                    {news.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: 'var(--space-4)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {news.summary}
                  </p>
                  
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 'var(--space-4)',
                      borderTop: '1px solid var(--border-primary)',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      {news.source}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        color: 'var(--text-accent)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                      }}
                    >
                      Read More
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Research Reports */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'var(--font-family-heading)',
            }}
          >
            Research Reports
          </h2>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {reports.map((report, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-primary)',
                  transition: 'all var(--transition-normal)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={report.image}
                    alt={report.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-3)',
                      right: 'var(--space-3)',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    {report.size}
                  </div>
                </div>
                
                <div style={{ padding: 'var(--space-6)' }}>
                  <h3
                    style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {report.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: 'var(--space-4)',
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {report.description}
                  </p>
                  
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                      {report.downloadCount} downloads
                    </span>
                  </div>
                  
                  <button
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      background: 'var(--color-accent)',
                      color: 'var(--text-inverse)',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
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
                    Download Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

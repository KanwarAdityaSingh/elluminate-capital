'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { HeroContent } from '../../types/api';
import { useBlogData } from '../../hooks/useBlogData';
import BlogCard from '../../components/BlogCard';
import Footer from '../../components/Footer';

export default function InsightsPage() {
  const [insightsContent, setInsightsContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  // Use blog data hook
  const { 
    blogTypes, 
    allBlogs,
    isLoading: blogLoading, 
    error: blogError
  } = useBlogData();

  // Fetch insights content on component mount
  useEffect(() => {
    const fetchInsightsContent = async () => {
      try {
        const response = await fetch('http://localhost:5050/page/getPageContent?pageType=insights');
        const data = await response.json();
        
        if (data.success && data.data) {
          const transformedData = {
            title: data.data.title,
            subtitle: data.data.subtitle,
            stats: {
              clients: 0,
              deals: 0,
              years: 0,
              assets: 0
            },
            displayStats: [],
            features: [],
            buttons: data.data.btnTxt.map((btn: any) => btn.buttonText)
          };
          console.log('Insights API Data received:', data.data);
          console.log('Transformed insights data:', transformedData);
          setInsightsContent(transformedData);
        }
      } catch (error) {
        console.error('Error fetching insights content:', error);
        setInsightsContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsightsContent();
  }, []);

  // Animation effect - immediate to prevent flashing
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Categories come from insights API
  const categories = insightsContent?.buttons || [];
  const uniqueCategories = [...new Set(['All', ...categories])].filter(Boolean);

  // Debug logging
  console.log('Insights Categories:', uniqueCategories);
  console.log('Blog Types:', blogTypes.map(type => type.name));
  console.log('All Blogs:', allBlogs.length);

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
          backgroundImage: 'url(/insights.jpg)',
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
            overflow: 'hidden',
          }}
        >
          {/* Content */}
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#B8956A',
                marginBottom: 'var(--space-6)',
                fontFamily: 'var(--font-family-heading)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 0.4s',
                lineHeight: '1.2',
              }}
            >
              {insightsContent?.title || "Market Insights"}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.5',
                marginBottom: 'var(--space-8)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease 1.2s',
                fontWeight: 'var(--font-weight-normal)',
              }}
            >
              {insightsContent?.subtitle || "Stay informed with our latest research, market analysis, and investment insights from our team of financial experts."}
            </p>
          </div>

          {/* Floating Arrow Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              opacity: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B8956A',
                animation: 'bounce 2s infinite',
              }}
            >
              <div style={{ fontSize: '60px' }}>↓</div>
            </div>
          </div>
        </section>

      {/* Categories Filter Pills */}
      <section
        style={{
          padding: 'var(--space-32) var(--space-6) var(--space-8)',
          background: 'transparent',
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
            {uniqueCategories.map((category: string) => (
              <button
                key={category}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Categories from API */}
      {blogTypes.map((blogType, typeIndex) => (
      <section
          key={blogType._id}
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'transparent',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#ffffff',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ease ${0.2 + typeIndex * 0.1}s`,
              }}
            >
              {blogType.name}
            </h2>
            
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: 'var(--space-8)',
                maxWidth: '600px',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ease ${0.3 + typeIndex * 0.1}s`,
              }}
            >
              {blogType.description}
            </p>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'var(--space-8)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ease ${0.4 + typeIndex * 0.1}s`,
              }}
            >
              {blogType.blogs.map((blog, blogIndex) => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  categoryName={blogType.name}
                />
            ))}
          </div>
        </div>
      </section>
      ))}

        <Footer />
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}

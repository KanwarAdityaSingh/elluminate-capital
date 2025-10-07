'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { HeroContent } from '../../types/api';
import { useBlogData } from '../../hooks/useBlogData';
import BlogCard from '../../components/BlogCard';

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

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show loading state
  if (isLoading || blogLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-300">
          Loading...
        </div>
      </div>
    );
  }


  // Categories come from insights API
  const categories = insightsContent?.buttons || [];
  const uniqueCategories = [...new Set(['All', ...categories])].filter(Boolean);

  // Debug logging
  console.log('Insights Categories:', uniqueCategories);
  console.log('Blog Types:', blogTypes.map(type => type.name));
  console.log('All Blogs:', allBlogs.length);

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
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {insightsContent?.title || "Market Insights"}
          </h1>
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
            {insightsContent?.subtitle || "Stay informed with our latest research, market analysis, and investment insights from our team of financial experts."}
          </p>
        </div>
      </section>

      {/* Categories Filter Pills */}
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
            {uniqueCategories.map((category: string) => (
              <button
                key={category}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-secondary)';
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
            background: typeIndex % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
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
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-8)',
                maxWidth: '600px',
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

    </div>
  );
}

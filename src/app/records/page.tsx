'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Award, Users, BarChart3, Star, Quote, CheckCircle, ArrowRight, Download, Calendar, Building2, Pencil } from 'lucide-react';
import { EditableText } from '../../components/EditableText';
import { cmsService, PageContentData } from '../../services/cmsService';
import { PageType } from '../../constants/pageTypes';

export default function RecordsPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  
  // CMS State
  const [successStoriesData, setSuccessStoriesData] = useState<PageContentData | null>(null);
  const [performanceMetricsData, setPerformanceMetricsData] = useState<PageContentData | null>(null);
  const [joinSuccessData, setJoinSuccessData] = useState<PageContentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);

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

  // Load success stories data
  useEffect(() => {
    const loadSuccessStoriesData = async () => {
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;
      
      try {
        setIsLoading(true);
        const response = await cmsService.getPageContent(PageType.SUCCESS_STORIES);
        if (response.success && response.data) {
          setSuccessStoriesData(response.data);
        } else {
          console.error('Failed to load success stories page content:', response.message);
        }
        
        // Load PERFORMANCE_METRICS page content
        const performanceResponse = await cmsService.getPageContent(PageType.PERFORMANCE_METRICS);
        if (performanceResponse.success && performanceResponse.data) {
          setPerformanceMetricsData(performanceResponse.data);
        } else {
          console.error('Failed to load performance metrics page content:', performanceResponse.message);
        }
        
        // Load JOIN_SUCCESS page content
        const joinSuccessResponse = await cmsService.getPageContent(PageType.JOIN_SUCCESS);
        if (joinSuccessResponse.success && joinSuccessResponse.data) {
          setJoinSuccessData(joinSuccessResponse.data);
        } else {
          console.error('Failed to load join success page content:', joinSuccessResponse.message);
        }
      } catch (error) {
        console.error('Error loading success stories content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSuccessStoriesData();
  }, []);

  // Handlers
  const handleSuccessStoriesTitleSave = async (newTitle: string) => {
    if (!successStoriesData) return;
    const updatedData = { ...successStoriesData, title: newTitle };
    setSuccessStoriesData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleSuccessStoriesSubtitleSave = async (newSubtitle: string) => {
    if (!successStoriesData) return;
    const updatedData = { ...successStoriesData, subtitle: newSubtitle };
    setSuccessStoriesData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleSuccessStoriesBtnTxtSave = async (newBtnTxt: Array<{ buttonText: string }>) => {
    if (!successStoriesData) return;
    const updatedData = { ...successStoriesData, btnTxt: newBtnTxt };
    setSuccessStoriesData(updatedData);
    await saveToCMS(updatedData);
  };

  // Performance metrics handlers
  const handlePerformanceMetricsTitleSave = async (newTitle: string) => {
    if (!performanceMetricsData) return;
    const updatedData = { ...performanceMetricsData, title: newTitle };
    setPerformanceMetricsData(updatedData);
    await saveToCMS(updatedData);
  };

  const handlePerformanceMetricsBtnTxtSave = async (newBtnTxt: Array<{ buttonText: string }>) => {
    if (!performanceMetricsData) return;
    const updatedData = { ...performanceMetricsData, btnTxt: newBtnTxt };
    setPerformanceMetricsData(updatedData);
    await saveToCMS(updatedData);
  };

  const handlePerformanceMetricsNumbersSave = async (newNumbers: Array<{ value: string; label: string }>) => {
    if (!performanceMetricsData) return;
    const updatedData = { ...performanceMetricsData, numbers: newNumbers };
    setPerformanceMetricsData(updatedData);
    await saveToCMS(updatedData);
  };

  // Join success handlers
  const handleJoinSuccessTitleSave = async (newTitle: string) => {
    if (!joinSuccessData) return;
    const updatedData = { ...joinSuccessData, title: newTitle };
    setJoinSuccessData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleJoinSuccessSubtitleSave = async (newSubtitle: string) => {
    if (!joinSuccessData) return;
    const updatedData = { ...joinSuccessData, subtitle: newSubtitle };
    setJoinSuccessData(updatedData);
    await saveToCMS(updatedData);
  };

  const handleJoinSuccessBtnTxtSave = async (newBtnTxt: Array<{ buttonText: string }>) => {
    if (!joinSuccessData) return;
    const updatedData = { ...joinSuccessData, btnTxt: newBtnTxt };
    setJoinSuccessData(updatedData);
    await saveToCMS(updatedData);
  };

  const saveToCMS = async (data: PageContentData) => {
    try {
      setIsLoading(true);
      await cmsService.createOrUpdatePageContent(data);
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
            <Pencil 
              size={16} 
              style={{
                cursor: 'pointer',
                color: 'var(--color-accent)',
                transition: 'all 0.2s ease',
                padding: '4px',
                borderRadius: '4px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
              onClick={() => {
                const event = new Event('dblclick');
                document.querySelector('.btn-text-track-record')?.dispatchEvent(event);
              }}
            />
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
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Award size={20} />
              <EditableText
                value={successStoriesData?.btnTxt?.[0]?.buttonText || 'Proven Track Record'}
                onSave={(newText) => {
                  const updatedBtnTxt = [...(successStoriesData?.btnTxt || [{ buttonText: 'Proven Track Record' }])];
                  updatedBtnTxt[0] = { buttonText: newText };
                  handleSuccessStoriesBtnTxtSave(updatedBtnTxt);
                }}
                tag="span"
                className="btn-text btn-text-track-record"
                placeholder="Button text"
              />
            </div>
          </div>
          
          <EditableText
            value={successStoriesData?.title || 'Our Success Stories'}
            onSave={handleSuccessStoriesTitleSave}
            tag="h1"
            style={{
              fontSize: 'var(--text-6xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
            }}
            placeholder="Success stories title"
          />
          
          <EditableText
            value={successStoriesData?.subtitle || 'Discover our proven track record of delivering exceptional results for clients across\ndiverse industries. Our success is measured by the success of our clients.'}
            onSave={handleSuccessStoriesSubtitleSave}
            tag="p"
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              maxWidth: '800px',
              margin: '0 auto var(--space-8)',
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
            multiline={true}
            placeholder="Success stories description"
          />
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
          <div style={{ textAlign: 'center', width: '100%' }}>
            <EditableText
              value={performanceMetricsData?.title || 'Performance Metrics'}
              onSave={handlePerformanceMetricsTitleSave}
              tag="h2"
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-8)',
                fontFamily: 'var(--font-family-heading)',
                textAlign: 'center',
                width: '100%',
                display: 'block',
              }}
              placeholder="Performance metrics title"
            />
          </div>
          
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              marginBottom: 'var(--space-12)',
              flexWrap: 'wrap',
            }}
          >
            {performanceMetrics.map((metric, index) => (
              <button
                key={metric.year}
                onClick={() => setSelectedYear(metric.year)}
                style={{
                  padding: 'var(--space-3) var(--space-6)',
                  background: selectedYear === metric.year ? 'var(--color-accent)' : 'var(--bg-secondary)',
                  color: selectedYear === metric.year ? 'var(--text-inverse)' : 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <EditableText
                  value={performanceMetricsData?.btnTxt?.[index]?.buttonText || metric.year}
                  onSave={(newText) => {
                    const updatedBtnTxt = [...(performanceMetricsData?.btnTxt || performanceMetrics.map(m => ({ buttonText: m.year })))];
                    updatedBtnTxt[index] = { buttonText: newText };
                    handlePerformanceMetricsBtnTxtSave(updatedBtnTxt);
                  }}
                  tag="span"
                  className={`btn-text btn-text-year-${index}`}
                  placeholder="Year"
                />
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
            }}
          >
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <EditableText
                value={performanceMetricsData?.numbers?.[0]?.value || currentYearData.totalDeals.toString()}
                onSave={(newValue) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[0] = { 
                    value: newValue, 
                    label: updatedNumbers[0]?.label || 'Total Deals' 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-family-heading)',
                }}
                placeholder="Metric value"
              />
              <EditableText
                value={performanceMetricsData?.numbers?.[0]?.label || 'Total Deals'}
                onSave={(newLabel) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[0] = { 
                    value: updatedNumbers[0]?.value || currentYearData.totalDeals.toString(), 
                    label: newLabel 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}
                placeholder="Metric label"
              />
            </div>
            
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <EditableText
                value={performanceMetricsData?.numbers?.[1]?.value || `$${currentYearData.totalValue}B+`}
                onSave={(newValue) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[1] = { 
                    value: newValue, 
                    label: updatedNumbers[1]?.label || 'Deal Value' 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-family-heading)',
                }}
                placeholder="Metric value"
              />
              <EditableText
                value={performanceMetricsData?.numbers?.[1]?.label || 'Deal Value'}
                onSave={(newLabel) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[1] = { 
                    value: updatedNumbers[1]?.value || `$${currentYearData.totalValue}B+`, 
                    label: newLabel 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}
                placeholder="Metric label"
              />
            </div>
            
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <EditableText
                value={performanceMetricsData?.numbers?.[2]?.value || `${currentYearData.successRate}%`}
                onSave={(newValue) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[2] = { 
                    value: newValue, 
                    label: updatedNumbers[2]?.label || 'Success Rate' 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-family-heading)',
                }}
                placeholder="Metric value"
              />
              <EditableText
                value={performanceMetricsData?.numbers?.[2]?.label || 'Success Rate'}
                onSave={(newLabel) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[2] = { 
                    value: updatedNumbers[2]?.value || `${currentYearData.successRate}%`, 
                    label: newLabel 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}
                placeholder="Metric label"
              />
            </div>
            
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <EditableText
                value={performanceMetricsData?.numbers?.[3]?.value || `${currentYearData.clientSatisfaction}/5`}
                onSave={(newValue) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[3] = { 
                    value: newValue, 
                    label: updatedNumbers[3]?.label || 'Client Rating' 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-family-heading)',
                }}
                placeholder="Metric value"
              />
              <EditableText
                value={performanceMetricsData?.numbers?.[3]?.label || 'Client Rating'}
                onSave={(newLabel) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[3] = { 
                    value: updatedNumbers[3]?.value || `${currentYearData.clientSatisfaction}/5`, 
                    label: newLabel 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}
                placeholder="Metric label"
              />
            </div>
            
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <EditableText
                value={performanceMetricsData?.numbers?.[4]?.value || currentYearData.growth}
                onSave={(newValue) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[4] = { 
                    value: newValue, 
                    label: updatedNumbers[4]?.label || 'YoY Growth' 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-family-heading)',
                }}
                placeholder="Metric value"
              />
              <EditableText
                value={performanceMetricsData?.numbers?.[4]?.label || 'YoY Growth'}
                onSave={(newLabel) => {
                  const updatedNumbers = [...(performanceMetricsData?.numbers || [])];
                  updatedNumbers[4] = { 
                    value: updatedNumbers[4]?.value || currentYearData.growth, 
                    label: newLabel 
                  };
                  handlePerformanceMetricsNumbersSave(updatedNumbers);
                }}
                tag="div"
                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}
                placeholder="Metric label"
              />
            </div>
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
          <EditableText
            value={joinSuccessData?.title || 'Ready to Join Our Success Story?'}
            onSave={handleJoinSuccessTitleSave}
            tag="h2"
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-6)',
              fontFamily: 'var(--font-family-heading)',
            }}
            placeholder="CTA title"
          />
          
          <EditableText
            value={joinSuccessData?.subtitle || 'Let our proven track record work for you. Contact us today to discuss how we can\nhelp achieve your investment goals.'}
            onSave={handleJoinSuccessSubtitleSave}
            tag="p"
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
              whiteSpace: 'pre-line',
            }}
            multiline={true}
            placeholder="CTA description"
          />
          
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Pencil
                size={16}
                style={{
                  cursor: 'pointer',
                  color: 'var(--color-accent)',
                  transition: 'all 0.2s ease',
                  padding: '4px',
                  borderRadius: '4px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
                onClick={() => {
                  const event = new Event('dblclick');
                  document.querySelector('.btn-text-start-journey')?.dispatchEvent(event);
                }}
              />
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
                <EditableText
                  value={joinSuccessData?.btnTxt?.[0]?.buttonText || 'Start Your Journey'}
                  onSave={(newText) => {
                    const updatedBtnTxt = [...(joinSuccessData?.btnTxt || [{ buttonText: 'Start Your Journey' }, { buttonText: 'View Insights' }])];
                    updatedBtnTxt[0] = { buttonText: newText };
                    handleJoinSuccessBtnTxtSave(updatedBtnTxt);
                  }}
                  tag="span"
                  className="btn-text btn-text-start-journey"
                  placeholder="Button text"
                />
                <ArrowRight size={20} />
              </a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Pencil
                size={16}
                style={{
                  cursor: 'pointer',
                  color: 'var(--color-accent)',
                  transition: 'all 0.2s ease',
                  padding: '4px',
                  borderRadius: '4px',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                }}
                onClick={() => {
                  const event = new Event('dblclick');
                  document.querySelector('.btn-text-view-insights')?.dispatchEvent(event);
                }}
              />
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
                <EditableText
                  value={joinSuccessData?.btnTxt?.[1]?.buttonText || 'View Insights'}
                  onSave={(newText) => {
                    const updatedBtnTxt = [...(joinSuccessData?.btnTxt || [{ buttonText: 'Start Your Journey' }, { buttonText: 'View Insights' }])];
                    updatedBtnTxt[1] = { buttonText: newText };
                    handleJoinSuccessBtnTxtSave(updatedBtnTxt);
                  }}
                  tag="span"
                  className="btn-text btn-text-view-insights"
                  placeholder="Button text"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

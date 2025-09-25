'use client';

import React from 'react';
import { 
  TrendingUp, 
  Building2, 
  Handshake, 
  PieChart, 
  BarChart3, 
  Shield,
  Target,
  Users,
  Globe,
  Briefcase
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'advisory',
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Strategic investment guidance and portfolio management services for institutional clients.',
      features: [
        'Portfolio optimization and risk management',
        'Asset allocation strategies',
        'Performance monitoring and reporting',
        'Custom investment solutions'
      ],
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop'
    },
    {
      id: 'capital',
      icon: Building2,
      title: 'Capital Markets',
      description: 'Comprehensive capital raising and market access solutions for growing businesses.',
      features: [
        'Equity and debt capital raising',
        'IPO and secondary offerings',
        'Private placements',
        'Market making and liquidity provision'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
    },
    {
      id: 'ma',
      icon: Handshake,
      title: 'M&A Advisory',
      description: 'Expert merger and acquisition advisory services to maximize shareholder value.',
      features: [
        'Buy-side and sell-side advisory',
        'Valuation and due diligence',
        'Deal structuring and negotiation',
        'Post-merger integration support'
      ],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
    },
    {
      id: 'wealth',
      icon: PieChart,
      title: 'Wealth Management',
      description: 'Comprehensive wealth management solutions for high-net-worth individuals and families.',
      features: [
        'Investment planning and management',
        'Estate planning and trust services',
        'Tax optimization strategies',
        'Family office services'
      ],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We begin by understanding your unique needs, goals, and challenges through comprehensive consultation.',
      icon: Target
    },
    {
      number: '02',
      title: 'Analysis',
      description: 'Our team conducts thorough market research and financial analysis to develop tailored strategies.',
      icon: BarChart3
    },
    {
      number: '03',
      title: 'Strategy',
      description: 'We design and present customized solutions that align with your objectives and risk tolerance.',
      icon: Shield
    },
    {
      number: '04',
      title: 'Execution',
      description: 'Our experienced professionals implement the strategies with precision and ongoing monitoring.',
      icon: Briefcase
    }
  ];

  const stats = [
    { number: '500+', label: 'Deals Completed', icon: Handshake },
    { number: '$50B+', label: 'Capital Raised', icon: Building2 },
    { number: '98%', label: 'Client Satisfaction', icon: Users },
    { number: '25+', label: 'Years Experience', icon: Globe }
  ];

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
            Our Services
          </h1>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
            }}
          >
            Comprehensive financial advisory services designed to help you achieve 
            your investment and business objectives.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: 'var(--space-16) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-6)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--gradient-accent)',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={30} color="var(--text-primary)" />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--text-accent)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {stat.number}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-medium)',
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
              }}
            >
              Service Offerings
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-xl)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Tailored solutions to meet your unique financial needs
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-12)',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          background: 'var(--gradient-accent)',
                          borderRadius: 'var(--radius-lg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent size={30} color="var(--text-primary)" />
                      </div>
                      <h3
                        style={{
                          fontSize: 'var(--text-3xl)',
                          fontWeight: 'var(--font-weight-bold)',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-family-heading)',
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-lg)',
                        lineHeight: '1.6',
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {service.description}
                    </p>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-3)',
                      }}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              background: 'var(--color-accent)',
                              borderRadius: 'var(--radius-full)',
                            }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-xl)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        style={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontSize: 'var(--text-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-family-heading)',
              }}
            >
              Our Process
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-xl)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              A systematic approach to delivering exceptional results
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-8)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-primary)',
                    position: 'relative',
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
                  <div
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '40px',
                      background: 'var(--color-accent)',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--text-inverse)',
                    }}
                  >
                    {step.number}
                  </div>
                  
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--gradient-accent)',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'var(--space-4) auto var(--space-6)',
                    }}
                  >
                    <IconComponent size={40} color="var(--text-primary)" />
                  </div>
                  
                  <h3
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {step.title}
                  </h3>
                  
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--gradient-accent)',
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
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-8)',
              opacity: 0.9,
            }}
          >
            Contact our team to discuss how we can help you achieve your financial goals.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: 'var(--space-4) var(--space-8)',
                background: 'var(--text-primary)',
                color: 'var(--text-inverse)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact Us
            </a>
            <a
              href="/about"
              style={{
                display: 'inline-block',
                padding: 'var(--space-4) var(--space-8)',
                background: 'transparent',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--text-primary)',
                fontWeight: 'var(--font-weight-semibold)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--text-primary)';
                e.currentTarget.style.color = 'var(--text-inverse)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

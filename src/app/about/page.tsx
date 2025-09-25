'use client';

import React from 'react';
import { Building2, Users, Target, Award, TrendingUp, Shield, Globe, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Successful Deals', icon: TrendingUp },
    { number: '$50B+', label: 'Assets Under Management', icon: Shield },
    { number: '25+', label: 'Years of Experience', icon: Award },
    { number: '100+', label: 'Global Clients', icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, delivering exceptional results for our clients.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Trust and transparency are the foundation of our relationships with clients and partners.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technology and innovative approaches to solve complex financial challenges.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as trusted partners, understanding their unique needs and goals.',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      position: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'David Chen',
      position: 'Chief Investment Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Capital Markets',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Michael Thompson',
      position: 'Managing Director, M&A',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
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
            About Elluminate Capital
          </h1>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: 'var(--space-8)',
            }}
          >
            We are a leading investment banking firm dedicated to providing exceptional 
            financial advisory services to institutional clients worldwide.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                    padding: 'var(--space-8)',
                    background: 'var(--bg-secondary)',
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

      {/* Our Story Section */}
      <section
        style={{
          padding: 'var(--space-20) var(--space-6)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-12)',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-6)',
                  fontFamily: 'var(--font-family-heading)',
                }}
              >
                Our Story
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--space-6)',
                  fontSize: 'var(--text-lg)',
                }}
              >
                Founded in 1998, Elluminate Capital has grown from a boutique advisory firm 
                to a leading investment banking powerhouse. Our journey began with a simple 
                mission: to provide exceptional financial advisory services that truly serve 
                our clients' best interests.
              </p>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--space-8)',
                  fontSize: 'var(--text-lg)',
                }}
              >
                Today, we manage over $50 billion in assets and have completed more than 
                500 successful transactions across various industries and markets worldwide. 
                Our success is built on the foundation of trust, integrity, and unwavering 
                commitment to our clients' success.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-6)',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <Building2 size={40} color="var(--text-accent)" />
                <div>
                  <h4
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-weight-semibold)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    Global Presence
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                    Offices in New York, London, Hong Kong, and Singapore
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Modern office building"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-xl)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              The principles that guide everything we do
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: 'var(--space-8)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-primary)',
                    transition: 'all var(--transition-normal)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                    e.currentTarget.style.borderColor = 'var(--border-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'var(--gradient-accent)',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto var(--space-6)',
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
                    {value.title}
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Leadership Team
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-xl)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Meet the experienced professionals leading our firm
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-8)',
            }}
          >
            {team.map((member, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-6)',
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
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    margin: '0 auto var(--space-4)',
                    border: '3px solid var(--border-accent)',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    color: 'var(--text-accent)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, Share2 } from 'lucide-react';

// Simple chart using SVG to avoid bringing a heavy charting lib
function LineChart({ data }: { data: Array<{ x: number; y: number }> }) {
  const width = 800;
  const height = 240;
  const padding = 32;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX || 1)) * (width - padding * 2);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY || 1)) * (height - padding * 2);
  const path = data
    .map((d, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(d.x)} ${scaleY(d.y)}`)
    .join(' ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
      <path d={path} fill="none" stroke="var(--text-accent)" strokeWidth={2} />
      {data.map((d, i) => (
        <circle key={i} cx={scaleX(d.x)} cy={scaleY(d.y)} r={3} fill="var(--text-accent)" />
      ))}
    </svg>
  );
}

const articles = [
  {
    slug: 'future-of-sustainable-investing',
    title: 'The Future of Sustainable Investing',
    author: 'David Chen',
    date: 'December 10, 2023',
    readTime: '5 min read',
    cover: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=600&fit=crop',
    sections: [
      {
        heading: 'Overview',
        body: 'Sustainable investing integrates environmental, social, and governance (ESG) factors into investment decisions. In this article, we explore the drivers, performance considerations, and strategic implications for institutional portfolios.',
        image: '/trading1.png',
      },
      {
        heading: 'Performance & Risk',
        body: 'Multiple studies indicate that well-constructed ESG strategies can provide comparable or superior risk-adjusted returns. However, factor exposures, sector tilts, and data quality must be carefully managed.',
        video: '/videos/mainvideo.mp4',
      },
    ],
  },
  {
    slug: 'market-outlook-2024',
    title: 'Market Outlook 2024: Navigating Economic Uncertainty',
    author: 'Sarah Mitchell',
    date: 'December 15, 2023',
    readTime: '8 min read',
    cover: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
    sections: [
      {
        heading: 'Executive Summary',
        body: 'A broad review of inflation normalization, policy shifts, and sector rotations shaping 2024 market dynamics, with scenario-based playbooks for asset allocators.',
        image: '/Trading.jpeg',
      },
      {
        heading: 'Macro Landscape',
        body: 'Our base case assumes a softening growth environment with disinflation trends. We discuss implications for duration exposure, equity style factors, and alternatives.',
        video: '/videos/mainvideo.mp4',
      },
    ],
  },
  {
    slug: 'private-equity-trends-2024',
    title: 'Private Equity Trends in 2024',
    author: 'Emily Rodriguez',
    date: 'December 8, 2023',
    readTime: '6 min read',
    cover: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
    sections: [
      {
        heading: 'Dry Powder & Valuations',
        body: 'Despite higher rates, dry powder remains elevated, driving competition for quality assets. Managers are adapting underwriting to reflect new exit timelines and cost of capital.',
        image: '/trading2.png',
      },
    ],
  },
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  const chartData = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: 50 + Math.sin(i / 2) * 20 + i }));

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Cover */}
      <section style={{ position: 'relative', height: '360px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.cover} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,15,26,0.9), rgba(26,15,26,0.2))' }} />
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', width: 'min(1100px, 92%)' }}>
          <h1 style={{ color: 'var(--text-inverse)', fontSize: 'var(--text-5xl)', marginBottom: 8 }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--text-inverse)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><User size={16} /> {article.author}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> {article.date}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock size={16} /> {article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '40px 0', background: 'var(--bg-primary)' }}>
        <div style={{ width: 'min(1100px, 92%)', margin: '0 auto', display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 32 }}>
          <article>
            {article.sections.map((s, idx) => (
              <div key={idx} style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 12 }}>{s.heading}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>{s.body}</p>
                {s.image && (
                  <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-primary)', marginBottom: 16 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt={s.heading} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                )}
                {s.video && (
                  <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-primary)', marginBottom: 16 }}>
                    <video src={s.video} controls style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                )}
              </div>
            ))}

            <div style={{ marginTop: 40 }}>
              <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 12 }}>Market Trend Illustration</h2>
              <LineChart data={chartData} />
            </div>
          </article>

          <aside>
            <div style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <button
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-accent)',
                  color: 'var(--text-inverse)',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: article.title, url: window.location.href }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard');
                  }
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Share2 size={16} /> Share</span>
              </button>
              <div style={{ padding: 16, border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)' }}>
                <h3 style={{ marginBottom: 8 }}>About the author</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Senior analyst with a focus on thematic strategies and long-horizon capital allocation.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}



import { BlogType } from '../types/blog';

export const blogTypes: BlogType[] = [
  {
    _id: '1',
    typeId: 'market-analysis',
    name: 'Market Analysis',
    slug: 'market-analysis',
    description: 'In-depth analysis of market trends, economic indicators, and investment opportunities.',
    blogs: [
      {
        _id: '1',
        blogId: 'blog-1',
        title: 'Global Market Outlook 2024',
        slug: 'global-market-outlook-2024',
        excerpt: 'A comprehensive analysis of global market trends and investment opportunities for the coming year.',
        author: 'Sarah Mitchell',
        image: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=600&h=400&fit=crop',
        tags: ['Market Analysis', 'Global Markets', 'Investment Strategy'],
        publishedAt: '2024-01-15T00:00:00Z',
        viewCount: 1250,
        readTime: 8
      },
      {
        _id: '2',
        blogId: 'blog-2',
        title: 'Emerging Markets: Opportunities and Risks',
        slug: 'emerging-markets-opportunities-risks',
        excerpt: 'Exploring the potential of emerging markets and the key factors investors should consider.',
        author: 'David Chen',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop',
        tags: ['Emerging Markets', 'Risk Analysis'],
        publishedAt: '2024-01-10T00:00:00Z',
        viewCount: 980,
        readTime: 6
      }
    ]
  },
  {
    _id: '2',
    typeId: 'investment-strategy',
    name: 'Investment Strategy',
    slug: 'investment-strategy',
    description: 'Strategic insights and best practices for building robust investment portfolios.',
    blogs: [
      {
        _id: '3',
        blogId: 'blog-3',
        title: 'Portfolio Diversification in 2024',
        slug: 'portfolio-diversification-2024',
        excerpt: 'Modern approaches to portfolio diversification and risk management in today\'s market environment.',
        author: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
        tags: ['Portfolio Management', 'Risk Management'],
        publishedAt: '2024-01-20T00:00:00Z',
        viewCount: 1520,
        readTime: 10
      },
      {
        _id: '4',
        blogId: 'blog-4',
        title: 'Value Investing: Time-Tested Principles',
        slug: 'value-investing-principles',
        excerpt: 'Exploring the fundamentals of value investing and how to identify undervalued opportunities.',
        author: 'Emily Rodriguez',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
        tags: ['Value Investing', 'Fundamental Analysis'],
        publishedAt: '2024-01-05T00:00:00Z',
        viewCount: 1100,
        readTime: 7
      }
    ]
  },
  {
    _id: '3',
    typeId: 'industry-trends',
    name: 'Industry Trends',
    slug: 'industry-trends',
    description: 'Analysis of sector-specific trends and industry developments.',
    blogs: [
      {
        _id: '5',
        blogId: 'blog-5',
        title: 'Technology Sector: Growth and Valuation',
        slug: 'technology-sector-growth-valuation',
        excerpt: 'Examining the technology sector\'s growth trajectory and current valuation metrics.',
        author: 'David Thompson',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
        tags: ['Technology', 'Sector Analysis'],
        publishedAt: '2024-01-18T00:00:00Z',
        viewCount: 1350,
        readTime: 9
      },
      {
        _id: '6',
        blogId: 'blog-6',
        title: 'Energy Transition: Investment Implications',
        slug: 'energy-transition-investment',
        excerpt: 'How the global energy transition is reshaping investment opportunities across sectors.',
        author: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop',
        tags: ['Energy', 'ESG', 'Sustainability'],
        publishedAt: '2024-01-12T00:00:00Z',
        viewCount: 1020,
        readTime: 8
      }
    ]
  },
  {
    _id: '4',
    typeId: 'technology-innovation',
    name: 'Technology & Innovation',
    slug: 'technology-innovation',
    description: 'Insights on technological innovation and its impact on financial markets.',
    blogs: [
      {
        _id: '7',
        blogId: 'blog-7',
        title: 'AI in Financial Services: Current State and Future',
        slug: 'ai-financial-services-future',
        excerpt: 'A comprehensive report on artificial intelligence applications in financial services and investment management.',
        author: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        tags: ['Artificial Intelligence', 'FinTech', 'Innovation'],
        publishedAt: '2024-01-22T00:00:00Z',
        viewCount: 1800,
        readTime: 12
      },
      {
        _id: '8',
        blogId: 'blog-8',
        title: 'Blockchain and Cryptocurrency: Market Dynamics',
        slug: 'blockchain-cryptocurrency-dynamics',
        excerpt: 'Analyzing the evolving landscape of blockchain technology and cryptocurrency markets.',
        author: 'Emily Rodriguez',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
        tags: ['Blockchain', 'Cryptocurrency', 'Digital Assets'],
        publishedAt: '2024-01-08T00:00:00Z',
        viewCount: 1450,
        readTime: 11
      }
    ]
  }
];

// Helper function to get all blogs
export const getAllBlogs = (): BlogType['blogs'][0][] => {
  const allBlogs: BlogType['blogs'][0][] = [];
  blogTypes.forEach(type => {
    allBlogs.push(...type.blogs);
  });
  // Sort by publishedAt descending
  return allBlogs.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

// Helper function to get blogs by category
export const getBlogsByCategory = (categoryName: string): BlogType['blogs'][0][] => {
  if (categoryName === 'All') return getAllBlogs();
  
  const category = blogTypes.find(type => type.name === categoryName);
  return category ? category.blogs : [];
};

// Helper function to get category names
export const getCategoryNames = (): string[] => {
  return ['All', ...blogTypes.map(type => type.name)];
};


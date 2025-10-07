import { PageType, ApiResponse, LandingPageContent, HeroContent, TransformedStats } from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';

// Utility functions for data transformation
export const transformStatsForAnimation = (numbers: { value: string; label: string }[]): TransformedStats => {
  const stats: TransformedStats = { clients: 0, deals: 0, years: 0, assets: 0 };
  
  numbers.forEach(({ value, label }) => {
    // Extract numeric value from formatted string
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    
    switch (label) {
      case 'Global Clients':
        stats.clients = numericValue;
        break;
      case 'Deals Completed':
        stats.deals = numericValue;
        break;
      case 'Years Experience':
        stats.years = numericValue;
        break;
      case 'Assets Under Management':
        stats.assets = numericValue;
        break;
    }
  });
  
  return stats;
};

export const transformHeroContent = (data: LandingPageContent): HeroContent => {
  const transformedStats = transformStatsForAnimation(data.numbers);
  
  return {
    title: data.title,
    subtitle: data.subtitle,
    stats: transformedStats,
    displayStats: data.numbers,
    features: data.items,
    buttons: data.btnTxt.map(btn => btn.buttonText),
  };
};

// Server-side data fetching function
export async function getPageContent(pageType: PageType): Promise<HeroContent | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/page/getPageContent?pageType=${pageType}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<LandingPageContent> = await response.json();
    
    if (data.success && data.data) {
      return transformHeroContent(data.data);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

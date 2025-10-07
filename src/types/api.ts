export enum PageType {
  STORY = 'story',
  LEADERSHIP_TEAM = 'leadershipTeam',
  LANDING = 'landing',
  VISION = 'vision',
  INVESTMENT_STRATEGY = 'investmentStrategy',
  PARTNERS = 'partners',
  INSIGHTS = 'insights',
  SUCCESS_STORIES = 'successStories',
  PERFORMANCE_METRICS = 'performanceMetrics',
  JOIN_SUCCESS = 'joinSuccess',
}

export interface StatNumber {
  value: string;
  label: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ButtonText {
  buttonText: string;
}

export interface PageContentData {
  _id: string;
  pageContentId: string;
  pageType: PageType;
  title: string;
  subtitle: string;
  numbers: StatNumber[];
  items: FeatureItem[];
  btnTxt: ButtonText[];
  content: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  slug: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface LandingPageContent extends PageContentData {
  pageType: PageType.LANDING;
}

// Transformed data for component usage
export interface TransformedStats {
  clients: number;
  deals: number;
  years: number;
  assets: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  stats: TransformedStats;
  displayStats: StatNumber[];
  features: FeatureItem[];
  buttons: string[];
}

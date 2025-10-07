export interface BlogType {
  _id: string;
  typeId: string;
  name: string;
  slug: string;
  description: string;
  blogs: Blog[];
}

export interface Blog {
  _id: string;
  blogId: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  image?: string;
  tags: string[];
  publishedAt: string;
  viewCount: number;
  readTime: number;
}

export interface BlogApiResponse {
  success: boolean;
  message: string;
  data: BlogType[];
}

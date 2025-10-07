import { BlogType, Blog, BlogApiResponse } from '../types/blog';

export class BlogService {
  private static baseUrl = 'http://localhost:5050';

  static async getTypesWithBlogs(limit: number = 5, adminMode: boolean = false): Promise<BlogType[]> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        ...(adminMode && { admin: 'true' })
      });

      const response = await fetch(`${this.baseUrl}/blog/getTypesWithBlogs?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BlogApiResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch blog types');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching blog types with blogs:', error);
      throw error;
    }
  }

  static async getAllBlogs(): Promise<Blog[]> {
    try {
      const blogTypes = await this.getTypesWithBlogs(10, true); // Get more blogs in admin mode
      const allBlogs: Blog[] = [];
      
      blogTypes.forEach(type => {
        allBlogs.push(...type.blogs);
      });

      // Sort by publishedAt descending
      return allBlogs.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      throw error;
    }
  }

  static async getBlogsByCategory(categoryName: string): Promise<Blog[]> {
    try {
      const blogTypes = await this.getTypesWithBlogs(10, true);
      const category = blogTypes.find(type => type.name === categoryName);
      
      return category ? category.blogs : [];
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }
  }

  static async getFeaturedBlog(): Promise<Blog | null> {
    try {
      const allBlogs = await this.getAllBlogs();
      return allBlogs.length > 0 ? allBlogs[0] : null;
    } catch (error) {
      console.error('Error fetching featured blog:', error);
      throw error;
    }
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static getReadTimeText(readTime: number): string {
    return `${readTime} min read`;
  }
}

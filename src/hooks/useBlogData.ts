import { useState, useEffect } from 'react';
import { BlogType, Blog } from '../types/blog';
import { BlogService } from '../services/blogService';

export const useBlogData = () => {
  const [blogTypes, setBlogTypes] = useState<BlogType[]>([]);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch blog types with blogs
        const types = await BlogService.getTypesWithBlogs(5, false);
        setBlogTypes(types);

        // Get all blogs from all types
        const blogs: Blog[] = [];
        types.forEach(type => {
          blogs.push(...type.blogs);
        });

        // Sort by publishedAt descending
        const sortedBlogs = blogs.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        setAllBlogs(sortedBlogs);
        setFeaturedBlog(sortedBlogs.length > 0 ? sortedBlogs[0] : null);

        console.log('Blog data fetched successfully:', { types, blogs: sortedBlogs });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog data';
        setError(errorMessage);
        console.error('Error fetching blog data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const getBlogsByCategory = (categoryName: string): Blog[] => {
    if (categoryName === 'All') return allBlogs;
    
    const category = blogTypes.find(type => type.name === categoryName);
    return category ? category.blogs : [];
  };

  const getCategoryNames = (): string[] => {
    return ['All', ...blogTypes.map(type => type.name)];
  };

  return {
    blogTypes,
    allBlogs,
    featuredBlog,
    isLoading,
    error,
    getBlogsByCategory,
    getCategoryNames
  };
};

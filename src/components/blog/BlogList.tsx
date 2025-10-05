import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeWrapper from '../ThemeWrapper';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const importPosts = async () => {
      const modules = import.meta.glob('/src/blog/*.md', { as: 'raw' });
      const posts: BlogPost[] = [];
      
      for (const path in modules) {
        const content = await modules[path]();
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const frontmatter = extractFrontmatter(content);
        
        posts.push({
          slug,
          title: frontmatter.title || slug,
          date: frontmatter.date || '',
          excerpt: frontmatter.excerpt || ''
        });
      }
      
      setPosts(posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    
    importPosts();
  }, []);

  const extractFrontmatter = (content: string) => {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    
    const frontmatter: any = {};
    match[1].split('\n').forEach(line => {
      const [key, ...value] = line.split(':');
      if (key && value.length) {
        frontmatter[key.trim()] = value.join(':').trim().replace(/['"]/g, '');
      }
    });
    return frontmatter;
  };

  return (
    <ThemeWrapper>
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold">Blog Posts</h1>
                  <Link to="/" className="btn btn-outline btn-sm">← Home</Link>
                </div>
                
                <div className="space-y-6">
                  {posts.map(post => (
                    <article key={post.slug} className="border-b border-base-300 pb-6 last:border-b-0">
                      <Link to={`/blog/${post.slug}`} className="block group">
                        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        {post.date && (
                          <time className="text-sm text-base-content/70 block mt-1">
                            {post.date}
                          </time>
                        )}
                        {post.excerpt && (
                          <p className="text-base-content/80 mt-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </Link>
                    </article>
                  ))}
                  
                  {posts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-base-content/60">No blog posts found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default BlogList;

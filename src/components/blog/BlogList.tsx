import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeWrapper from '../ThemeWrapper';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const importPosts = async () => {
      const modules = import.meta.glob('/src/blog/*.md', { as: 'raw' });
      const posts: BlogPost[] = [];
      const tagSet = new Set<string>();

      for (const path in modules) {
        const content = await modules[path]();
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const frontmatter = extractFrontmatter(content);
        const tags = frontmatter.tags ? frontmatter.tags.split(',').map((tag: string) => tag.trim()) : [];

        tags.forEach(tag => tagSet.add(tag));

        posts.push({
          slug,
          title: frontmatter.title || slug,
          date: frontmatter.date || '',
          excerpt: frontmatter.excerpt || '',
          tags
        });
      }

      const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
      setAllTags(Array.from(tagSet).sort());
    };

    importPosts();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setFilteredPosts(posts.filter(post => post.tags.includes(selectedTag)));
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedTag, posts]);

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
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
              <div className="card-body p-8 lg:p-12">
                <div className="text-center mb-12">
                  <div className="w-20 h-1 bg-gradient-to-r mx-auto mb-6 rounded-full"></div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text">
                    Blog Posts
                  </h1>
                  <Link to="/" className="btn btn-outline btn-sm hover:scale-105 transition-transform">
                    ← Home
                  </Link>
                </div>

                {/* Tag Filter */}
                {allTags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-base-content">Filter by tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedTag('')}
                        className={`badge badge-lg transition-all ${selectedTag === ''
                          ? 'badge-primary'
                          : 'badge-outline hover:badge-primary'
                          }`}
                      >
                        All ({posts.length})
                      </button>
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`badge badge-lg transition-all ${selectedTag === tag
                            ? 'badge-primary'
                            : 'badge-outline hover:badge-primary'
                            }`}
                        >
                          #{tag} ({posts.filter(post => post.tags.includes(tag)).length})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid gap-8 md:grid-cols-2">
                  {filteredPosts.map(post => (
                    <article key={post.slug} className="group">
                      <Link to={`/blog/${post.slug}`} className="block">
                        <div className="card bg-base-200/50 hover:bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300/50 hover:border-primary/30 group-hover:scale-[1.02]">
                          <div className="card-body p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                                {post.title}
                              </h2>
                              <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-2 flex-shrink-0"></div>
                            </div>

                            {post.date && (
                              <time className="text-sm text-base-content/60 font-medium tracking-wide block mb-3">
                                {post.date}
                              </time>
                            )}

                            {post.excerpt && (
                              <p className="text-base-content/80 leading-relaxed mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                            )}

                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                  <span key={tag} className="badge badge-outline badge-sm opacity-70 group-hover:opacity-100 transition-opacity">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-base-content/60 text-lg">
                      {selectedTag ? `No posts found with tag "${selectedTag}"` : 'No blog posts found.'}
                    </p>
                    {selectedTag && (
                      <button
                        onClick={() => setSelectedTag('')}
                        className="btn btn-outline btn-sm mt-4"
                      >
                        Clear filter
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default BlogList;

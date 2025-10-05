import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiNewspaper } from 'react-icons/pi';
import { formatDistance } from 'date-fns';
import { skeleton } from '../../utils';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const LocalBlogCard = ({
  loading,
  googleAnalyticsId,
}: {
  loading: boolean;
  googleAnalyticsId?: string;
}) => {
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

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 5; index++) {
      array.push(
        <div className="card shadow-md card-sm bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col md:flex-row">
              <div className="avatar mb-5 md:mb-0">
                <div className="w-24 h-24 mask mask-squircle">
                  {skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto md:mx-0',
                      })}
                    </h2>
                    {skeleton({
                      widthCls: 'w-24',
                      heightCls: 'h-3',
                      className: 'mx-auto md:mx-0',
                    })}
                    <div className="mt-3">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto md:mx-0',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }
    return array;
  };

  const renderBlogs = () => {
    return posts && posts.length ? (
      posts.slice(0, 5).map((post, index) => (
        <Link
          className="card shadow-md card-sm bg-base-100 cursor-pointer hover:shadow-lg transition-shadow"
          key={index}
          to={`/blog/${post.slug}`}
        >
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col md:flex-row">
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="text-center md:text-left w-full">
                    <h2 className="font-medium text-base-content opacity-60">
                      {post.title}
                    </h2>
                    {post.date && (
                      <p className="text-base-content opacity-50 text-xs">
                        {formatDistance(new Date(post.date), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                    )}
                    {post.excerpt && (
                      <p className="mt-3 text-base-content text-sm">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <div className="text-center mb-6">
        <PiNewspaper className="mx-auto h-12 w-12 opacity-30" />
        <p className="mt-1 text-sm opacity-50 text-base-content">
          No blog posts found
        </p>
      </div>
    );
  };

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
              {loading ? (
                skeleton({
                  widthCls: 'w-12',
                  heightCls: 'h-12',
                  className: 'rounded-xl',
                })
              ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                  <PiNewspaper className="text-2xl" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-base-content truncate">
                  {loading
                    ? skeleton({ widthCls: 'w-28', heightCls: 'h-8' })
                    : 'Blog Posts'}
                </h3>
                <div className="text-base-content/60 text-xs sm:text-sm mt-1 truncate">
                  {loading
                    ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                    : 'Recent posts'}
                </div>
              </div>
            </div>
            <Link to="/blog" className="btn btn-outline btn-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {loading ? renderSkeleton() : renderBlogs()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalBlogCard;

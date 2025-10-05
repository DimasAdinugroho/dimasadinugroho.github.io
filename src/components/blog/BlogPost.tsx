import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeWrapper from '../ThemeWrapper';
import 'katex/dist/katex.min.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState('');
  const [frontmatter, setFrontmatter] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const module = await import(/* @vite-ignore */ `/src/blog/${slug}.md?raw`);
        const rawContent = module.default;

        const match = rawContent.match(/^---\n([\s\S]*?)\n---([\s\S]*)$/);
        if (match) {
          const fm: any = {};
          match[1].split('\n').forEach((line: string) => {
            const [key, ...value] = line.split(':');
            if (key && value.length) {
              fm[key.trim()] = value.join(':').trim().replace(/['"]/g, '');
            }
          });
          setFrontmatter(fm);
          setContent(match[2].trim());
        } else {
          setContent(rawContent);
        }
      } catch (error) {
        setContent('# Post not found\n\nThe requested blog post could not be found.');
      }
      setLoading(false);
    };

    if (slug) loadPost();
  }, [slug]);

  if (loading) {
    return (
      <ThemeWrapper>
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </ThemeWrapper>
    );
  }

  return (
    <ThemeWrapper>
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
              <div className="card-body p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <Link to="/blog" className="btn btn-outline btn-sm hover:scale-105 transition-transform">
                    ← Back to Blog
                  </Link>
                  <Link to="/" className="btn btn-ghost btn-sm hover:scale-105 transition-transform">
                    Home
                  </Link>
                </div>

                <header className="mb-12 text-center">
                  <div className="w-20 h-1 bg-gradient-to-r mx-auto mb-6 rounded-full"></div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text leading-tight">
                    {frontmatter.title || slug}
                  </h1>
                  {frontmatter.date && (
                    <time className="text-base-content/60 text-lg font-medium tracking-wide">
                      {frontmatter.date}
                    </time>
                  )}
                  {frontmatter.tags && (
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      {frontmatter.tags.split(',').map((tag: string, index: number) => (
                        <span key={index} className="badge badge-outline badge-lg hover:badge-primary transition-colors cursor-default">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {frontmatter.excerpt && (
                    <div className="max-w-2xl mx-auto mt-8">
                      <div className="w-12 h-0.5 bg-base-content/20 mx-auto mb-4"></div>
                      <p className="text-xl text-base-content/70 leading-relaxed italic font-light">
                        {frontmatter.excerpt}
                      </p>
                      <div className="w-12 h-0.5 bg-base-content/20 mx-auto mt-4"></div>
                    </div>
                  )}
                </header>

                <div className="markdown-content prose-lg max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({ children }) => (
                        <div className="my-12">
                          <h1 className="text-4xl font-bold text-base-content relative">
                            <span className="absolute -left-6 top-0 w-2 h-full bg-gradient-to-b rounded-full"></span>
                            {children}
                          </h1>
                        </div>
                      ),
                      h2: ({ children }) => (
                        <div className="my-10">
                          <h2 className="text-3xl font-bold text-base-content relative">
                            <span className="absolute -left-4 top-1 w-1.5 h-8 bg-gradient-to-b rounded-full"></span>
                            {children}
                          </h2>
                        </div>
                      ),
                      h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-base-content border-b border-base-300 pb-2">{children}</h3>,
                      h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-3 text-base-content">{children}</h4>,
                      h5: ({ children }) => <h5 className="text-lg font-bold mt-4 mb-2 text-base-content">{children}</h5>,
                      h6: ({ children }) => <h6 className="text-base font-bold mt-3 mb-2 text-base-content">{children}</h6>,
                      p: ({ children }) => <p className="mb-6 text-lg text-base-content leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-none mb-6 ml-0 text-lg text-base-content space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-6 ml-4 text-lg text-base-content space-y-2">{children}</ol>,
                      li: ({ children }) => (
                        <li className="relative pl-6">
                          <span className="absolute left-0 top-2 w-2 h-2 bg-primary rounded-full"></span>
                          {children}
                        </li>
                      ),
                      a: ({ href, children }) => (
                        <a href={href} className="text-primary hover:text-secondary underline decoration-2 underline-offset-2 hover:decoration-wavy transition-all">
                          {children}
                        </a>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary bg-base-200/50 pl-6 py-4 my-8 italic text-base-content/80 rounded-r-lg">
                          <div className="text-primary text-4xl mb-2">"</div>
                          {children}
                        </blockquote>
                      ),
                      code: ({ children, className }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        return !className ? (
                          <code className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-mono border border-primary/20">
                            {children}
                          </code>
                        ) : (
                          <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-base-300">
                            <div className="bg-base-300 px-4 py-2 text-sm font-medium text-base-content/70 border-b border-base-300">
                              {language || 'code'}
                            </div>
                            <SyntaxHighlighter
                              style={nord}
                              language={language}
                              PreTag="div"
                              customStyle={{
                                margin: 0,
                                borderRadius: 0,
                              }}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        );
                      },
                      pre: ({ children }) => <div className="not-prose">{children}</div>,
                      table: ({ children }) => (
                        <div className="overflow-x-auto mb-8 rounded-lg border border-base-300 shadow-sm">
                          <table className="table table-zebra w-full">{children}</table>
                        </div>
                      ),
                      thead: ({ children }) => <thead className="bg-base-200">{children}</thead>,
                      tbody: ({ children }) => <tbody>{children}</tbody>,
                      tr: ({ children }) => <tr className="hover:bg-base-100">{children}</tr>,
                      th: ({ children }) => <th className="text-base-content font-bold">{children}</th>,
                      td: ({ children }) => <td className="text-base-content">{children}</td>,
                      hr: () => (
                        <div className="my-12 flex items-center justify-center">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                          <div className="mx-4 w-2 h-2 bg-primary rounded-full"></div>
                          <div className="w-16 h-0.5 bg-gradient-to-r from-primary via-transparent to-transparent"></div>
                        </div>
                      ),
                      strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                      em: ({ children }) => <em className="italic text-secondary">{children}</em>,
                      img: ({ src, alt }) => (
                        <div className="my-8 text-center">
                          <img src={src} alt={alt} className="max-w-full h-auto rounded-xl shadow-lg mx-auto border border-base-300" />
                          {alt && <p className="text-sm text-base-content/60 mt-2 italic">{alt}</p>}
                        </div>
                      )
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default BlogPost;

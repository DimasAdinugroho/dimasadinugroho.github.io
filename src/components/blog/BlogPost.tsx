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
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-6">
                  <Link to="/blog" className="btn btn-outline btn-sm">← Back to Blog</Link>
                  <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
                </div>

                <header className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">
                    {frontmatter.title || slug}
                  </h1>
                  {frontmatter.date && (
                    <time className="text-base-content/70">
                      Date: {frontmatter.date}
                    </time>
                  )}
                  {frontmatter.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {frontmatter.tags.split(',').map((tag: string, index: number) => (
                        <span key={index} className="badge badge-outline badge-sm">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {frontmatter.excerpt && (
                    <p className="text-lg text-base-content/80 mt-4 italic">
                      {frontmatter.excerpt}
                    </p>
                  )}
                </header>

                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-base-content">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-base-content">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2 text-base-content">{children}</h3>,
                      h4: ({ children }) => <h4 className="text-lg font-bold mt-3 mb-2 text-base-content">{children}</h4>,
                      h5: ({ children }) => <h5 className="text-base font-bold mt-2 mb-1 text-base-content">{children}</h5>,
                      h6: ({ children }) => <h6 className="text-sm font-bold mt-2 mb-1 text-base-content">{children}</h6>,
                      p: ({ children }) => <p className="mb-4 text-lg text-base-content leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-4 ml-4 text-lg text-base-content">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-4 ml-4 text-lg text-base-content">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-base-content/80">{children}</blockquote>,
                      code: ({ children, className }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        return !className ? (
                          <code className="bg-base-300 px-1 py-0.5 rounded text-sm font-mono text-base-content">{children}</code>
                        ) : (
                          <SyntaxHighlighter
                            style={nord}
                            language={language}
                            PreTag="div"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        );
                      },
                      pre: ({ children }) => <pre className="bg-base-200 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                      table: ({ children }) => <div className="overflow-x-auto mb-4"><table className="table table-zebra w-full">{children}</table></div>,
                      thead: ({ children }) => <thead>{children}</thead>,
                      tbody: ({ children }) => <tbody>{children}</tbody>,
                      tr: ({ children }) => <tr>{children}</tr>,
                      th: ({ children }) => <th className="text-base-content font-bold">{children}</th>,
                      td: ({ children }) => <td className="text-base-content">{children}</td>,
                      hr: () => <hr className="border-base-300 my-8" />,
                      strong: ({ children }) => <strong className="font-bold text-base-content">{children}</strong>,
                      em: ({ children }) => <em className="italic text-base-content">{children}</em>,
                      img: ({ src, alt }) => <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" />
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

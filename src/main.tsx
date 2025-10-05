import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GitProfile from './components/gitprofile.tsx';
import BlogList from './components/blog/BlogList.tsx';
import BlogPost from './components/blog/BlogPost.tsx';

const App = () => {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const loadConfig = async () => {
      const { default: CONFIG } = await import('../gitprofile.config' as any);
      setConfig(CONFIG);
    };
    loadConfig();
  }, []);

  if (!config) return <div>Loading...</div>;

  return (
    <BrowserRouter basename={config.base}>
      <Routes>
        <Route path="/" element={<GitProfile config={config} />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

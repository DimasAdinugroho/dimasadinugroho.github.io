import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GitProfile from './components/gitprofile.tsx';
import BlogList from './components/blog/BlogList.tsx';
import BlogPost from './components/blog/BlogPost.tsx';
import CONFIG from '../gitprofile.config.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={CONFIG.base}>
      <Routes>
        <Route path="/" element={<GitProfile config={CONFIG} />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

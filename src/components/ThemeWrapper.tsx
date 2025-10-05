import { useEffect, useState } from 'react';
import { getInitialTheme, getSanitizedConfig } from '../utils';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [_, setTheme] = useState<string>('');

  useEffect(() => {
    const loadConfig = async () => {
      const { default: CONFIG } = await import('../../gitprofile.config' as any);
      const sanitizedConfig = getSanitizedConfig(CONFIG);
      const initialTheme = getInitialTheme(sanitizedConfig.themeConfig);
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    };
    loadConfig();
  }, []);

  return <>{children}</>;
};

export default ThemeWrapper;

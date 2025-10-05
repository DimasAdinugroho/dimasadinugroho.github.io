import { useEffect, useState } from 'react';
import { getInitialTheme, getSanitizedConfig } from '../utils';
import CONFIG from '../../gitprofile.config';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    const sanitizedConfig = getSanitizedConfig(CONFIG);
    const initialTheme = getInitialTheme(sanitizedConfig.themeConfig);
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  return <>{children}</>;
};

export default ThemeWrapper;

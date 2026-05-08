import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('iss-dashboard-theme') || 'dark';
  });

  useEffect(() => {
    // Persist theme to localStorage
    localStorage.setItem('iss-dashboard-theme', theme);
    // Apply/remove 'light' class on document root for CSS variables
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

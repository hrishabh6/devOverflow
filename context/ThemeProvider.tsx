'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';


interface ThemeContextType {
  mode: 'light' | 'dark'; 
  setMode: (mode: 'light' | 'dark') => void; 
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [mode, setMode] = useState<'light' | 'dark'>('light'); 

  
  const updateTheme = (newMode: 'light' | 'dark') => {
    setMode(newMode);
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark'; 
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light'; 
    }
  };

  const handleThemeChange = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      updateTheme('dark');
    } else {
      updateTheme('light');
    }
  };

  useEffect(() => {
    handleThemeChange(); 
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

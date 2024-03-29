import React, { createContext, useContext, useState } from 'react';
import { useIsomorphicEffect } from '../src/hooks/useIsomorphicEffect';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const getPreferredColorScheme = () => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      } else {
        return 'light';
      }
    }
    return 'light';
  }

  const value = {
    darkMode,
    setDarkMode,
  };

  useIsomorphicEffect(() => {
    const darkModeFromLocalStorage = localStorage.getItem('darkMode');

    if (darkModeFromLocalStorage) {
      try {
        setDarkMode(JSON.parse(darkModeFromLocalStorage || 'false'));
      }
      catch {
        setDarkMode(false);
      }
    }
    else if (getPreferredColorScheme() === 'dark') {
      setDarkMode(true);
    }
    else {
      setDarkMode(false);
    }
  }, []);

  useIsomorphicEffect(() => {
    document.querySelector('html').classList.toggle('dark', darkMode);
    document.querySelector('html').classList.toggle('light', !darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider {...{ value }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default useTheme;

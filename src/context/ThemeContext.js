import React, { createContext, useContext, useState } from 'react';
import useQueryParams from '../hooks/useQueryParams';
import useIsomorphicLayoutEffect from '../hooks/useIsometricEffect';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const darkModeFromQueryParams = useQueryParams('dark');

  const getPreferredColorScheme = () => {
    if (window.matchMedia) {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
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

  useIsomorphicLayoutEffect(() => {
    const darkModeFromLocalStorage = localStorage.getItem('darkMode');

    if (darkModeFromQueryParams === true) {
      setDarkMode(darkModeFromQueryParams);
    }
    else if (darkModeFromLocalStorage) {
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
  }, [darkModeFromQueryParams]);

  useIsomorphicLayoutEffect(() => {
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

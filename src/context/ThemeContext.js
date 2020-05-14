import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

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

  useEffect(() => {
    const darkModeFromLocalStorage = localStorage.getItem('darkMode');
    if (darkModeFromLocalStorage) {
      setDarkMode(JSON.parse(darkModeFromLocalStorage || 'false'));
    }
    else if (getPreferredColorScheme() === 'dark') {
      setDarkMode(true);
    }
    else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
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

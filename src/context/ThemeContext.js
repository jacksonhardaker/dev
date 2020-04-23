import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const value = {
    darkMode,
    setDarkMode,
  };

  useEffect(() => {
    const modeFromStorage = JSON.parse(localStorage.getItem('darkMode') || 'false');
    setDarkMode(modeFromStorage);
  }, []);

  useEffect(() => {
    document.querySelector('html').classList.toggle('dark', darkMode);
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

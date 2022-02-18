import { useEffect, useMemo, useState } from 'react';
import SunIcon from '@fortawesome/fontawesome-free/svgs/regular/sun.svg';
import MoonIcon from '@fortawesome/fontawesome-free/svgs/regular/moon.svg';
import { VisuallyHidden } from '@components/VisuallyHidden';
import styles from './ToggleDarkModeButton.module.css';

const ToggleDarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const Icon = useMemo(() => (darkMode ? MoonIcon : SunIcon), [darkMode]);

  const handleClick = () => {
    setDarkMode((current) => !current);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <button className={styles.icon} onClick={handleClick}>
      <Icon height={16} />
      <VisuallyHidden>{`toggle ${
        darkMode ? 'light' : 'dark'
      } mode`}</VisuallyHidden>
    </button>
  );
};

export default ToggleDarkModeButton;

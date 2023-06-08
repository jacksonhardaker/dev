import SunIcon from '@fortawesome/fontawesome-free/svgs/regular/sun.svg';
import MoonIcon from '@fortawesome/fontawesome-free/svgs/regular/moon.svg';
import useTheme from '@context/ThemeContext';
import { FC } from 'react';
import { VisuallyHidden } from '@components/VisuallyHidden';
import styles from './ToggleDarkModeButton.module.css';

const ToggleDarkModeButton: FC = () => {
  const { darkMode, setDarkMode } = useTheme();
  const Icon = darkMode ? MoonIcon : SunIcon;

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button className={styles.icon} onClick={toggle}>
      <Icon height={16} />
      <VisuallyHidden>{`toggle ${
        darkMode ? 'light' : 'dark'
      } mode`}</VisuallyHidden>
    </button>
  );
};

export default ToggleDarkModeButton;

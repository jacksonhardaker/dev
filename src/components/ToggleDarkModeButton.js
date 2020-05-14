import SunIcon from '@fortawesome/fontawesome-free/svgs/regular/sun.svg';
import MoonIcon from '@fortawesome/fontawesome-free/svgs/regular/moon.svg';
import useTheme from "../context/ThemeContext";
import { black, offWhite, primaryDark, primary } from '../constants/colors';

const ToggleDarkModeButton = () => {
  const { darkMode, setDarkMode } = useTheme();
  const Icon = darkMode ? MoonIcon : SunIcon;

  const toggle = () => {
    setDarkMode(!darkMode);
  }

  return (
    <button title={`toggle ${darkMode ? 'light' : 'dark'} mode`} onClick={toggle}>
      <Icon height={16} />
      <span tabIndex={-1}>toggle {darkMode ? 'light' : 'dark'} mode</span>
      <style jsx>{`
        span {
          text-indent: 999px;
          position: absolute;
        }
        button {
          background-color: transparent;
          border: none;
          padding: 0;
          fill: ${darkMode ? offWhite : black};
          cursor: pointer;
          outline: none;
          overflow: hidden;
          position: relative;
        }
        button:hover, button:focus {

          fill: ${darkMode ? primaryDark : primary};
        }
      `}</style>
    </button>
  )
};

export default ToggleDarkModeButton;

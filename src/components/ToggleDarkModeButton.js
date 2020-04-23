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
      <style jsx>{`
        button {
          background-color: transparent;
          border: none;
          padding: 0;
          fill: ${darkMode ? offWhite : black};
          cursor: pointer;
          outline: none;
        }
        button:hover, button:focus {

          fill: ${darkMode ? primaryDark : primary};
        }
      `}</style>
    </button>
  )
};

export default ToggleDarkModeButton;

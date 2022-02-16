import { primary, black, primaryDark, offWhite } from "../constants/colors";
import useTheme from "@context/ThemeContext";

const SocialButton = ({ href, Icon, label, ...rest }) => {
  const { darkMode } = useTheme();

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} { ...rest }>
      <Icon />
      <style jsx>{`
        a {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin: 5px;
          fill: ${darkMode ? offWhite : black}
        }
        a:hover, a:focus {
          fill: ${darkMode ? primaryDark : primary};
          outline: none;
          background-color: transparent !important;
        }
      `}</style>
    </a>
  );
};

export default SocialButton;

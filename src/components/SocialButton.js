import { primary, black } from "../constants/colors";

const SocialButton = ({ href, Icon }) => {

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
      <style jsx>{`
        a {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin: 5px;
          fill: ${black}
        }
        a:hover, a:focus {
          fill: ${primary};
          outline: none;
          background-color: transparent;
        }
      `}</style>
    </a>
  );
};

export default SocialButton;

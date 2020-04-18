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
        a:hover {
          fill: ${primary}
        }
      `}</style>
    </a>
  );
};

export default SocialButton;

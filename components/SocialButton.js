import React, { useState, useEffect } from 'react';
import Base64SVG from './Base64SVG';

const SocialButton = ({ brand, href }) => {
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    import(`@fortawesome/fontawesome-free/svgs/brands/${brand}.svg`).then((module) => setSvg(module.default));
  }, []);

  if (!svg)
    return null;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Base64SVG stream={svg} />
      <style jsx>{`
        a {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin: 5px;
        }
      `}</style>
    </a>
  );
};

export default SocialButton;

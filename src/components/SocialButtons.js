import React from 'react';
import SocialButton from './SocialButton';

const SocialButtons = () => {

  return (
    <div>
      <SocialButton brand="keybase" href="https://keybase.io/jacksonhardaker" />
      <SocialButton brand="github" href="https://www.github.com/jacksonhardaker" />
      <SocialButton brand="linkedin" href="https://www.linkedin.com/in/jackson-hardaker-9b0829116/" />

      <style jsx>{`
        div {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SocialButtons;

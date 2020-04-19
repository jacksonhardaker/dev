import React from 'react';
import SocialButton from './SocialButton';
import LinkedInIcon from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg';
import KeybaseIcon from '@fortawesome/fontawesome-free/svgs/brands/keybase.svg';
import GithubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';

const SocialButtons = () => {

  return (
    <div>
      <SocialButton Icon={LinkedInIcon} brand="keybase" href="https://keybase.io/jacksonhardaker" />
      <SocialButton Icon={KeybaseIcon} brand="github" href="https://www.github.com/jacksonhardaker" />
      <SocialButton Icon={GithubIcon} brand="linkedin" href="https://www.linkedin.com/in/jackson-hardaker-9b0829116/" />

      <style jsx>{`
        div {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SocialButtons;

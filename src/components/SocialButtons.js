import React from 'react';
import SocialButton from './SocialButton';
import LinkedInIcon from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg';
import KeybaseIcon from '@fortawesome/fontawesome-free/svgs/brands/keybase.svg';
import GithubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import TwitterIcon from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg';

const SocialButtons = () => {

  return (
    <div>
      <SocialButton title="Keybase profile" Icon={KeybaseIcon} label="Jackson's keybase profile" href="https://keybase.io/jacksonhardaker" />
      <SocialButton title="GitHub Profile" Icon={GithubIcon} label="Jackson's github profile" href="https://www.github.com/jacksonhardaker" />
      <SocialButton title="LinkedIn Profile" Icon={LinkedInIcon} label="Jackson's linkedin profile" href="https://www.linkedin.com/in/jackson-hardaker-9b0829116/" />
      <SocialButton title="Twitter Profile" Icon={TwitterIcon} label="Jackson's twitter profile" href="https://twitter.com/jacksonhardaker" />

      <style jsx>{`
        div {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SocialButtons;

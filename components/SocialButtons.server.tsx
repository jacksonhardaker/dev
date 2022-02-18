import React, { VFC } from 'react';
import LinkedInIcon from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg';
import KeybaseIcon from '@fortawesome/fontawesome-free/svgs/brands/keybase.svg';
import GithubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import TwitterIcon from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg';
import { styled } from '@styles/styled';

const { classNames: cn, Styles } = styled({
  container: {
    textAlign: 'center',
  },
  link: {
    width: '24px',
    height: '24px',
    display: 'inline-block',
    margin: '5px',
    fill: 'var(--icon-color)',
    ':hover': {
      fill: 'var(--icon-color--hover)',
      outline: 'none',
      backgroundColor: 'transparent !important',
    },
    ':focus': {
      fill: 'var(--icon-color--hover)',
      outline: 'none',
      backgroundColor: 'transparent !important',
    },
  },
});

const SocialButton = ({ href, Icon, label, ...rest }) => (
  <a
    className={cn.link}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    {...rest}
  >
    <Icon />
  </a>
);

const SocialButtons: VFC = () => {
  return (
    <div className={cn.container}>
      <Styles />
      <SocialButton
        title="Keybase profile"
        Icon={KeybaseIcon}
        label="Jackson's keybase profile"
        href="https://keybase.io/jacksonhardaker"
      />
      <SocialButton
        title="GitHub Profile"
        Icon={GithubIcon}
        label="Jackson's github profile"
        href="https://www.github.com/jacksonhardaker"
      />
      <SocialButton
        title="LinkedIn Profile"
        Icon={LinkedInIcon}
        label="Jackson's linkedin profile"
        href="https://www.linkedin.com/in/jacksonhardaker/"
      />
      <SocialButton
        title="Twitter Profile"
        Icon={TwitterIcon}
        label="Jackson's twitter profile"
        href="https://twitter.com/jacksonhardaker"
      />
    </div>
  );
};

export default SocialButtons;

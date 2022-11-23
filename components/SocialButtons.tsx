import React, { ComponentType, FC, VFC } from 'react';
import LinkedInIcon from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg';
import KeybaseIcon from '@fortawesome/fontawesome-free/svgs/brands/keybase.svg';
import GithubIcon from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
import TwitterIcon from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg';
import MastodonIcon from '@fortawesome/fontawesome-free/svgs/brands/mastodon.svg';
import styles from './SocialButtons.module.css';

const SocialButton: FC<{
  href: string;
  Icon: ComponentType;
  label: string;
  rel?: string;
}> = ({ href, Icon, label, ...rest }) => {
  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...rest}
    >
      <Icon />
      <style jsx>{``}</style>
    </a>
  );
};

export const SocialButtons: VFC = () => {
  return (
    <div className={styles.container}>
      <SocialButton
        Icon={KeybaseIcon}
        label="Jackson's keybase profile"
        href="https://keybase.io/jacksonhardaker"
      />
      <SocialButton
        Icon={GithubIcon}
        label="Jackson's github profile"
        href="https://www.github.com/jacksonhardaker"
      />
      <SocialButton
        Icon={LinkedInIcon}
        label="Jackson's linkedin profile"
        href="https://www.linkedin.com/in/jacksonhardaker/"
      />
      <SocialButton
        Icon={TwitterIcon}
        label="Jackson's twitter profile"
        href="https://twitter.com/jacksonhardaker"
      />
      <SocialButton
        Icon={MastodonIcon}
        label="Jackson's Mastodon profile"
        rel="me"
        href="https://mastodon.world/@jacksonhardaker"
      ></SocialButton>
    </div>
  );
};

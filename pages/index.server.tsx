import React from 'react';
import HeadMeta from '@templates/blog/HeadMeta.client';
import SocialButtons from '@components/SocialButtons.server';
import { styled } from '@styles/styled';

const { classNames: cn, Styles } = styled({
  title: {
    margin: 0,
    width: '100%',
    paddingTop: '80px',
    lineHeight: 1.15,
    fontSize: '48px',
    display: 'block',
    textAlign: 'center',
  },
  description: {
    display: 'block',
    textAlign: 'center',
    fontSize: '18px',
  },
  link: {
    ':hover': {
      margin: '-3px -3px',
      padding: '3px 3px',
    },
    ':focus': {
      margin: '-3px -3px',
      padding: '3px 3px',
    },
  },
});

const Home = () => (
  <div>
    <Styles />
    <HeadMeta
      title="Jackson Hardaker | Frontend Engineer"
      description="Developer blog for Jackson Hardaker."
      coverSrc="/images/jackson.jpeg"
      coverAlt="Photo of Jackson Hardaker in Reykjavik"
    />
    <div>
      <h1>
        <span className={cn.title}>Jackson Hardaker</span>
        <p className={cn.description}>
          Frontend Engineer @{' '}
          <a className={cn.link} href="https://tn.com">
            tuftandneedle.com
          </a>
        </p>
      </h1>
      <SocialButtons />
    </div>
  </div>
);

export default Home;

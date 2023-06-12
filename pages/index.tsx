import React from 'react';
import { HeadMeta } from '@templates/blog/HeadMeta';
import { SocialButtons } from '@components/SocialButtons';

const Home = () => (
  <div>
    <HeadMeta
      title="Jackson Hardaker | Frontend Engineer"
      description="Developer blog for Jackson Hardaker."
      coverSrc="/images/jackson.jpeg"
      coverAlt="Photo of Jackson Hardaker in Reykjavik"
    />

    <div className="hero">
      <h1>
        <span className="title">Jackson Hardaker</span>
        <p className="description">
          Software Engineer @ <a href="https://bitdrift.io/">bitdrift.io</a>
        </p>
      </h1>

      <SocialButtons />
    </div>

    <style jsx>{`
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      a:hover,
      a:focus {
        padding: 3px 3px;
        margin: -3px -3px;
      }
      .title,
      .description {
        display: block;
        text-align: center;
      }
      .description {
        font-size: 18px;
      }
    `}</style>
  </div>
);

export default Home;

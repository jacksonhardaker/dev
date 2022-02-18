import React from 'react';
import HeadMeta from '@templates/blog/HeadMeta.client';
import SocialButtons from '@components/SocialButtons.server';
import md5 from 'md5';

const generateStyles = (
  cn = {
    title: 'title',
    link: 'link',
    description: 'description',
  }
) => `
.${cn.title} {
  margin: 0;
  width: 100%;
  padding-top: 80px;
  line-height: 1.15;
  font-size: 48px;
}
.${cn.link}:hover,
.${cn.link}:focus {
  padding: 3px 3px;
  margin: -3px -3px;
}
.${cn.title},
.${cn.description} {
  display: block;
  text-align: center;
}
.${cn.description} {
  font-size: 18px;
}
`;

const cn = {
  title: `title-${md5(generateStyles())}`,
  link: `link-${md5(generateStyles())}`,
  description: `description-${md5(generateStyles())}`,
};

const styles = generateStyles(cn);

const Home = () => (
  <div>
    <style>{styles}</style>
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

    {/* <style jsx>{`
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
    `}</style> */}
  </div>
);

export default Home;

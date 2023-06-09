import React from 'react';
// import { HeadMeta } from '@templates/blog/HeadMeta';
import { SocialButtons } from '@components/SocialButtons';

import styles from './page.module.css';

const Home = () => (
  <div className="hero">
    <h1>
      <span className={styles.title}>Jackson Hardaker</span>
      <p className={styles.description}>
        Software Engineer
        {/* Staff Frontend Engineer @ <a href="https://www.lyft.com/careers">lyft.com</a> */}
      </p>
    </h1>

    <SocialButtons />
  </div>
);

export default Home;

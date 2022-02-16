import { VFC } from 'react';
import Image from 'next/image';
import { AUTHOR } from '@constants/blog';
import styles from './Author.module.css';

export const Author: VFC<{ id: string }> = ({ id }) => {
  const { name, blurb, photo } = AUTHOR[id];
  return (
    <footer
      className={styles.footer}
      itemProp="author"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className={styles.avatarWrapper}>
        <Image className={styles.avatar} itemProp="image" src={photo} alt="" width={75} height={75} />
      </div>
      <h2 className={styles.heading} itemProp="name">
        {name}
      </h2>
      <div className={styles.blurb} itemProp="description">
        {blurb}
      </div>
    </footer>
  );
};

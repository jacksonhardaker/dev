import { MDXProvider } from '@mdx-js/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import format from 'date-fns/format';
import { CoverImage } from './CoverImage';
import { HeadMeta } from './HeadMeta';

import styles from './Post.module.css';
import { CompletelyHidden } from '../../components/CompletelyHidden';

const components = {};

export const Post = ({ children, meta }) => {
  const { pathname } = useRouter();
  return (
    <MDXProvider components={components}>
      <HeadMeta {...meta} canonical={pathname} />
      <article itemScope itemType="http://schema.org/BlogPosting">
        <header itemProp="headline">
          <h1 itemProp="name">{meta.title}</h1>
        </header>
        <time
          className={styles.time}
          dateTime={meta.published}
          itemProp="datePublished"
        >
          {format(new Date(meta.published), 'MMMM do, y')}
        </time>
        <Link href="/">{meta.author}</Link>
        <small className={styles.dateModified}>
          <time dateTime={meta.modified} itemProp="dateModified">
            Last modified: {format(new Date(meta.modified), 'MMMM do, y')}
          </time>
        </small>
        <CoverImage {...meta.cover} />
        <div itemProp="articleBody">{children}</div>
      </article>
      <CompletelyHidden>
        <a itemProp="mainEntityOfPage" href={pathname}>
          {meta.title}
        </a>
        <div
          itemProp="publisher"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="Jackson Hardaker" />
        </div>
      </CompletelyHidden>
    </MDXProvider>
  );
};

import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import { AUTHOR } from '@constants/blog';
import { CoverImage } from './CoverImage';
import { HeadMeta } from './HeadMeta';
import { CompletelyHidden } from '../../components/CompletelyHidden';
import styles from './Post.module.css';
import { Author } from './Author';

export type Meta = {
  title: string;
  description: string;
  public: boolean;
  published: string;
  modified: string;
  author: string;
  coverSrc: string;
  coverAlt: string;
  coverCaption?: string;
};

export const Post: FC<{ meta: Meta }> = ({ children, meta }) => {
  const { asPath } = useRouter();
  return (
    <>
      <HeadMeta {...meta} />
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
        <Link href="/">{AUTHOR[meta.author].name}</Link>
        <small className={styles.dateModified}>
          <time dateTime={meta.modified} itemProp="dateModified">
            Last modified: {format(new Date(meta.modified), 'MMMM do, y')}
          </time>
        </small>
        <CoverImage
          src={meta.coverSrc}
          alt={meta.coverAlt}
          caption={meta.coverCaption}
        />
        <div itemProp="articleBody">{children}</div>
      </article>
      <CompletelyHidden>
        <a itemProp="mainEntityOfPage" href={asPath}>
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
      <Author id={meta.author} />
    </>
  );
};

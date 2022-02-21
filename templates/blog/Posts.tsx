import Link from 'next/link';
import { VFC } from 'react';
import { format } from 'date-fns';

import styles from './Posts.module.css';
import { Image } from '@components/Image';

const PageLink: VFC<{ direction: 'next' | 'prev'; page: number }> = ({
  direction,
  page,
}) => {
  const variant = {
    next: { modifier: 1, label: 'Next' },
    prev: { modifier: -1, label: 'Previous' },
  };
  return (
    <div className={styles[direction]}>
      <Link passHref={true} href={`/blog/page/${page + variant[direction].modifier}`}>
        <a>{variant[direction].label} page</a>
      </Link>
    </div>
  );
};

export const Posts = ({ posts, hasNext, page }) => {
  const publicPosts = posts.filter((post) => post.meta.public);

  if (!publicPosts[0]) return <h2>No Posts</h2>;

  return (
    <section>
      <div className={styles.posts}>
        {publicPosts
          .filter((post) => post.meta.public)
          .map((post) => (
            <article className={styles.article} key={post.meta.slug}>
              <Link href={`/blog/${post.meta.slug}`}>
                <a className={styles.post}>
                  <Image
                    src={post.meta.coverSrc}
                    alt={post.meta.coverAlt}
                    width={200}
                    height={200}
                    quality={40}
                    objectFit="cover"
                  />
                  <h2 className={styles.text}>{post.meta.title}</h2>
                  <time
                    className={styles.time}
                    dateTime={post.meta.published}
                    itemProp="datePublished"
                  >
                    {format(new Date(post.meta.published), 'MMMM do, y')}
                  </time>
                </a>
              </Link>
            </article>
          ))}
      </div>
      <footer className={styles.footer}>
        {page > 1 && <PageLink direction="prev" page={page} />}
        {hasNext && <PageLink direction="next" page={page} />}
      </footer>
    </section>
  );
};

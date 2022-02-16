import Link from 'next/link';
import { format } from 'date-fns';
import { CoverImage } from '@templates/blog/CoverImage';

import styles from './Posts.module.css';

export const Posts = ({ posts, hasNext, page }) => {
  const publicPosts = posts.filter((post) => post.meta.public);

  const pageLink = (modifier) => {
    const nextVariant = modifier === 1;
    return (
      <div>
        <Link href={`/blog/page/${page + modifier}`}>
          <a>{nextVariant ? 'Next' : 'Previous'} page</a>
        </Link>
        <style jsx>{`
          div {
            margin: ${nextVariant ? '0 0 0 auto' : '0 auto 0 0'};
          }
        `}</style>
      </div>
    );
  };

  const previousLink = () => {
    return page > 1 && pageLink(-1);
  };

  const nextLink = () => {
    return hasNext && pageLink(1);
  };

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
                  <CoverImage
                    src={post.meta.coverSrc}
                    alt={post.meta.coverAlt}
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
        {previousLink()}
        {nextLink()}
      </footer>
    </section>
  );
};

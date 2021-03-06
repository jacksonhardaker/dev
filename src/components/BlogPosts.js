import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import { gray, offWhite, black, white } from '../constants/colors';
import { format } from 'date-fns';
import BlogCoverImage from './BlogCoverImage';
import useTheme from '../context/ThemeContext';

const BlogPosts = ({ posts }) => {
  const { darkMode } = useTheme();
  const publicPosts = posts.results.filter(post => post.data.public);

  const pageLink = modifier => {
    const nextVariant = modifier === 1;
    return (
      <div>
        <Link href="/blog/page/[index]" as={`/blog/page/${posts.page + modifier}`}>
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
    return posts.prev_page && pageLink(-1);
  };

  const nextLink = () => {
    return posts.next_page && pageLink(1);
  };

  if (!publicPosts[0])
    return <h2>No Posts</h2>;

  return (
    <section>
      <div className="posts">
        {publicPosts.filter(post => post.data.public).map(post => {
          const published = post.data.published_date ? new Date(post.data.published_date) : new Date(post.first_publication_date);
          return (
            <article key={post.uid}>
              <Link href="/blog/[slug]" as={`/blog/${post.uid}`}>
                <a className="post">
                  <BlogCoverImage {...post.data.cover_image} />
                  <h2>{RichText.asText(post.data.title)}</h2>
                  <time dateTime={published} itemProp="datePublished">{format(published, 'MMMM do, y')}</time>
                </a>
              </Link>
            </article>
          )
        }
        )}
      </div>
      <footer>
        {previousLink()}
        {nextLink()}
      </footer>
      <style jsx>{`
        .posts {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .post {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 0 20px 20px;
          box-sizing: border-box;
          text-decoration: none;
        }
        article {
          width: 320px;
          margin: 20px 0;
          border: 1px solid ${gray};
          box-sizing: border-box;
        }
        h2, time {
          color: ${darkMode ? offWhite : black}
        }
        .post:hover h2, .post:focus h2, .post:hover time, .post:focus time {
          color: ${darkMode ? black : white}
        }
        time {
          margin: auto 0 0;
        }
        footer {
          display: flex;
        }
      `}</style>
    </section>
  );
};

export default BlogPosts;

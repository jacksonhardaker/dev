import Link from 'next/link';
import { RichText } from 'prismic-reactjs';
import { gray } from '../constants/colors';

const BlogPosts = ({ posts }) => {
  console.log(posts);

  const previousLink = () => {
    return posts.prev_page && (
      <div>
        <Link href={`/blog/page/${posts.page - 1}`}>
          <a>Previous page</a>
        </Link>
        <style jsx>{`
          div {
            margin: 0 auto 0 0;
          }
        `}</style>
      </div>
    )
  };

  const nextLink = () => {
    return posts.next_page && (
      <div>
        <Link href={`/blog/page/${posts.page + 1}`}>
          <a>Next page</a>
        </Link>
        <style jsx>{`
          div {
            margin: 0 0 0 auto;
          }
        `}</style>
      </div>
    )
  };

  if (!posts.results)
    return null;

  return (
    <section>
      <div className="posts">
        {posts.results.map(post => (
          <article key={post.uid}>
            <Link href={`/blog/${post.uid}`}>
              <a className="post">
                <h2>{RichText.asText(post.data.title)}</h2>
              </a>
            </Link>
          </article>
        ))}
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
          width: 100%;
          height: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          text-decoration: none;
        }
        article {
          width: 320px;
          margin: 20px 0;
          border: 1px solid ${gray};
          box-sizing: border-box;
        }
        footer {
          display: flex;
        }
      `}</style>
    </section>
  );
};

export default BlogPosts;

import Head from 'next/head';
import { getPosts } from '@api/posts';
import { Posts } from '@templates/blog/Posts';

const BlogPage = ({ posts, page, hasNext }) => {
  return (
    <>
      <Head>
        <title>
          Blog page {posts.page} of {posts.total_pages} | Jackson Hardaker
        </title>
      </Head>
      <Posts posts={posts} page={page} hasNext={hasNext} />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { page } = ctx.params;
  const { posts, hasNext } = await getPosts(['meta'], Number(page) - 1);

  return {
    props: {
      posts,
      page: Number(page),
      hasNext,
    },
  };
};

export default BlogPage;

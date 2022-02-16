import BlogPosts from '../../../src/components/BlogPosts';
import Head from 'next/head';
import { getPosts } from '../../api/posts';

const BlogPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>
          Blog page {posts.page} of {posts.total_pages} | Jackson Hardaker
        </title>
      </Head>
      <BlogPosts posts={posts} />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { page } = ctx.params;
  const posts = await getPosts(['meta'], Number(page));

  return {
    props: {
      posts,
    },
  };
};

export default BlogPage;

import Page from '../../../src/components/Page'
import fetchBlogPosts from '../../../src/fetch/cms/posts';
import BlogPosts from '../../../src/components/BlogPosts';
import { BLOG_PAGE_SIZE } from '../../../src/constants/blog';
import Head from 'next/head';

const BlogPage = ({ posts }) => {
  return (
    <Page>
      <Head>
        <title>Blog page {posts.page} of {posts.total_pages} | Jackson Hardaker</title>
      </Head>
      <BlogPosts posts={posts} />
    </Page>
  );
};

export const getStaticProps = async ({ params }) => {
  const { index } = params;

  try {
    const posts = await fetchBlogPosts(BLOG_PAGE_SIZE, index);

    return {
      props: {
        posts,
        canonical: 'https://jacksonhardaker.dev/blog/',
      }
    };
  }
  catch (error) {
    console.error(error);
    return {
      props: {
        posts: null
      }
    };
  }
};

export async function getStaticPaths() {
  const meta = await fetchBlogPosts(BLOG_PAGE_SIZE);
  const validPages = Array(meta.total_pages).fill(1).map((_, index) => ({ params: { index: `${index + 1}` } }));

  return {
    paths: validPages,
    fallback: false,
  };
};

export default BlogPage;

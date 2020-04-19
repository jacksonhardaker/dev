import Page from '../../../src/components/Page'
import fetchBlogPosts from '../../../src/fetch/cms/posts';
import BlogPosts from '../../../src/components/BlogPosts';
import { BLOG_PAGE_SIZE } from '../../../src/constants/blog';

const BlogPage = ({ posts }) => {
  return (
    <Page>
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

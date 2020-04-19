import Page from '../../src/components/Page'
import fetchBlogPosts from '../../src/fetch/cms/posts';
import BlogPosts from '../../src/components/BlogPosts';
import { BLOG_PAGE_SIZE } from '../../src/constants/blog';

const BlogIndex = ({ posts }) => {
  return (
    <Page>
      <BlogPosts posts={posts} />
    </Page>
  );
};

export const getStaticProps = async () => {

  try {
    const posts = await fetchBlogPosts(BLOG_PAGE_SIZE);

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

export default BlogIndex;

import { getPosts } from '@api/posts';
import { Posts } from '@templates/blog/Posts';

const BlogPage = async ({ params }) => {
  const { number: page } = params;
  const { posts, hasNext } = await getPosts(Number(page) - 1);
  return (
    <>
      <Posts posts={posts} page={page} hasNext={hasNext} />
    </>
  );
};

export default BlogPage;

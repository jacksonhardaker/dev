import Head from 'next/head';
import { getPosts } from '@api/posts';
import { Posts } from '@templates/blog/Posts';
import { staleWhileRevalidate } from '@middleware/staleWhileRevalidate';
import { HeadMeta } from '@templates/blog/HeadMeta';

const BlogPage = ({ posts, page, hasNext, totalPages }) => {
  return (
    <>
      <HeadMeta
        title={`Blog page ${page} of ${totalPages} | Jackson Hardaker`}
        description="Read writing about from Jackson Hardaker. Frontend Engineering articles."
        coverSrc="/images/jackson.jpeg"
        coverAlt="Photo of Jackson Hardaker in Reykjavik"
      />
      <Posts posts={posts} page={page} hasNext={hasNext} />
    </>
  );
};

export const getServerSideProps = staleWhileRevalidate(async (ctx) => {
  const { page } = ctx.params;
  const { posts, hasNext, totalPages } = await getPosts(Number(page) - 1);

  return {
    props: {
      posts,
      page: Number(page),
      hasNext,
      totalPages,
    },
  };
});

export default BlogPage;

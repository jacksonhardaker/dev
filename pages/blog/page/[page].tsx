import { getPosts } from '@api/posts';
import { Posts } from '@templates/blog/Posts';
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

export const getStaticPaths = async () => {
  const { totalPages } = await getPosts();
  const paths = Array(totalPages)
    .fill(0)
    .map((_, index) => ({
      params: { page: `${index + 1}` },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
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
};

export default BlogPage;

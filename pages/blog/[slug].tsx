import { FC } from 'react';
import { promises } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Post as PostLayout, Meta } from '@templates/blog/Post';
import { MDX } from '@components/MDX';
import { getPosts } from '@api/posts';

const Post: FC<{ content: MDXRemoteSerializeResult; meta: Meta }> = ({
  content,
  meta,
}) => (
  <PostLayout meta={meta}>
    <MDX>{content}</MDX>
  </PostLayout>
);

export const getStaticPaths = async () => {
  const { posts } = await getPosts();
  const paths = posts.map(({ meta }) => ({
    params: { slug: meta.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const target = path.resolve(
    process.cwd(),
    'public/content/posts/',
    `${slug}.mdx`
  );

  try {
    const source = await promises.readFile(target, { encoding: 'utf-8' });
    const { content: raw, data: meta } = matter(source);
    const content = await serialize(raw);

    return { props: { content, meta } };
  } catch {
    return { notFound: true };
  }
};

export default Post;

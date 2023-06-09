import dynamic from 'next/dynamic';

import { promises } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Post as PostLayout, Meta } from '@templates/blog/Post';
import { MDX } from '@components/MDX';
import { getPosts } from '@api/posts';

const LazyCode = dynamic(import('@components/Code').then((mod) => mod.Code));
const LazyStackBlitz = dynamic(
  import('@components/StackBlitz').then((mod) => mod.StackBlitz)
);

const components = {
  // code: (props) => <LazyCode {...props} />,
  // StackBlitz: (props) => <LazyStackBlitz {...props} />,
};

const Post = async ({ params }) => {
  const { slug } = params;
  const target = path.resolve(
    process.cwd(),
    'public/content/posts/',
    `${slug}.mdx`
  );

  const source = await promises.readFile(target, { encoding: 'utf-8' });
  const { content: raw, data: meta } = matter(source);
  const content = await serialize(raw);
  return (
    <PostLayout meta={meta}>
      <MDX components={components}>{content}</MDX>
    </PostLayout>
  );
};

export default Post;

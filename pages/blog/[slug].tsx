import { VFC } from 'react';
import { promises } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Post as PostLayout, Meta } from '../../templates/blog/Post';

const CodeBlock = (props) => {
  // console.log({ props });
  return <code {...props}></code>;
};

const components = {
  code: CodeBlock,
};

const Post: VFC<{ content: MDXRemoteSerializeResult; meta: Meta }> = ({
  content,
  meta,
}) => {
  const { compiledSource, scope } = content;

  return (
    <PostLayout meta={meta}>
      <MDXRemote
        compiledSource={compiledSource}
        scope={scope}
        components={components}
      />
    </PostLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { slug } = ctx.params;
  const target = path.resolve(process.cwd(), 'public/content/', `${slug}.mdx`);

  const source = await promises.readFile(target, { encoding: 'utf-8' });
  const { content: raw, data: meta } = matter(source);
  const content = await serialize(raw);

  return { props: { content, meta } };
};

export default Post;
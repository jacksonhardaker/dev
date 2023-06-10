import { promises } from 'fs';
import path from 'path';
import { Post as PostLayout, Meta } from '@templates/blog/Post';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Code } from '@components/Code';
import { StackBlitz } from '@components/StackBlitz';

const components = {
  code: (props) => <Code {...props} />,
  StackBlitz: (props) => <StackBlitz {...props} />,
};

const Post = async ({ params }) => {
  const { slug } = params;
  const target = path.resolve(
    process.cwd(),
    'public/content/posts/',
    `${slug}.mdx`
  );

  const source = await promises.readFile(target, { encoding: 'utf-8' });
  const { frontmatter, compiledSource } = await serialize(source, {
    parseFrontmatter: true,
  });

  return (
    <PostLayout meta={frontmatter as Meta}>
      <MDXRemote
        components={components}
        source={source}
        options={{ parseFrontmatter: true }}
      />
    </PostLayout>
  );
};

export default Post;

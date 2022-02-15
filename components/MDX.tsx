import { VFC } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Code } from './Code';
import { StackBlitz } from './StackBlitz';

const components = {
  code: Code,
  StackBlitz,
};

export const MDX: VFC<{ children: MDXRemoteSerializeResult }> = ({
  children,
}) => {
  const { compiledSource, scope } = children;

  return (
    <MDXRemote
      compiledSource={compiledSource}
      scope={scope}
      components={components}
    />
  );
};

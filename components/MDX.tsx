import dynamic from 'next/dynamic';
import { VFC } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

const LazyCode = dynamic(import('./Code').then((mod) => mod.Code));
const LazyStackBlitz = dynamic(
  import('./StackBlitz').then((mod) => mod.StackBlitz)
);

const components = {
  code: LazyCode,
  StackBlitz: LazyStackBlitz,
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

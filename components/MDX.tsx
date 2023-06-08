import { FC } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

export const MDX: FC<{ children: MDXRemoteSerializeResult }> = ({
  children,
}) => {
  return <MDXRemote {...children} />;
};

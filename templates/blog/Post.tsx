import { MDXProvider } from '@mdx-js/react';
import { useRouter } from 'next/router';
import { CoverImage } from './CoverImage';
import { HeadMeta } from './HeadMeta';

const components = {};

export const Post = ({ children, meta }) => {
  const {pathname} = useRouter();
  return (
    <MDXProvider components={components}>
      <HeadMeta {...meta} canonical={pathname} />
      <article itemScope itemType="http://schema.org/BlogPosting">
        <header itemProp="headline">
          <h1 itemProp="name">{meta.title}</h1>
        </header>
        <CoverImage {...meta.cover} />
        <div itemProp="articleBody">{children}</div>
      </article>
    </MDXProvider>
  );
};

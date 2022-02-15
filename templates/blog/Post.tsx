import { MDXProvider } from '@mdx-js/react';
import { CoverImage } from './CoverImage';

const components = {};

export const Post = ({ children, meta }) => {
  return (
    <MDXProvider components={components}>
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

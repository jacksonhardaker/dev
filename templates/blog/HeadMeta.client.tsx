import { VFC } from 'react';
import Head from 'next/head';

export const HeadMeta: VFC<{
  title: string;
  description: string;
  coverSrc: string;
  coverAlt: string;
  published?: string;
  modified?: string;
}> = ({
  title,
  description,
  coverSrc,
  coverAlt,
  published,
  modified,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta name="description" content={description} />
      <meta itemProp="image" content={coverSrc} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jacksonhardaker" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@jacksonhardaker" />
      <meta name="twitter:image" content={coverSrc} />
      <meta name="twitter:image:alt" content={coverAlt} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={coverSrc} />
      <meta property="og:image:alt" content={coverAlt} />
      <meta property="og:description" content={description} />
      <meta
        property="og:site_name"
        content="Jackson Hardaker | Frontend Engineer"
      />

      {published && <meta property="article:published_time" content={published} />}
      {modified && <meta property="article:modified_time" content={modified} />}
    </Head>
  );
};

export default HeadMeta;

import { VFC } from 'react';
import Head from 'next/head';

type Year = `20${number}`;
type Month =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';
type Day = ``;

export const HeadMeta: VFC<{
  title: string;
  description: string;
  cover: {
    src: string;
    alt: string;
  };
  canonical: string;
  published: `${Year}-${Month}-${number}`;
  modified: `${Year}-${Month}-${number}`;
}> = ({ title, description, cover, canonical, published, modified }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={cover.src} />
      <link rel="canonical" href={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@jacksonhardaker" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@jacksonhardaker" />
      <meta name="twitter:image" content={cover.src} />
      <meta name="twitter:image:alt" content={cover.alt} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={cover.src} />
      <meta property="og:image:alt" content={cover.alt} />
      <meta property="og:description" content={description} />
      <meta
        property="og:site_name"
        content="Jackson Hardaker | Frontend Engineer"
      />

      <meta property="article:published_time" content={published} />
      <meta property="article:modified_time" content={modified} />
    </Head>
  );
};

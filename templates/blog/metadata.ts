import { Metadata } from 'next';

export const buildMetadata = ({
  title,
  description,
  coverSrc,
  coverAlt,
  published,
  modified,
}: {
  title: string;
  description: string;
  coverSrc: string;
  coverAlt: string;
  published?: string;
  modified?: string;
}) => {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      images: {
        url: coverSrc,
        alt: coverAlt,
      },
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: '@jacksonhardaker',
      creator: '@jacksonhardaker',
      images: {
        url: coverSrc,
        alt: coverAlt,
      },
    },
    other: {
      ...(published ? { 'article:published_time': published } : {}),
      ...(published ? { 'article:modified_time': modified } : {}),
    },
  };

  return metadata;
};

import { Metadata } from 'next';
import { buildMetadata } from '@templates/blog/metadata';
import { getPosts } from '@api/posts';

const description =
  'Read writing about from Jackson Hardaker. Frontend Engineering articles.';
const coverSrc = '/images/jackson.jpeg';
const coverAlt = 'Photo of Jackson Hardaker in Reykjavik';

export async function generateMetadata({ params }) {
  const { number } = params;

  const { totalPages } = await getPosts();

  const metadata: Metadata = buildMetadata({
    title: `Blog page ${number} of ${totalPages} | Jackson Hardaker`,
    description,
    coverSrc,
    coverAlt,
  });

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

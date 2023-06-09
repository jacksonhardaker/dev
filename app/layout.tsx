import { Metadata } from 'next';
import { buildMetadata } from '@templates/blog/metadata';

const title = 'Jackson Hardaker | Frontend Engineer';
const description = 'Developer blog for Jackson Hardaker.';
const coverSrc = '/images/jackson.jpeg';
const coverAlt = 'Photo of Jackson Hardaker in Reykjavik';

export const metadata: Metadata = buildMetadata({
  title,
  description,
  coverSrc,
  coverAlt,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

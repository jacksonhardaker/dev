import { Metadata } from 'next';
import { buildMetadata } from '@templates/blog/metadata';

import 'normalize.css/normalize.css';
import '@styles/colors.css';
import '@styles/loading.css';
import '@styles/base.css';
import { GlobalIntersectionObserverProvider } from '@context/GlobalIntersectionObserver';
import { ThemeProvider } from '@context/ThemeContext';

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
      <body>
        <GlobalIntersectionObserverProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </GlobalIntersectionObserverProvider>
      </body>
    </html>
  );
}

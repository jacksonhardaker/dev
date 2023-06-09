import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { GlobalIntersectionObserverProvider } from '@context/GlobalIntersectionObserver';
import { ThemeProvider } from '@context/ThemeContext';
import { GoogleAnalyticsProvider } from '@context/GoogleAnalyticsContext';
import { Navigation } from '@components/Navigation';
import '@config/loading';
import 'normalize.css/normalize.css';
import '@styles/colors.css';
import '@styles/loading.css';
import '@styles/base.css';
import { MDXProvider } from '@mdx-js/react';

const LazyCode = dynamic(import('@components/Code').then((mod) => mod.Code));
const LazyStackBlitz = dynamic(
  import('@components/StackBlitz').then((mod) => mod.StackBlitz)
);

const components = {
  code: LazyCode,
  StackBlitz: LazyStackBlitz,
};

const MainApp = ({ Component, pageProps }) => {
  const { pathname: canonical } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
      </Head>
      <GlobalIntersectionObserverProvider>
        <ThemeProvider>
          <GoogleAnalyticsProvider>
            <MDXProvider components={components}>
              <main>
                <Navigation />
                <Component {...pageProps} />
                <Analytics />
              </main>
            </MDXProvider>
          </GoogleAnalyticsProvider>
        </ThemeProvider>
      </GlobalIntersectionObserverProvider>
    </>
  );
};

export default MainApp;

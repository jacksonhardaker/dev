import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@context/ThemeContext';
import { GoogleAnalyticsProvider } from '@context/GoogleAnalyticsContext';
import { Navigation } from '@components/Navigation';

import '../src/loading.config';
import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';
import { GlobalIntersectionObserverProvider } from '@context/GlobalIntersectionObserver';

const MainApp = ({ Component, pageProps }) => {
  const { asPath: canonical } = useRouter();
  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
      </Head>
      <GlobalIntersectionObserverProvider>
        <ThemeProvider>
          <GoogleAnalyticsProvider>
            <main>
              <Navigation />
              <Component {...pageProps} />
            </main>
          </GoogleAnalyticsProvider>
        </ThemeProvider>
      </GlobalIntersectionObserverProvider>
    </>
  );
};

export default MainApp;

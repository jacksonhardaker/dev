import Head from 'next/head';
import { GoogleAnalyticsProvider } from '@context/GoogleAnalyticsContext';
import Nav from '../src/components/Navigation.server';

import '../src/loading.config';
import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';

const App = ({ Component, pageProps }) => {
  // const { asPath: canonical } = useRouter();
  const canonical = pageProps?.router?.asPath;
  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
      </Head>
      <GoogleAnalyticsProvider>
        <main>
          {/* <Nav /> */}
          <Component {...pageProps} />
        </main>
      </GoogleAnalyticsProvider>
    </>
  );
};

export default App;

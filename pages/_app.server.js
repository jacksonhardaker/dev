// import Head from 'next/head';
import { GoogleAnalyticsProvider } from '@context/GoogleAnalyticsContext';
import Navigation from '@components/Navigation.server';

import 'normalize.css/normalize.css';

const App = ({ children }) => {
  // const canonical = pageProps?.router?.asPath;
  return (
    <>
      {/* <Head>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
      </Head> */}
      {/* <GoogleAnalyticsProvider> */}
      <main>
        <Navigation />
        {children}
      </main>
      {/* </GoogleAnalyticsProvider> */}
    </>
  );
};

export default App;

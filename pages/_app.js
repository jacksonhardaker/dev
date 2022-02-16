import '../src/loading.config';
import { ThemeProvider } from '@context/ThemeContext';
import { GoogleAnalyticsProvider } from '@context/GoogleAnalyticsContext';
import Nav from '../src/components/Navigation';

import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';

const MainApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <GoogleAnalyticsProvider>
          <main>
            <Nav />
            <Component {...pageProps} />
          </main>
        </GoogleAnalyticsProvider>
      </ThemeProvider>
    </>
  );
};

export default MainApp;

import '../src/loading.config';

import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';
import { ThemeProvider } from '../src/context/ThemeContext';
import { GoogleAnalyticsProvider } from '../src/context/GoogleAnalyticsContext';

const MainApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <GoogleAnalyticsProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </GoogleAnalyticsProvider>
      </ThemeProvider>
    </>
  );
};

export default MainApp;

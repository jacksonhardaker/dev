import App from 'next/app';
import '../src/loading.config';

import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';
import { ThemeProvider } from '../src/context/ThemeContext';

const MainApp = ({ Component, pageProps }) => {

  return (
    <>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  );
};

MainApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps
  };
}

export default MainApp;

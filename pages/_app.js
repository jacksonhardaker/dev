import App from 'next/app';
import '../src/loading.config';

import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';

const MainApp = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
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

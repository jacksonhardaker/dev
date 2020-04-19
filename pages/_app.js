import App from 'next/app';
import PrismicPreviewScript from '../src/components/PrismicPreviewScript';
import '../src/loading.config';

import 'normalize.css/normalize.css';
import '../src/styles/fonts.scss';
import '../src/styles/base.scss';

const MainApp = ({ Component, pageProps, preview }) => {
  return (
    <>
      <Component {...pageProps} />
      <PrismicPreviewScript {...{ preview }} />
    </>
  );
};

MainApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const { query } = appContext.ctx;

  return {
    ...appProps,
    preview: !!query.preview
  };
}

export default MainApp;

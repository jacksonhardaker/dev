// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { black, primary } from '../constants/colors';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />


          <style jsx global>{`
            @font-face {
              font-family: 'Inter';
              font-style:  normal;
              font-weight: 100;
              font-display: swap;
              src: url("/fonts/Inter-Thin-BETA.woff2?v=3.11") format("woff2"),
                  url("/fonts/Inter-Thin-BETA.woff?v=3.11") format("woff");
            }

            body {
              margin: 0;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
                Helvetica, sans-serif;
              color: ${black};
            }

            a {
              color: ${primary};
            }

            a:hover {
              color: ${black};
            }
          `}</style>
        </body>
      </Html>
    )
  }
}

export default MyDocument

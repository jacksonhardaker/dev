import React from 'react';
import { black, primary } from '../constants/colors';

const GlobalStyles = () => {
  return (
    <>
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
    </>
  )
}

export default GlobalStyles;

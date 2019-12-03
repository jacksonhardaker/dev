import React from 'react';

const GlobalStyles = () => {
  return (
    <>
      <style jsx>{`
        @font-face {
          font-family: 'Inter';
          font-style:  normal;
          font-weight: 100;
          font-display: swap;
          src: url("/fonts/Inter-Thin-BETA.woff2?v=3.11") format("woff2"),
              url("/fonts/Inter-Thin-BETA.woff?v=3.11") format("woff");
        }
        :global(body) {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export default GlobalStyles;

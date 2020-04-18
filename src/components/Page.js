import React from 'react';
import Head from 'next/head';
import { primary, black } from '../constants/colors';
import PrismicPreviewScript from './PrismicPreviewScript';
import ClearPreviewMode from './ClearPreviewMode';

const Page = ({ children, canonical, preview }) => {
  return (
    <main>
      <PrismicPreviewScript {...{ preview }} />
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="canonical" href={canonical}></link>
        {process.env.META_ROBOTS && <meta name="robots" content={process.env.META_ROBOTS}></meta>}
      </Head>
      {children}
      {preview && <ClearPreviewMode />}
      <style jsx global>{`
      @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: 100;
        font-display: swap;
        src: url("/fonts/Inter-Thin-BETA.woff2?v=3.11") format("woff2"),
            url("/fonts/Inter-Thin-BETA.woff?v=3.11") format("woff");
      }
      @font-face {
        font-family: 'InterRegular';
        font-style:  normal;
        font-weight: 400;
        font-display: swap;
        src: url("/fonts/Inter-Light-BETA.woff2?v=3.11") format("woff2"),
            url("/fonts/Inter-Light-BETA.woff?v=3.11") format("woff");
      }

      main {
        max-width: 680px;
        margin: 0 auto;
        padding: 20px;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
      }

      body {
        margin: 0;
        font-family: 'InterRegular', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
        line-height: 1.4;
        color: ${black};
      }

      a {
        color: ${primary};
      }

      a:hover {
        color: ${black};
      }
    `}</style>
    </main>
  )
};

export default Page;

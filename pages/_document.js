import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
        {process.env.META_ROBOTS && <meta name="robots" content={process.env.META_ROBOTS}></meta>}

        <link rel="preload" href="/styles/fonts.css" as="style"></link>
        <link rel="preload" href="/styles/base.css" as="style"></link>
        <link rel="preload" href="/styles/colors.css" as="style"></link>

        <link rel="stylesheet" href="/styles/fonts.css"></link>
        <link rel="stylesheet" href="/styles/base.css"></link>
        <link rel="stylesheet" href="/styles/colors.css"></link>
        <link rel="stylesheet" href="/styles/loading.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;

import React from 'react';
import Head from 'next/head';
import { primary, black } from '../constants/colors';
import PrismicPreviewScript from './PrismicPreviewScript';
import ClearPreviewMode from './ClearPreviewMode';
import Nav from './Navigation';

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
      <Nav />
      {children}
      {preview && <ClearPreviewMode />}
    </main>
  )
};

export default Page;

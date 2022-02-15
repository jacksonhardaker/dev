import React from 'react';
import Head from 'next/head';
import PrismicPreviewScript from './PrismicPreviewScript';
import ClearPreviewMode from './ClearPreviewMode';
import Nav from './Navigation';

const Page = ({ children, canonical, preview }) => {
  return (
    <>
      <PrismicPreviewScript preview={preview} />
      <Head>
        <link rel="canonical" href={canonical}></link>
      </Head>
      {children}
      {preview && <ClearPreviewMode />}
    </>
  )
};

export default Page;

import React from 'react';
import Head from 'next/head';

const Page = ({ children, canonical, preview }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={canonical}></link>
      </Head>
      {children}
    </>
  )
};

export default Page;

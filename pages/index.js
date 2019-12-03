import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import SocialButtons from '../components/SocialButtons'
import Page from '../components/Page'

const Home = () => (
  <Page>
    <div>
      <Head>
        <title>Jackson Hardaker | Frontend Engineer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Jackson Hardaker</h1>
        <p className="description">
          Frontend Engineer @ <a href='https://tn.com'>tuftandneedle.com</a>
        </p>

        <SocialButtons />
      </div>

      <style jsx>{`
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </div>
  </Page>
)

export default Home

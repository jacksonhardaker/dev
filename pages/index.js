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
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  </Page>
)

export default Home

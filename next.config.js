require('dotenv').config();

const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');

module.exports = withPlugins([
  withCss,
  [withSass, {
    cssModules: false,
  }],
], {
  env: {
    PRISMIC_TOKEN: 'MC5YajhldWhNQUFDQUFtTDBi.MFw677-977-977-977-9YG_vv70X77-977-9C--_vXEiV--_ve-_ve-_vVbvv70PJzJa77-977-977-9RDE',
    PRISMIC_ENDPOINT: 'https://jackson-hardaker-dev.cdn.prismic.io/api/v2',
    META_ROBOTS: process.env.META_ROBOTS,
    PREVIEW_MODE_SECRET: process.env.PREVIEW_MODE_SECRET,
    ENABLE_GOOGLE_ANALYTICS: process.env.ENABLE_GOOGLE_ANALYTICS,
  },

});

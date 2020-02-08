const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
module.exports = withImages(
  withCSS({
    env: {
      PRISMIC_TOKEN: 'MC5YajhldWhNQUFDQUFtTDBi.MFw677-977-977-977-9YG_vv70X77-977-9C--_vXEiV--_ve-_ve-_vVbvv70PJzJa77-977-977-9RDE',
      PRISMIC_ENDPOINT: 'https://jackson-hardaker-dev.cdn.prismic.io/api/v2',
    }
  })
);

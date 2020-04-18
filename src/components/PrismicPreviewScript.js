import Head from 'next/head';

const PrismicPreviewScript = ({ preview }) => {
  return preview ? <Head><script async defer src="https://static.cdn.prismic.io/prismic.min.js?repo=jackson-hardaker-dev&new=true"></script></Head> : null;
};

export default PrismicPreviewScript;

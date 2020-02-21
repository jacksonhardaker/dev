const PrismicPreviewScript = ({ preview }) => {
  return preview ? <script async defer src="//static.cdn.prismic.io/prismic.js?repo=jackson-hardaker-dev&new=true"></script> : null;
};

export default PrismicPreviewScript;

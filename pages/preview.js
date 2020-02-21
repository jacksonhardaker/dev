import React, { useEffect } from 'react';
import { parse } from 'url';
import qs from 'qs';
import Prismic from 'prismic-javascript';
import useLinkResolver from '../src/hooks/useLinkResolver';

const apiEndpoint = 'https://jackson-hardaker-dev.prismic.io/api/v2';

const PreviewPage = ({ query }) => {

  useEffect(() => {
    (async () => {
      const api = await Prismic.getApi(apiEndpoint);
      const params = qs.parse(query);
      const url = await api.previewSession(params.token, useLinkResolver, '/');

      if (window) window.location = `${url}?preview=true`;
    })();
  }, []);

  return <p>Loading preview...</p>;
};

PreviewPage.getInitialProps = async ({ req }) => {
  const { query } = parse(req.url);

  return {
    query
  };
}

export default PreviewPage;

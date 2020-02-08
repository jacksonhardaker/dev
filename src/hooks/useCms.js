import Prismic from 'prismic-javascript';

const useCms = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_TOKEN,
    req,
  });
};

export default useCms;

import Prismic from 'prismic-javascript';
import Cookies from 'cookies';
import useLinkResolver from "../../src/hooks/useLinkResolver";

export default async (req, res) => {
  const { secret, token } = req.query;
  if (secret !== process.env.PREVIEW_MODE_SECRET || !token) {
    return res.status(401).send('Invalid token');
  }

  const api = await Prismic.getApi(process.env.PRISMIC_ENDPOINT);

  // Enable Preview Mode by setting the cookies
  const cookies = new Cookies(req, res);
  const previewRef = cookies.get(Prismic.previewCookie);
  const masterRef = api.refs.find(ref => { return ref.isMasterRef === true; });
  const ref = previewRef || masterRef.ref;
  res.setPreviewData({ ref });

  const Location = await api.previewSession(token, useLinkResolver, '/');

  res.writeHead(307, { Location });
  res.end();
}

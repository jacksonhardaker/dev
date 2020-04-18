import Prismic from 'prismic-javascript';
import useLinkResolver from "../../src/hooks/useLinkResolver";

export default async (req, res) => {
  const { secret, token, clear } = req.query;

  if (clear) {
    res.clearPreviewData();
    res.writeHead(307, { Location: '/' });
  }
  else {
    if (secret !== 'MY_SECRET_TOKEN' || !token) {
      return res.status(401).send('Invalid token');
    }
  
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});
  
    const api = await Prismic.getApi(process.env.PRISMIC_ENDPOINT);
    const url = await api.previewSession(token, useLinkResolver, '/');
  
    res.writeHead(307, { Location: `${url}?preview=true` });
  }

  res.end();
}

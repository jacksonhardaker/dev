import Prismic from 'prismic-javascript';
import useLinkResolver from "../../src/hooks/useLinkResolver";

export default async (req, res) => {
  const { secret, token } = req.query;
  if (secret !== process.env.PREVIEW_MODE_SECRET || !token) {
    return res.status(401).send('Invalid token');
  }

  const api = await Prismic.getApi(process.env.PRISMIC_ENDPOINT);

  res.setPreviewData({ token });

  const Location = await api.previewSession(token, useLinkResolver, '/');

  res.writeHead(307, { Location });
  res.end();
}

export default async (req, res) => {
  const { redirect } = req.query;

  res.clearPreviewData();
  res.writeHead(307, { Location: redirect || '/' });
  res.end();
};

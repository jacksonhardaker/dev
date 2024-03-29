import { promises } from 'fs';
import path from 'path';
import { getPosts } from '@api/posts';

export default () => null;

const postSitemapBlock = (post) => {
  return `<url>
    <loc>https://jacksonhardaker.dev/blog/${post.meta.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${new Date(post.meta.published).toISOString()}</lastmod>
  </url>`;
};

const blogIndexPageBlocks = (totalPages) => {
  return Array(totalPages)
    .fill(0)
    .map((_, index) => {
      return `<url>
      <loc>https://jacksonhardaker.dev/blog/page/${index + 1}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>`;
    });
};

export const getStaticProps = async () => {
  const data = await getPosts();

  const indexPages = blogIndexPageBlocks(data.totalPages);
  const posts = data.posts.map(postSitemapBlock);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://jacksonhardaker.dev/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
    ${posts.join('')}
    ${indexPages}
  </urlset>
  `;
  promises.writeFile(
    path.resolve(process.cwd(), 'public/sitemap.xml'),
    sitemap
  );

  return { notFound: true };
};

import fetchBlogPosts from "../src/fetch/cms/posts";
import { BLOG_PAGE_SIZE } from "../src/constants/blog";

const Sitemap = () => null;

const postSitemapBlock = post => {
  return `<url>
    <loc>https://jacksonhardaker.dev/blog/${post.uid}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${new Date(post.last_publication_date).toISOString()}</lastmod>
  </url>`;
};

const blogIndexPageBlocks = meta => {
  return Array(meta.total_pages).fill(0).map((_, index) => {
    return `<url>
      <loc>https://jacksonhardaker.dev/blog/page/${index + 1}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>`;
  });
};

Sitemap.getInitialProps = async ({ res }) => {
  let meta = await fetchBlogPosts(BLOG_PAGE_SIZE);
  const indexPages = blogIndexPageBlocks(meta);
  const posts = meta.results.map(postSitemapBlock);

  while (meta.next_page) {
    meta = await fetch(meta.next_page).then(res => res.json());
    posts.push(...meta.results.map(postSitemapBlock));
  }

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
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
};

export default Sitemap;

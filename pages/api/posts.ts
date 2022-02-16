import path from 'path';
import matter from 'gray-matter';
import { promises } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BLOG_PAGE_SIZE } from '@constants/blog';

type Data = {
  meta: {
    slug: string;
    published: string;
  };
}[];

export const getPosts = async (page: number) => {
  const data: Data = await Promise.all(
    await promises
      .readdir(path.resolve(process.cwd(), 'public/content/posts/'))
      .then((files) =>
        files.map(async (file) => {
          const slug = file.replace('.mdx', '');
          const filePath = path.resolve(
            process.cwd(),
            'public/content/posts/',
            file
          );

          const source = await promises.readFile(filePath, {
            encoding: 'utf-8',
          });
          const { data: meta } = matter(source) as unknown as { data: Data[number]['meta']};
          return { meta: { ...meta, slug } };
        })
      )
  );

  data.sort((a, b) => {
    return new Date(a.meta.published) > new Date(b.meta.published) ? -1 : 1;
  });

  const paginatedData = data.slice(
    page * BLOG_PAGE_SIZE,
    page * BLOG_PAGE_SIZE + BLOG_PAGE_SIZE
  );

  const hasNext = data.slice(page * BLOG_PAGE_SIZE + BLOG_PAGE_SIZE).length > 0;

  return {
    posts: paginatedData,
    hasNext,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;

  const pageNumber = page ? Number(page) - 1 : 0;
  const data = await getPosts(pageNumber);

  res.status(200).json(data);
};

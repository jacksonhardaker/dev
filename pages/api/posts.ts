import path from 'path';
import matter from 'gray-matter';
import { promises } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BLOG_PAGE_SIZE } from '@constants/blog';

export const getPosts = async (picks: string[], page: number) => {
  const files = await promises
    .readdir(path.resolve(process.cwd(), 'public/content/posts/'))
    .then((files) =>
      files.map((file) =>
        path.resolve(process.cwd(), 'public/content/posts/', file)
      )
    );

  const data = await Promise.all(
    files.map(async (file) => {
      const source = await promises.readFile(file, { encoding: 'utf-8' });
      const { content, data: meta } = matter(source);
      const all = { content, meta };

      if (picks.length > 0) {
        return picks.reduce(
          (data, pick) => ({
            ...data,
            [pick]: all[pick],
          }),
          {}
        );
      } else {
        return all;
      }
    })
  );

  const paginatedData = data.slice(
    page * BLOG_PAGE_SIZE,
    page * BLOG_PAGE_SIZE + BLOG_PAGE_SIZE
  );

  return paginatedData;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { pick = [], page } = req.query;

  const pageNumber = page ? Number(page) - 1 : 0;
  const data = await getPosts(Array.isArray(pick) ? pick : [pick], pageNumber);

  res.status(200).json(data);
};

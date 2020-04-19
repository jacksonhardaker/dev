import fetch from 'node-fetch';
import Head from 'next/head';
import Error from 'next/error'
import { RichText } from 'prismic-reactjs';
import format from 'date-fns/format';
import Page from '../../src/components/Page';
import Code from '../../src/components/Code';
import BlogCoverImage from '../../src/components/BlogCoverImage';
import Author from '../../src/components/Author';
import fetchBlogPost from '../../src/fetch/cms/post';
import { useState, useEffect } from 'react';
import fetchBlogPosts from '../../src/fetch/cms/posts';

const Post = ({ post, canonical, preview, slug, previewRef }) => {
  const [currentPost, setCurrentPost] = useState(post);

  if (!post || !post.data.public)
    return <Error statusCode={404} />;

  const { data } = currentPost;
  const author = data.author.data;
  const published = data.published_date ? new Date(data.published_date) : new Date(currentPost.first_publication_date);
  const modified = new Date(currentPost.last_publication_date);

  useEffect(() => {
    if (preview) {
      (async () => {
        const post = await fetchBlogPost(slug, previewRef);
        setCurrentPost(post);
      })();
    }
  }, [preview]);

  return (
    <Page {...{ canonical }} preview={preview}>
      <Head>
        <title>{RichText.asText(data.title)} | Jackson Hardaker</title>
      </Head>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <header itemProp="headline">
          <h1 itemProp="name">{RichText.asText(data.title)}</h1>
        </header>
        <time dateTime={published} itemProp="datePublished">{format(published, 'MMMM do, y')}</time>
        <a href="/" title={RichText.asText(author.name)}>
          <span>{RichText.asText(author.name)}</span>
        </a>
        <BlogCoverImage {...data.cover_image} richTextCaption={data.cover_image_caption} />
        <div itemProp="articleBody">
          {
            data.body.map((slice, index) => {
              switch (slice.slice_type) {
                case 'text':
                  return <RichText key={index} render={slice.primary.text} />;
                case 'code':
                  return <Code key={index} language={slice.primary.syntax_highlighting} content={slice.primary.code_block} />
              }
            })
          }
        </div>
        <Author {...author} />
        <div className="hidden">
          <a itemProp="mainEntityOfPage" href={canonical}>{RichText.asText(data.title)}</a>
          <meta itemProp="dateModified" content={modified} />
          <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="Jackson Hardaker" />
          </div>
        </div>
      </article>
      <style jsx>{`
        time::after {
          content: '-';
          display: inline-block;
          margin: 0 1ch;
        }
        .hidden {
          visibility: hidden;
          height: 0;
          overflow: hidden;
        }
      `}</style>
    </Page>
  );
};

export const getStaticProps = async ({ params, preview, previewData = {} }) => {
  const { slug } = params;

  try {
    const post = await fetchBlogPost(slug, previewData.ref);

    return {
      props: {
        post,
        canonical: `https://jacksonhardaker.dev/blog/${slug}`,
        preview: preview || null,
        slug,
        previewRef: previewData.ref || null,
      }
    };
  }
  catch (error) {
    console.error(error);
    return {
      props: {
        post: null
      }
    };
  }
};

export async function getStaticPaths() {
  let meta = await fetchBlogPosts();
  const validSlugs = meta.results.map(doc => doc.uid);

  while (meta.next_page) {
    meta = await fetch(meta.next_page).then(res => res.json());
    validSlugs.push(...meta.results.map(doc => doc.uid));
  }

  return {
    paths: validSlugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export default Post;

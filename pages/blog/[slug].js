import fetch from 'node-fetch';
import Head from 'next/head';
import Error from 'next/error'
import Prismic from 'prismic-javascript';
import Cookies from 'js-cookie';
import { RichText } from 'prismic-reactjs';
import format from 'date-fns/format';
import Page from '../../src/components/Page';
import BlogCoverImage from '../../src/components/BlogCoverImage';
import Author from '../../src/components/Author';
import fetchBlogPost from '../../src/fetch/cms/post';
import { useState, useEffect } from 'react';
import fetchBlogPosts from '../../src/fetch/cms/posts';
import blogPostHtmlSerializer from '../../src/htmlSerializers/blogPost';
import PrismicPreviewScript from '../../src/components/PrismicPreviewScript';
import useTheme from '../../src/context/ThemeContext';
import calculateReadingTime from '../../src/utils/calculateReadingTime';

const Post = ({ post, canonical, preview, slug }) => {
  const { darkMode } = useTheme();
  const [currentPost, setCurrentPost] = useState(post);

  useEffect(() => {
    if (preview) {
      (async () => {
        const prismicPreviewRef = Cookies.get(Prismic.previewCookie);
        const post = await fetchBlogPost(slug, prismicPreviewRef);
        setCurrentPost(post);
      })();
    }
  }, [preview]);

  if (!post?.data?.public && !preview)
    return (<>
      <PrismicPreviewScript preview={preview} />
      <Error statusCode={404} />
    </>);

  if (!currentPost)
    return <Page {...{ canonical }} preview={preview}></Page>;

  const { data } = currentPost;
  const author = data.author.data;
  const title = RichText.asText(data.title);
  const description = `${RichText.asText(data.content).substr(0, 197)}...`;
  const published = data.published_date ? new Date(data.published_date) : new Date(currentPost.first_publication_date);
  const modified = new Date(currentPost.last_publication_date);
  const readingTime = calculateReadingTime(RichText.asText(data.content));

  return (
    <Page {...{ canonical }} preview={preview}>
      <Head>
        <title>{RichText.asText(data.title)} | Jackson Hardaker</title>
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={data.cover_image.url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jacksonhardaker" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@jacksonhardaker" />
        <meta name="twitter:image:src" content={data.cover_image.url} />
        <meta name="twitter:label1" value="Reading time"/>
        <meta name="twitter:data1" value={readingTime}/>

        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={data.cover_image.url} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Jackson Hardaker | Frontend Engineer" />

        <meta property="article:published_time" content={published} />
        <meta property="article:modified_time" content={modified} />
      </Head>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <header itemProp="headline">
          <h1 itemProp="name">{title}</h1>
        </header>
        <time dateTime={published} itemProp="datePublished">{format(published, 'MMMM do, y')}</time>
        <a href="/" title={RichText.asText(author.name)}>
          <span>{RichText.asText(author.name)}</span>
        </a>
        <span className="reading-time">{readingTime}</span>
        <small className="date-modified">
          <time dateTime={modified} itemProp="dateModified">Last modified: {format(modified, 'MMMM do, y')}</time>
        </small>
        <BlogCoverImage {...data.cover_image} richTextCaption={data.cover_image_caption} />
        <div itemProp="articleBody">
          {data.content && <RichText render={data.content} htmlSerializer={blogPostHtmlSerializer(darkMode)} />}
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
        time::after, .reading-time::before {
          content: '·';
          display: inline-block;
          margin: 0 1ch;
        }
        .date-modified {
          display: block;
          font-style: italic;
          margin: 0.5rem 0;
        }
        .date-modified::before {
          content: '(';
        }
        .date-modified::after {
          content: ')';
        }
        .date-modified time::after {
          content: none;
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

export const getStaticProps = async ({ params, preview }) => {
  const { slug } = params;

  try {
    const post = await fetchBlogPost(slug);

    return {
      props: {
        post: post || null,
        canonical: `https://jacksonhardaker.dev/blog/${slug}`,
        preview: preview || null,
        slug,
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

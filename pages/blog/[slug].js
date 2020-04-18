import { Predicates } from 'prismic-javascript';
import fetch from 'node-fetch';
import Head from 'next/head';
import Error from 'next/error'
import { RichText } from 'prismic-reactjs';
import format from 'date-fns/format';
import useCms from '../../src/hooks/useCms';
import Page from '../../src/components/Page';
import Code from '../../src/components/Code';
import BlogCoverImage from '../../src/components/BlogCoverImage';
import Author from '../../src/components/Author';

const Post = ({ post, canonical }) => {
  if (!post)
    return <Error statusCode={404} />;

  const { data } = post;
  const author = data.author.data;
  const published = new Date(post.first_publication_date);
  const modified = new Date(post.last_publication_date);

  return (
    <Page {...{ canonical }}>
      <Head>
        <title>{RichText.asText(data.title)}</title>
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
        <Author { ...author } />
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

export const getStaticProps = async ({ params }) => {
  const cms = await useCms();
  const { slug } = params;

  try {
    const meta = await cms.query(Predicates.at('my.blog_post.uid', slug), {
      fetchLinks: [
        'author.name',
        'author.portrait',
        'author.about'
      ]
    });
    const [post] = meta.results;

    return {
      props: {
        post,
        canonical: `https://jacksonhardaker.dev/blog/${slug}`
      }
    };
  }
  catch (error) {
    console.error(error);
    return { props: {} };
  }
};

export async function getStaticPaths() {
  const cms = await useCms();

  let meta = await cms.query(Predicates.at('document.type', 'blog_post'), { pageSize: 1 });
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

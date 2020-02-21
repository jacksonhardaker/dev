import { Predicates } from 'prismic-javascript';
import Head from 'next/head';
import Error from 'next/error'
import { RichText } from 'prismic-reactjs';
import format from 'date-fns/format';
import useCms from '../../src/hooks/useCms';
import Page from '../../src/components/Page';
import Code from '../../src/components/Code';
import BlogCoverImage from '../../src/components/BlogCoverImage';

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
        <a href="#" title={RichText.asText(author.name)} itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">{RichText.asText(author.name)}</span>
        </a>
        <BlogCoverImage { ...post.data.cover_image } />
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
        <div className="hidden">
          <a itemProp="mainEntityOfPage" href={canonical}>{RichText.asText(data.title)}</a>
          <meta itemProp="dateModified" content={modified} />
          <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
            {/* <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
              <img src="//www.shomtek.com/wp-content/uploads/2014/01/logo.png" alt="SHOMTek" />
              <meta itemProp="url" content="http://www.shomtek.com/wp-content/uploads/2014/01/logo.png" />
              <meta itemProp="width" content="292" />
              <meta itemProp="height" content="85" />
            </div> */}
            <meta itemProp="name" content="Jackson Hardaker" />
          </div>
        </div>
      </article>
      <style jsx>{`
        .hidden {
          visibility: hidden;
          height: 0;
          overflow: hidden;
        }
      `}</style>
    </Page>
  );
}

Post.getInitialProps = async ({ query, req }) => {
  const { slug } = query;
  const host = req.headers.host;
  const path = req.url;
  const cms = await useCms(req);

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
      post,
      canonical: host + path
    };
  }
  catch {
    return { };
  }
};

export default Post;

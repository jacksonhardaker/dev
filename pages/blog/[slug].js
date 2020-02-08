import { Predicates } from 'prismic-javascript';
import useCms from '../../src/hooks/useCms';
import Page from '../../src/components/Page';
import { RichText } from 'prismic-reactjs';
import PrismicDOM from 'prismic-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs/';
import he from 'he';

const codeSerializer = (type, _, __, children) => {
  const Elements = PrismicDOM.RichText.Elements;
  switch (type) {
    case Elements.paragraph:
      return `${he.decode(children.join(''))}\n`;
    default:
      return null;
  }
}

const Post = ({ post }) => {
  console.log(post);
  if (!post)
    return null;

  const { data } = post;

  return (
    <Page>
      <RichText render={data.title} />
      {
        data.body.map((slice, index) => {
          switch(slice.slice_type) {
            case 'text':
              return <RichText key={index} render={slice.primary.text} />;
            case 'code':
              return (
              <SyntaxHighlighter key={index} language={slice.primary.syntax_highlighting} style={docco}>
                {PrismicDOM.RichText.asHtml(slice.primary.code_block, {}, codeSerializer)}
              </SyntaxHighlighter>);
          }
        })
      }
    </Page>
  );
}

Post.getInitialProps = async ({ query, req }) => {
  const { slug } = query;
  const cms = await useCms(req);

  const meta = await cms.query(Predicates.at('my.blog_post.uid', slug));
  const [post] = meta.results;

  return {
    post,
  };
};

export default Post;

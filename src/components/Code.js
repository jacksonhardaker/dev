import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs/';
import PrismicDOM from 'prismic-dom';
import he from 'he';

const codeSerializer = (type, _, __, children) => {
  const Elements = PrismicDOM.RichText.Elements;
  switch (type) {
    case Elements.paragraph:
      return `${he.decode(children.join(''))}\n`;
    default:
      return null;
  }
};

const Code = ({ language, content }) => {
  return (
    <SyntaxHighlighter language={language} style={docco}>
      {PrismicDOM.RichText.asHtml(content, {}, codeSerializer)}
    </SyntaxHighlighter>);
};

export default Code;

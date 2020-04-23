import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs/';
import PrismicDOM from 'prismic-dom';
import codeHtmlSerializer from "../htmlSerializers/code";

const Code = ({ language, content }) => {
  return (
    <SyntaxHighlighter language={language} style={docco}>
      {PrismicDOM.RichText.asText(content, {}, codeHtmlSerializer)}
    </SyntaxHighlighter>);
};

export default Code;

import React from 'react';
import { Elements } from 'prismic-reactjs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightStyle from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow';
import darkStyle from 'react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow-night';
import ReactMarkdown from 'react-markdown';
import { normalizeHeading } from '../utils/normalize';
import { mdCodeRenderer, mdHeaderingRenderer } from './md';

const propsWithUniqueKey = (props, key) => Object.assign(props || {}, { key });

const blogPostHtmlSerializer = darkMode => (type, element, content, children, key) => {
  const style = darkMode ? darkStyle : lightStyle;

  let props = {};
  switch (type) {
    case Elements.paragraph:
      if (element.text.match(/".+"\s-\s.+/)) {
        return React.createElement('blockquote', propsWithUniqueKey(props, key), children);
      }

      return null;
    case Elements.hyperlink:
      const href = element.data.url || linkResolver(element.data);
      props = {
        href: href.replace('https://jacksonhardaker.dev', ''),
      };
      return React.createElement('a', propsWithUniqueKey(props, key), children);

    case Elements.heading2:
      props = {
        id: normalizeHeading(element.text)
      };
      return React.createElement('h2', propsWithUniqueKey(props, key), children)

    case Elements.preformatted:
      const [comment, lang] = element.text.match(/^\/\/(javascript|css|html|md|js)\n/) || [];

      if (comment && lang && lang === 'md') {
        return <ReactMarkdown key={key} source={element.text.replace(comment, '')} renderers={{ heading: mdHeaderingRenderer, code: mdCodeRenderer(style) }} />
      }
      else if (comment && lang) {
        return <SyntaxHighlighter key={key} language={lang} style={style}>{element.text.replace(comment, '')}</SyntaxHighlighter>
      }
      else {
        return <SyntaxHighlighter key={key} style={style}>{element.text}</SyntaxHighlighter>
      }

    // Return null to stick with the default behavior
    default:
      return null;
  }
};

export default blogPostHtmlSerializer;

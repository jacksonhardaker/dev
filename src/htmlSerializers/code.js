import PrismicDOM from 'prismic-dom';
import he from 'he';

const codeHtmlSerializer = (type, _, __, children) => {
  const Elements = PrismicDOM.RichText.Elements;
  switch (type) {
    case Elements.paragraph:
      return `${he.decode(children.join(''))}\n`;
    default:
      return null;
  }
};

export default codeHtmlSerializer;

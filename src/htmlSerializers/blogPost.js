import React from 'react';
import { Elements } from 'prismic-reactjs';

const propsWithUniqueKey = (props, key) => Object.assign(props || {}, { key });

const normalizeHeading = text => text.replace(/[^A-Za-z\s]/g, '').replace(/\s/g, '-').toLowerCase();

const blogPostHtmlSerializer = (type, element, content, children, key) => {
  let props = {};
  switch (type) {
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

    // Return null to stick with the default behavior
    default:
      return null;
  }
};

export default blogPostHtmlSerializer;

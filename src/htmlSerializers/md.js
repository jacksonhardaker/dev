import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { normalizeHeading } from '../utils/normalize';

const flattenChildren = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flattenChildren, text)
}

export const mdHeaderingRenderer = ({ children, level }) => {
  const text = React.Children.toArray(children).reduce(flattenChildren, '');
  return React.createElement('h' + level, { id: normalizeHeading(text) }, children);
};

export const mdCodeRenderer = style => ({ value, language }) => {
  return <SyntaxHighlighter language={language} style={style}>{value}</SyntaxHighlighter>;
};

import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import lightStyle from '../src/constants/prism/lightStyle';

export const Code: FC<{ className: string }> = ({ className, children }) => {
  const language = className?.replace?.('language-', '');
  return (
    <SyntaxHighlighter style={lightStyle} language={language}>
      {children}
    </SyntaxHighlighter>
  );
};

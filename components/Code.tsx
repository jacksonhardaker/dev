import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import lightStyle from '../src/constants/prism/lightStyle';
import darkStyle from '../src/constants/prism/darkStyle';
import useTheme from '@context/ThemeContext';

export const Code: FC<{ className: string }> = ({ className, children }) => {
  const language = className?.replace?.('language-', '');
  const { darkMode } = useTheme();
  return (
    <SyntaxHighlighter
      style={darkMode ? darkStyle : lightStyle}
      language={language}
    >
      {children}
    </SyntaxHighlighter>
  );
};

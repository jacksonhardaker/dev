import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import lightStyle from '@constants/code/lightStyle';
import darkStyle from '@constants/code/darkStyle';
import useTheme from '@context/ThemeContext';

export const Code: FC<{ className: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
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

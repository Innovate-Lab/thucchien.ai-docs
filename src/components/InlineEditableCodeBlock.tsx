import React, { Fragment, useState } from 'react';
import { Highlight } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';
import { lightCodeTheme, darkCodeTheme } from '../utils/prismTheme';
import styles from './InlineEditableCodeBlock.module.css';

interface Props {
  language: string;
  code: string;
  finalCode: string;
  replacements: {
    [key: string]: React.ReactNode;
  };
}

const CodeBlockWrapper = ({ code, language, replacements }) => {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? darkCodeTheme : lightCodeTheme;

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${styles.pre} ${className}`} style={{ ...style, ...theme.plain }}>
          <code className={styles.code}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => {
                  const content = token.content;
                  if (content.includes('{{')) {
                    const parts = content.split(/(\{\{.*?\}\})/g).filter(Boolean);
                    return parts.map((part, index) => {
                      if (part.startsWith('{{') && part.endsWith('}}')) {
                        const placeholderKey = part.substring(2, part.length - 2);
                        return <Fragment key={`${key}-${index}`}>{replacements[placeholderKey] || null}</Fragment>;
                      }
                      return <span key={`${key}-${index}`} {...getTokenProps({ token: { ...token, content: part }, key: `${key}-${index}` })} />;
                    });
                  }
                  return <span {...getTokenProps({ token, key })} />;
                })}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default function InlineEditableCodeBlock({ language, code, finalCode, replacements }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={handleCopy} className={styles.copyButton}>
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <CodeBlockWrapper code={code} language={language} replacements={replacements} />
    </div>
  );
}

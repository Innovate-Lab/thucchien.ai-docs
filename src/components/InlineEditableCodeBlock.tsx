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
  onExecute: () => void;
  isLoading: boolean;
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

export default function InlineEditableCodeBlock({ language, code, finalCode, replacements, onExecute, isLoading }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <CodeBlockWrapper code={code} language={language} replacements={replacements} />
      <div className={styles.footer}>
        <button onClick={handleCopy} className={styles.copyButton}>
          {isCopied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          )}
        </button>
        <button onClick={onExecute} disabled={isLoading} className={styles.tryItButton}>
          {isLoading ? 'Executing...' : 'Try It!'}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './CopyableCodeBlock.module.css';

interface Props {
  fullCode: string;
  truncatedCode: string;
  language: string;
  title: string;
}

export default function CopyableCodeBlock({ fullCode, truncatedCode, language, title }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className={styles.container}>
      <CodeBlock language={language} title={title} className={styles.codeBlock}>
        {truncatedCode}
      </CodeBlock>
      <button onClick={handleCopy} className={styles.copyButton}>
        {isCopied ? 'Copied!' : 'Copy full'}
      </button>
    </div>
  );
}

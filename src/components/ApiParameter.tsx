import React, { type ReactNode } from 'react';
import styles from './ApiParameter.module.css';

interface Props {
  name: string;
  type: string;
  required?: boolean;
  isEnd?: boolean;
  indent?: number;
  children: ReactNode;
}

export default function ApiParameter({
  name,
  type,
  required,
  isEnd,
  indent = 0,
  children,
}: Props) {
  const indentStyle = {
    paddingLeft: `${indent * 24}px`,
  };

  return (
    <div
      className={`${styles.paramContainer} ${isEnd ? styles.isEnd : ''}`.trim()}
      style={indentStyle}
    >
      <div className={styles.paramHeader}>
        <code className={styles.paramName}>{name}</code>
        <span className={styles.paramType}>{type}</span>
        {required && <span className={styles.paramRequired}>Required</span>}
      </div>
      <div className={styles.paramDescription}>
        {children}
      </div>
    </div>
  );
}

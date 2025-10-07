import React, { type ReactNode } from 'react';
import styles from './ApiParameter.module.css';

interface Props {
  name: string;
  type: string;
  required?: boolean;
  isEnd?: boolean;
  children: ReactNode;
}

export default function ApiParameter({
  name,
  type,
  required,
  isEnd,
  children,
}: Props) {
  return (
    <div
      className={`${styles.paramContainer} ${isEnd ? styles.isEnd : ''}`.trim()}
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

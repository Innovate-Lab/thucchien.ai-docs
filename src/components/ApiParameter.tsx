import React, { type ReactNode } from 'react';
import styles from './ApiParameter.module.css';

interface Props {
  name: string;
  type: string;
  required?: boolean;
  children: ReactNode;
}

export default function ApiParameter({ name, type, required, children }: Props) {
  return (
    <div className={styles.paramContainer}>
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

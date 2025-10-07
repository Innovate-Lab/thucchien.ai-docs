import React, { Children, isValidElement, type ReactNode } from 'react';
import styles from './ApiReferenceLayout.module.css';

// --- Slot Components ---
// These components do nothing but act as markers for the layout.
export function LeftColumn({ children }: { children: ReactNode }): React.ReactElement {
  return <>{children}</>;
}

export function RightColumn({ children }: { children: ReactNode }): React.ReactElement {
  return <>{children}</>;
}

// --- Layout Component ---
export default function ApiReferenceLayout({ children }: { children: ReactNode }): React.ReactElement {
  // Separate children into left and right column based on the slot components
  const left = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === LeftColumn
  );

  const right = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === RightColumn
  );

  return (
    <div className={styles.apiReferenceLayout}>
      <div className={styles.leftCol}>{left}</div>
      <div className={styles.rightCol}>{right}</div>
    </div>
  );
}

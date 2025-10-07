import React from 'react';
import styles from './Badge.module.css';

type BadgeProps = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

const Badge: React.FC<BadgeProps> = ({ method }) => {
  const lowerCaseMethod = method.toLowerCase();
  const badgeClass = `${styles.badge} ${styles[lowerCaseMethod]}`;

  return (
    <span className={badgeClass}>
      {method}
    </span>
  );
};

export default Badge;

import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  href: string;
  title: string;
  description: string;
}

function CategoryCard({ href, title, description }: CategoryCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </Link>
  );
}

export function CategoryGrid({ children }: { children: React.ReactNode }) {
    return <div className={styles.grid}>{children}</div>;
}

export default CategoryCard;

// TODO: Пересмотреть
'use client';
import React, { useRef } from 'react';
import styles from './HorizontalScroll.module.scss';

interface IHorizontalScrollProps {
  children: React.ReactNode;
}

export const HorizontalScroll: React.FC<IHorizontalScrollProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.scrollWrapper}>
      <button
        className={styles.arrowLeft}
        onClick={() =>
          containerRef.current?.scrollBy({ left: -100, behavior: 'smooth' })
        }
      >
        &lt;
      </button>
      <div ref={containerRef} className={styles.scrollContainer}>
        {children}
      </div>
      <button
        className={styles.arrowRight}
        onClick={() =>
          containerRef.current?.scrollBy({ left: 100, behavior: 'smooth' })
        }
      >
        &gt;
      </button>
    </div>
  );
};

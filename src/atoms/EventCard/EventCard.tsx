import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './EventCard.module.scss';
import cn from 'classnames';
import { BlurredBackgroundComponent } from '@/atoms/BlurredBackgroundWrapper';

export enum EEventCardColumDirection {
  LEFT,
  RIGHT,
}

export interface EventCardProps {
  imageUrl: string;
  blurDataURL?: string;
  title: string;
  subtitle?: string;
  schedule?: Array<string>;
  href: string;
  columnDirection?: EEventCardColumDirection;
  label?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  imageUrl,
  href,
  blurDataURL,
  columnDirection = EEventCardColumDirection.RIGHT,
  label,
}: EventCardProps) => {
  const layoutClass = cn(styles.layout, {
    [styles.layout__left]: columnDirection === EEventCardColumDirection.LEFT,
    [styles.layout__right]: columnDirection === EEventCardColumDirection.RIGHT,
  });

  return (
    <Link href={href} className={styles.Root}>
      <div className={styles.Card}>
        <BlurredBackgroundComponent blurDataUrl={blurDataURL}>
          <Image
            alt="АФИША"
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            src={imageUrl}
            height={1000}
            width={1000}
            className={styles.imageHover}
          />
        </BlurredBackgroundComponent>
        <div className={layoutClass}>
          {label && (
            <div className={styles.column}>
              <h2>{label.toUpperCase()}</h2>
            </div>
          )}
          <div className={styles.bottomRow}>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <div className={styles.schedule}>
              <Button type="primary">
                <h3>расписание и билеты</h3>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

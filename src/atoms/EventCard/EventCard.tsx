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
  desc: string;
  schedule?: Array<string>;
  href: string;
  columnDirection?: EEventCardColumDirection;
  label?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  desc,
  imageUrl,
  // schedule,
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
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: 'auto',
              aspectRatio: '1 / 1', // Поддерживает соотношение 1:1, чтобы сделать изображение квадратным
              objectFit: 'cover', // Заполняет контейнер, обрезая изображение по границам
              borderRadius: '15px', // Если вам нужно сделать изображение с округлыми углами
              overflow: 'hidden',
              position: 'relative',
              transition: 'transform 0.1s ease-in-out', // Добавление плавного эффекта при наведении
            }}
            className={styles.imageHover} // Добавление класса для дополнительного стиля
          />
        </BlurredBackgroundComponent>
      </div>
      <div className={layoutClass}>
        {label && (
          <div className={styles.column}>
            <h3>{label.toUpperCase()}</h3>
          </div>
        )}
        <div className={styles.bottomRow}>
          <h2>{title}</h2>
          <h3>{desc}</h3>
          {/*<Meta title={metaTitle} description={desc} />*/}
          <div className={styles.schedule}>
            {/*{schedule?.map((record) => (*/}
            {/*  <Button key={record} style={{ marginTop: '1.5rem' }}>*/}
            {/*    <h3>{record}</h3>*/}
            {/*  </Button>*/}
            {/*))}*/}
            <Button type="primary">
              <h3>расписание и билеты</h3>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

import Image from 'next/image';
import React from 'react';
import styles from './ActorCard.module.scss';
import cn from 'classnames';
export interface IActorCardProps {
  src?: string;
  title: string;
  subtitle?: string;
  blurDataUrl?: string;
  isSubtitleFirst?: boolean;
  width?: number;
  height?: number;
}

export const ActorCard = ({
  src,
  title,
  subtitle,
  blurDataUrl,
  isSubtitleFirst = false,
  width = 250,
  height = 250,
}: IActorCardProps) => {
  return (
    <div className={cn(styles.actorCard, styles.photoFrame)}>
      {src && (
        <Image
          src={src}
          width={width}
          height={height}
          alt={`${title} в роли ${subtitle}`}
          placeholder={'blur'}
          blurDataURL={blurDataUrl}
        />
      )}
      <div className={styles.goldenDetail}>
        <h2>{isSubtitleFirst ? subtitle : title}</h2>
        <h3>{isSubtitleFirst ? title : subtitle}</h3>
      </div>
    </div>
  );
};

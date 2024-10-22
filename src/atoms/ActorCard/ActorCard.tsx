import Image from 'next/image';
import React from 'react';
import styles from './ActorCard.module.scss';
import cn from 'classnames';
export interface IActorCardProps {
  src?: string;
  actorName: string;
  role?: string;
  blurDataUrl?: string;
  isRoleFirst?: boolean;
  width?: number;
  height?: number;
}

export const ActorCard = ({
  src,
  actorName,
  role,
  blurDataUrl,
  isRoleFirst = false,
  width = 350,
  height = 450,
}: IActorCardProps) => {
  return (
    <div className={cn(styles.actorCard, styles.photoFrame)}>
      {src && (
        <Image
          src={src}
          width={width}
          height={height}
          alt={`${actorName} в роли ${role}`}
          placeholder={blurDataUrl ? 'blur' : 'empty'}
          blurDataURL={blurDataUrl}
        />
      )}
      <div className={styles.goldenDetail}>
        <h2>{isRoleFirst ? role : actorName}</h2>
        <h3>{isRoleFirst ? actorName : role}</h3>
      </div>
    </div>
  );
};

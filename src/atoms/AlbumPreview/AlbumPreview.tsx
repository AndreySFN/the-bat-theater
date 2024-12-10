import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AlbumPreview.module.scss';
import cn from 'classnames';

export interface IAlbumPreviewProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  href?: string;
  height?: number;
  width?: number;
  blurDataUrl?: string;
}

export const AlbumPreview = ({
  imageUrl,
  title,
  subtitle,
  href,
  height = 200,
  width = 300,
  blurDataUrl,
}: IAlbumPreviewProps) => {
    console.log(blurDataUrl)
  const Content = (
    <div
      className={cn(styles.content, { ['--clickable']: Boolean(href) })}
      style={{
        maxWidth: width,
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Image
        alt={imageUrl}
        width={width}
        height={height}
        src={imageUrl}
        placeholder={blurDataUrl ? 'blur' : 'empty'}
        blurDataURL={blurDataUrl}
        style={{
          maxWidth: width,
          width: '100%',
          height: 'auto',
        }}
      />
      <div className={styles.description} style={{ maxWidth: width }}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
  const Cover = href ? <Link href={href}>{Content}</Link> : Content;
  return Cover;
};

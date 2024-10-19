import React from 'react';
import { Carousel } from 'antd';
import { IPreviews } from '@/utils/dataHandler/types';
import { AlbumPreview } from '@/atoms/AlbumPreview';
import styles from './CustomCarousel.module.scss';

export interface ICustomCarouselProps {
  imagesList: Array<IPreviews>;
  speed?: number;
  width?: number;
  height?: number;
}

export const CustomCarousel = ({
  imagesList,
  speed = 500,
  width = 750,
  height = 500,
}: ICustomCarouselProps) => {
  return (
    <Carousel
      autoplay
      speed={speed}
      style={
        {
          // maxWidth: '100%',
          // maxHeight: height,
        }
      }
      rootClassName={styles.root}
    >
      {imagesList.map((props: IPreviews) => {
        const { url, title, subtitle, blurDataUrl } = props;
        return (
          <div
            key={url}
            style={{ display: 'flex', flexDirection: 'column', width: 'auto' }}
          >
            <AlbumPreview
              width={width}
              height={height}
              imageUrl={url}
              blurDataUrl={blurDataUrl}
              title={title}
              subtitle={subtitle}
            />
          </div>
        );
      })}
    </Carousel>
  );
};
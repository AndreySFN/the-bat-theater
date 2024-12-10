'use client';
import React from 'react';

import { Carousel } from 'antd';
import { AlbumPreview } from '@/atoms/AlbumPreview';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import styles from './CustomCarousel.module.scss';
import { gray } from '@ant-design/colors';
import {IMainCarouselElement} from "@/model/mainCarousel.model";

export interface ICustomCarouselProps {
  imagesList?: Array<IMainCarouselElement>;
  speed?: number;
  width?: number;
  height?: number;
}

export const CustomCarousel = (
    {
  imagesList = [],
  speed = 500,
  width = 100,
  height = 350,
}: ICustomCarouselProps
) => {
  const showButtons = !(imagesList?.length === 1)
  const carouselRef = React.useRef<{ prev: VoidFunction; next: VoidFunction }>(
    null
  );

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev!();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div
        className={styles.carouselContainer}
    >
      {showButtons && <LeftCircleOutlined
          style={{color: gray[1]}}
          className={styles.leftArrow}
          onClick={handlePrev}
      />}
      <Carousel
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref={carouselRef}
        autoplay
        speed={speed}
        style={{ maxWidth: '100%' }}
        rootClassName={styles.root}
      >
        {imagesList?.map((props) => {
          const { id, title, subtitle, image: { blurDataUrl, src} } = props;
          return (
            <div
              key={id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 'auto',
                maxHeight: '80vh',
              }}
            >
              <AlbumPreview
                width={width}
                height={height}
                imageUrl={src}
                blurDataUrl={blurDataUrl}
                title={title}
                subtitle={subtitle}
              />
            </div>
          );
        })}
      </Carousel>
      {showButtons && <RightCircleOutlined
          style={{color: gray[1]}}
          className={styles.rightArrow}
          onClick={handleNext}
      />}
    </div>
  );
};

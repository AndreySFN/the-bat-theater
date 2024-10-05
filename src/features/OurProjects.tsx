import React from 'react';
import { Section } from '@/layouts/Section';
import { getMainCarousel } from '@/app/utils';
import { CustomCarousel } from '@/app/atoms/CustomCarousel';
import { MAX_WIDTH } from '@/app/consts';
const generateMainCarousel = () => {
  const imageList = getMainCarousel();
  return (
    <CustomCarousel
      imagesList={imageList}
      width={MAX_WIDTH}
      height={MAX_WIDTH / 1.5}
    />
  );
};
export const OurProjects = () => {
  return <Section title="Наши работы:">{generateMainCarousel()}</Section>;
};

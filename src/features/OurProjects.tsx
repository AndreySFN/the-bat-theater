import React from 'react';
import { Section } from '@/layouts/Section';
import { getMainCarousel } from '@/utils/dataHandler/dataHandler';
import { CustomCarousel } from '@/atoms/CustomCarousel';
import { MAX_WIDTH } from '@/consts';
const generateMainCarousel = async () => {
  const imageList = await getMainCarousel();
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

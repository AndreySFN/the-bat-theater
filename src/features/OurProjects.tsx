import React from 'react';
import { Section } from '@/layouts/Section';
import { CustomCarousel } from '@/atoms/CustomCarousel';
import { MAX_WIDTH } from '@/consts';
import { dbClientPromise } from '@/lib/mongodb';
import { IPreviews } from '@/lib/types';
const generateMainCarousel = async () => {
  const client = await dbClientPromise;
  const carousel = await client
    .collection('main_carousel')
    .find<IPreviews>({})
    .toArray();
  return (
    <CustomCarousel
      imagesList={carousel}
      width={MAX_WIDTH}
      height={MAX_WIDTH / 1.5}
    />
  );
};
export const OurProjects = () => {
  return <Section title="Наши работы:">{generateMainCarousel()}</Section>;
};

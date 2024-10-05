import { AlbumPreview } from '@/app/atoms/AlbumPreview';
import React from 'react';
import { CustomCarousel } from '@/app/atoms/CustomCarousel';

const Page = () => {
  const previews = [
    {
      url: '/gallery/mother_metelitsa.jpg',
      title: 'Пиздежа пизделица',
      subtitle: '2022 говно',
    },
    {
      url: '/gallery/mother_metelitsa.jpg',
      title: 'Пиздежа пизделица',
      subtitle: '2022 говно',
    },
    {
      url: '/gallery/mother_metelitsa.jpg',
      title: 'Пиздежа пизделица',
      subtitle: '2022 говно',
    },
  ];
  return (
    <>
      <CustomCarousel imagesList={previews} />
      <AlbumPreview
        width={500}
        height={700}
        imageUrl={'/gallery/mother_metelitsa.jpg'}
        title={'/gallery/mother_metelitsa.jpg'}
        subtitle={'/gallery/mother_metelitsa.jpg'}
      />
    </>
  );
};
export default Page;

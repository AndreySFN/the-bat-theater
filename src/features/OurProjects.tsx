import { Section } from '@/layouts/Section';
import { CustomCarousel } from '@/atoms/CustomCarousel';
import { MAX_WIDTH } from '@/consts';
import { IAlbumElement } from '@/model/albumElement.model';

export interface IOurProjectsProps {
  carousel: Array<IAlbumElement>;
}

export const OurProjects = ({ carousel }: IOurProjectsProps) => {
  return (
    <Section title="Наши работы:">
      <CustomCarousel
        imagesList={carousel}
        width={MAX_WIDTH}
        height={MAX_WIDTH / 1.5}
      />
    </Section>
  );
};

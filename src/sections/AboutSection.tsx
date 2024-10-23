import React, { ReactNode } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './AboutSection.module.scss';
import { THEATER_DIRECTOR_BLUR_URL } from '@/consts';

interface AboutSectionProps {
  content?: ReactNode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => (
  <section className={styles.about}>
    <h2>О нас</h2>
    <div className={styles.content}>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <p>
          Театр &#34;Летучая мышь&#34; в городе Клин, основанный в 2007 году,
          объединяет талантливых и преданных своему делу людей. С самого начала
          коллектив стремится создавать постановки, которые находят отклик у
          зрителей благодаря своей искренности и глубине. Репертуар театра
          разнообразен и включает как классические произведения, так и
          современные пьесы, позволяя привлечь широкую аудиторию.
        </p>
        <br />
        <p>
          За годы работы труппа участвовала в различных театральных фестивалях,
          где ее выступления были отмечены наградами. Эти достижения отражают
          серьезный подход коллектива к своему делу и его стремление к
          профессиональному росту. Однако, для актеров и режиссеров главной
          ценностью остается возможность делиться со зрителями своими идеями и
          эмоциями на сцене.
        </p>
        <br />
        <p>
          &#34;Летучая мышь&#34; активно взаимодействует с культурной средой
          города, участвуя в общественных мероприятиях и сотрудничая с другими
          творческими коллективами. Театр стремится быть не только местом для
          просмотра спектаклей, но и пространством для общения и обмена мыслями.
          Коллектив продолжает работать над новыми проектами, оставаясь верным
          своим принципам и любви к театральному искусству.
        </p>
        <br />
      </div>
      <div
        className={styles.theaterDirectorSection}
        style={{ minWidth: '350px', textAlign: 'center' }}
      >
        <div className={cn(styles.photoFrame, styles.theaterDirector)}>
          <Image
            src={'/theater-director.png'}
            width={600}
            height={800}
            alt={'Юлия Анатольевна Власова'}
            placeholder="blur"
            blurDataURL={THEATER_DIRECTOR_BLUR_URL}
          />
          <div className={styles.plaqueFrame}>
            <h2>Юлия Анатольевна Власова</h2>
            <h3>Режиссёр театра</h3>
          </div>
        </div>
      </div>
    </div>
    <br />
    {content}
  </section>
);

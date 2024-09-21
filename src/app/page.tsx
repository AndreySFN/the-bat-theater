import Image from 'next/image'
import styles from './[name]/page.module.scss'
import { getAllData } from "./utils";
import { notFound } from "next/navigation";
import { Map } from './Map'
import { EventCard } from './EventCard';
export default function Page() {
  const data = getAllData();
  if (!data) {
    notFound();
  }
  console.log(data)
  return (
    <>
    <Image src={`/main_poster.png`} alt='Афиша' width={2000} height={300} style={{position: 'absolute', zIndex: -1, 
      objectFit: 'cover', maxWidth: '100%'}}/>
    <div className={styles.container}>
      <header className={styles.header}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h1>Арт-студия "Луна"</h1>
        <p>Погружение в удивительный мир искусства</p>
      </header>
          
      <section className={styles.announce}>
        <h2>АФИША:</h2>
        <div className={styles.announceContent}>
        {Object.entries(data).map(([key, {shortDesc, title, options}]) => <EventCard href={'/'.concat(key)} imageUrl={`/miniposters/${key}.png`} date={options[0].dateTime} desc={shortDesc} key={key} title={title} /> )}
        </div>
        </section>
      <section className={styles.about}>
      <h2>О нас</h2>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      "Арт-студия "Луна"" объединяет художников, музыкантов, писателей, дизайнеров и всех, кто стремится раскрыть свой творческий потенциал. Под светом луны наши идеи оживают, а вдохновение не знает границ. Здесь вы найдете поддержку единомышленников, возможность обмениваться опытом и участвовать в уникальных проектах.
      </section>
      
      <section className={styles.address}>
        <h2>Адрес</h2>
        <p></p>
        <Map/>
        </section>
    </div>
    </>
  );
};


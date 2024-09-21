import React from 'react';
import {Map} from './Map'
import Image from 'next/image'
import styles from './page.module.scss';
import { ShowtimeCard } from './molecules/ShowtimeCard';
import { Schedule } from './sections/Schedule';

const Home: React.FC = () => {
  return (
    <>
    <Image src='/image.png' alt='Афиша' width={2000} height={300} style={{position: 'absolute', zIndex: -1, 
      objectFit: 'cover', maxWidth: '100%'}}/>
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Давай споём!</h1>
        <p>Караоке вечер</p>
      </header>

        <Schedule>
        <ShowtimeCard dateTime={new Date(2024, 9, 28, 19, 0)} place={'Арт-студия "Луна". Клин, улица Захватаева, 4'} />
            {/* <ShowtimeCard dateTime={new Date(2024, 11, 11, 19, 0)} place={'ЦСКА Арена'} isSoldOut /> */}
        </Schedule>
          

      <section className={styles.about}>
        <h2>О событии</h2>
        <p>Приглашаем вас на незабываемый караоке-вечер! 🎤✨ <br/>

Готовьтесь петь свои любимые хиты, наслаждаться атмосферой веселья и хорошего настроения. Мы подготовили для вас отличную подборку песен, уютную обстановку и массу позитивных эмоций.
<br/>
Приходите с друзьями, чтобы вместе провести вечер, полный музыки, смеха и ярких впечатлений! Не упустите шанс стать звездой сцены и показать свои вокальные таланты. 🌟
<br/>
До встречи на нашем караоке-вечере!</p>
      </section>

      <section className={styles.address}>
        <h2>Адрес</h2>
        <p>Клин, улица Захватаева, 4</p>
        <Map/>
        </section>
    </div>
    </>
  );
};

export default Home;

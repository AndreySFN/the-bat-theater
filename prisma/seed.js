import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import fs from 'fs';
import path from 'path';

async function main() {
  // Чтение данных из JSON файлов
  const eventsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'events.json'), 'utf-8'));
  const carouselData = JSON.parse(fs.readFileSync(path.join(__dirname, 'carousel.json'), 'utf-8'));

  // Обработка и вставка данных в базу данных
  for (const [eventGroupCode, eventGroupValue] of Object.entries(eventsData)) {
    const eventGroup = await prisma.eventGroup.create({
      data: {
        code: eventGroupCode,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        title: eventGroupValue.title,
      },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    for (const [elementCode, elementValue] of Object.entries(eventGroupValue.elements as any)) {
      const element = await prisma.element.create({
        data: {
          eventGroupId: eventGroup.id,
          code: elementCode,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          title: elementValue.title,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          subtitle: elementValue.subtitle,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          shortDesc: elementValue.shortDesc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          desc: elementValue.desc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          mapKey: elementValue.mapKey,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          coverUrl: elementValue.coverUrl,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          miniCoverUrl: elementValue.miniCoverUrl,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          ym: elementValue.ym,
        },
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      for (const preview of elementValue.previews) {
        await prisma.preview.create({
          data: {
            elementId: element.id,
            url: preview.url,
          },
        });
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      for (const optionValue of elementValue.options) {
        const option = await prisma.option.create({
          data: {
            elementId: element.id,
            place: optionValue.place,
            dateTime: optionValue.dateTime ? new Date(optionValue.dateTime) : null,
            price: optionValue.price,
          },
        });

        if (optionValue.nethouseLinks) {
          await prisma.nethouseLink.create({
            data: {
              optionId: option.id,
              yandexDirect: optionValue.nethouseLinks.yandexDirect,
              lmVk: optionValue.nethouseLinks.lmVk,
              other: optionValue.nethouseLinks.other,
            },
          });
        }
      }
    }
  }

  for (const carouselItem of carouselData) {
    await prisma.carouselItem.create({
      data: {
        url: carouselItem.url,
        title: carouselItem.title,
        subtitle: carouselItem.subtitle,
      },
    });
  }
}

main()
  .then(async () => {
    console.log('Данные успешно загружены');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Ошибка при загрузке данных:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

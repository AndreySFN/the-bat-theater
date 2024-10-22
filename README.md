# The Bat Theater

The Bat Theater — это сайт театра "Летучая мышь", который предоставляет онлайн афиши выступлений и других мероприятий. Проект разработан на базе [Next.js](https://nextjs.org) с использованием технологий, таких как TypeScript и SCSS, и использует JSON-файлы `main_carousel.json` и `records.json` для управления контентом театра.

Главный функционал включает:
- Просмотр афиш театра.
- Слайдер с основными событиями (использует `main_carousel.json`).
- Отображение списка мероприятий (использует `records.json`).
- Функционал онлайн покупки билетов на базе интеграции с Nethouse.Events.

## Стек технологий

- **Next.js 14** с **App Router**
- **React 18**
- **TypeScript**
- **SCSS** для стилизации
- **Ant Design** для UI компонентов
- **Axios** для работы с API
- **Lodash** для работы с данными
- **Lightgallery** для галереи изображений

## Как развернуть проект

Чтобы запустить проект локально, выполните следующие шаги:

### Установка

1. Склонируйте репозиторий:
   ```bash
   git clone <URL вашего репозитория>
   ```

2. Перейдите в папку проекта:
   ```bash
   cd the-bat-theater
   ```

3. Установите зависимости с помощью Yarn:
   ```bash
   yarn install
   ```

### Скрипты

- **`yarn dev`** — запустить проект в режиме разработки.
- **`yarn build`** — выполнить линтинг и сборку проекта.
- **`yarn start`** — запустить проект в продакшн режиме.
- **`yarn lint`** — выполнить линтинг кода.

## Переменные окружения

Для интеграции с Nethouse.Events используются следующие переменные окружения:
- **`ACCESS_TOKEN`**: Токен доступа, необходимый для выполнения авторизованных запросов к API Nethouse. Он используется для получения информации о событиях и оформления покупок.
- **`REFRESH_TOKEN`**: Токен обновления, который позволяет обновить `ACCESS_TOKEN` по истечении его срока действия, обеспечивая непрерывный доступ к API.

Проект настроен для деплоя на сервер с использованием сервиса `luna-art`. После выполнения сборки необходимо перезапустить сервис для применения изменений.

1. Перенесите следующие файлы на сервер:
    - `.next`
    - `public`
    - `yarn.lock`
    - `package.json`
    - `records.json`
    - `main_carousel.json`

2. Выполните команду на сервере для перезапуска сервиса:
   ```bash
   sudo systemctl restart luna-art
   ```

## Зависимости

Основные зависимости:
- **`next`**: 14.2.13
- **`react`**: ^18
- **`antd`**: ^5.20.6
- **`axios`**: ^1.7.7
- **`lodash`**: ^4.17.21
- **`lightgallery`**: ^2.7.2

Dev-зависимости включают такие пакеты, как **Jest** для тестирования, **ESLint** для линтинга, **Prettier** для форматирования и **TypeScript**.

## Лицензия

Проект распространяется под лицензией ISC. Автор проекта: Петров Андрей Валентинович (andreysfn@yandex.ru).

---

# ISC License (ISC)

Copyright (c) 2024 Petrov Andrei Valentinovich

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


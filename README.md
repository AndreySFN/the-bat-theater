# Сайт театра "Летучая мышь" (находится в [продакшене](https://luna-art-studio.ru))

Сайт предоставляет онлайн афиши выступлений с возможностью пребритения, а так же информацию о труппе театра, играющем составе. Проект разработан на базе [Next.js](https://nextjs.org) с использованием технологий, таких как TypeScript и SCSS, и использует [Strapi CMS](https://strapi.io) для управления контентом театра.

## Главный функционал

- Отображение списка мероприятий
- Функционал онлайн покупки билетов на базе интеграции с [QTickets](https://qtickets.app)
- Административная панель для управления контентом (Strapi CMS)
- Управление актерами, событиями, местами проведения и альбомами

## Архитектура проекта

Проект состоит из двух частей:

### 1. Frontend (Next.js)
- **Next.js 14** с **App Router**
- **React 18** с **TypeScript**
- **SCSS** для стилизации
- **Ant Design** для UI компонентов

### 2. Backend (Strapi CMS)
- **Strapi v5** - headless CMS
- **SQLite** (по умолчанию) или **PostgreSQL/MySQL**
- **REST API** для получения данных
- **Административная панель** для управления контентом

## Стек технологий

### Frontend
- **Next.js 14** с **App Router**
- **React 18**
- **TypeScript**
- **SCSS** для стилизации
- **Ant Design** для UI компонентов
- **Axios** для работы с API
- **Lodash** для работы с данными
- **Lightgallery** для галереи изображений

### Backend
- **Strapi v5** - headless CMS
- **TypeScript**
- **SQLite/PostgreSQL/MySQL**

## Как развернуть проект

### Предварительные требования

- **Node.js** 18+ 
- **npm** или **yarn**

### Установка и запуск

1. **Клонируйте репозиторий:**
```bash
git clone <repository-url>
cd the-bat-theater
```

2. **Установите зависимости Frontend:**
```bash
npm install
```

3. **Установите зависимости Backend:**
```bash
cd strapi-backend
npm install
```

4. **Настройте переменные окружения:**
   
   Создайте файл `.env.local` в корне проекта:
   ```env
   MONGODB_URI=mongodb://localhost:27017/the-bat-theater-v2
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_TOKEN=your-strapi-token-here
   ```

5. **Запустите Strapi Backend:**
```bash
cd strapi-backend
npm run develop
```

   Strapi будет доступен по адресу: http://localhost:1337
   Админка: http://localhost:1337/admin

6. **Настройте публичный доступ в Strapi:**
   - Откройте http://localhost:1337/admin
   - Перейдите в **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
   - Для каждого типа контента (Venue, Actor, Event, Album, Schedule, Role) отметьте:
     - ✅ **find** - для получения списка записей
     - ✅ **findOne** - для получения одной записи по ID
   - Нажмите **Save**

7. **Запустите Frontend:**
```bash
npm run dev
```

   Приложение будет доступно по адресу: http://localhost:4000

### Скрипты

#### Frontend
- **npm run dev** — запустить проект в режиме разработки (порт 4000)
- **npm run build** — выполнить линтинг и сборку проекта
- **npm run start** — запустить проект в продакшн режиме
- **npm run lint** — выполнить линтинг кода

#### Backend (Strapi)
- **npm run develop** — запустить Strapi в режиме разработки (порт 1337)
- **npm run build** — собрать Strapi для продакшена
- **npm run start** — запустить Strapi в продакшн режиме

## Структура данных

### Content Types в Strapi

- **Venue** - места проведения (театры, сцены)
- **Event** - события/спектакли
- **Actor** - актеры труппы
- **Album** - альбомы с фотографиями
- **Schedule** - расписание показов
- **Role** - роли актеров в спектаклях

### API Endpoints

- `GET /api/venues` - список мест проведения
- `GET /api/events` - список событий
- `GET /api/actors` - список актеров
- `GET /api/albums` - список альбомов
- `GET /api/schedules` - список расписаний
- `GET /api/roles` - список ролей

## Миграция с MongoDB

Проект был мигрирован с MongoDB на Strapi CMS. Старые модели данных адаптированы для работы с новой архитектурой через адаптеры в `src/lib/strapi-adapters.ts`.

## Зависимости

### Frontend
- **next**: 14.2.13
- **react**: ^18
- **antd**: ^5.20.6
- **axios**: ^1.7.7
- **lodash**: ^4.17.21
- **lightgallery**: ^2.7.2

### Backend
- **strapi**: ^5.20.0
- **better-sqlite3**: 11.3.0

Dev-зависимости включают такие пакеты, как **Jest** для тестирования, **ESLint** для линтинга, **Prettier** для форматирования и **TypeScript**.

## Разработка

### Добавление нового Content Type

1. Создайте новый API в Strapi через админку или CLI
2. Добавьте TypeScript файлы в `strapi-backend/src/api/`
3. Обновите типы в `src/lib/strapi-types.ts`
4. Создайте адаптер в `src/lib/strapi-adapters.ts`
5. Добавьте сервис в `src/lib/strapi-services.ts`

### Работа с изображениями

Изображения загружаются через Strapi Media Library и доступны по URL вида:
`http://localhost:1337/uploads/filename.jpg`

Next.js настроен для работы с изображениями из Strapi через конфигурацию в `next.config.mjs`.

---

## Лицензия

ISC

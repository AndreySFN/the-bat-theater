# Strapi Backend для театра "Летучая мышь"

Это Strapi CMS для управления контентом театрального сайта.

## Установка и запуск

1. **Установка зависимостей:**
   ```bash
   npm install
   ```

2. **Настройка переменных окружения:**
   ```bash
   cp env.example .env
   ```
   
   Отредактируйте `.env` файл, добавив ваши секретные ключи.

3. **Запуск в режиме разработки:**
   ```bash
   npm run develop
   ```

4. **Сборка для продакшена:**
   ```bash
   npm run build
   npm run start
   ```

## Content Types

### Image
- `src` (string, required) - URL изображения
- `blurDataUrl` (text, required) - Base64 blur изображения

### Actor
- `name` (string, required) - Имя актера
- `description` (text) - Описание актера
- `image` (relation to Image) - Фото актера

### Schedule
- `ticketUrl` (string, required) - Ссылка на покупку билетов
- `place` (string, required) - Место проведения
- `dateTime` (datetime, required) - Дата и время выступления
- `price` (string, required) - Цена билета

### Metadata
- `title` (string) - SEO заголовок
- `description` (text) - SEO описание
- `image` (relation to Image) - SEO изображение
- `width` (integer) - Ширина изображения
- `height` (integer) - Высота изображения
- `alt` (string) - Alt текст для изображения

### Album Element
- `title` (string) - Заголовок элемента
- `subtitle` (string) - Подзаголовок элемента
- `image` (relation to Image, required) - Изображение элемента
- `album` (relation to Album) - Альбом, к которому принадлежит элемент

### Album
- `title` (string) - Название альбома
- `key` (string, required, unique) - Уникальный ключ альбома
- `elements` (relation to Album Element) - Элементы альбома

### Role
- `actor` (relation to Actor, required) - Актер
- `image` (relation to Image) - Изображение роли
- `role` (string) - Название роли

### Event Details
- `ym` (string) - Яндекс Метрика
- `coverImg` (relation to Image) - Обложка события
- `description` (text) - Описание события
- `schedule` (relation to Schedule) - Расписание выступлений
- `roles` (relation to Role) - Роли в спектакле
- `previews` (relation to Album) - Альбом с превью
- `metadata` (relation to Metadata) - SEO метаданные

### Event
- `title` (string, required) - Название события
- `subtitle` (string) - Подзаголовок события
- `posterImg` (relation to Image) - Постер события
- `eventDetails` (relation to Event Details, required) - Детальная информация о событии

### Venue
- `title` (string, required) - Название места
- `label` (string, required) - Короткое название
- `mapUrl` (string) - Ссылка на карту
- `events` (relation to Event) - События в этом месте
- `address` (string, required) - Адрес места

## API Endpoints

Все Content Types доступны через REST API:

- `GET /api/images` - Получить все изображения
- `GET /api/actors` - Получить всех актеров
- `GET /api/schedules` - Получить все расписания
- `GET /api/metadata` - Получить все метаданные
- `GET /api/album-elements` - Получить все элементы альбомов
- `GET /api/albums` - Получить все альбомы
- `GET /api/roles` - Получить все роли
- `GET /api/event-details` - Получить все детали событий
- `GET /api/events` - Получить все события
- `GET /api/venues` - Получить все места проведения

## Административная панель

Откройте http://localhost:1337/admin для доступа к административной панели Strapi.

## Миграция данных

Для миграции данных из MongoDB используйте скрипт `migrate-to-strapi.js` в корне проекта.

## Разработка

### Добавление новых полей

1. Откройте административную панель
2. Перейдите в Content-Type Builder
3. Выберите нужный Content Type
4. Добавьте новые поля
5. Сохраните изменения

### Создание новых Content Types

1. В Content-Type Builder нажмите "Create new collection type"
2. Определите поля
3. Сохраните Content Type
4. Strapi автоматически создаст API endpoints

### Кастомизация API

Для кастомизации API создайте файлы в соответствующих папках:
- `src/api/[content-type]/controllers/` - для кастомной логики
- `src/api/[content-type]/services/` - для бизнес-логики
- `src/api/[content-type]/routes/` - для кастомных маршрутов

## Развертывание

### Локальное развертывание

```bash
npm run build
npm run start
```

### Продакшен развертывание

1. Настройте переменные окружения для продакшена
2. Используйте PostgreSQL или MySQL вместо SQLite
3. Настройте CORS для вашего домена
4. Настройте права доступа

## Безопасность

1. Измените все секретные ключи в `.env`
2. Настройте права доступа для API
3. Используйте HTTPS в продакшене
4. Регулярно обновляйте Strapi

## Мониторинг

- Логи доступны в консоли при запуске в режиме разработки
- В продакшене настройте логирование в файлы
- Используйте Strapi Analytics для мониторинга использования

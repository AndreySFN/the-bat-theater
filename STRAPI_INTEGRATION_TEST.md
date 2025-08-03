# Тестирование интеграции с Strapi

## Подключенные страницы

✅ **Главная страница** (`src/app/page.tsx`)
- Отображает все места проведения с событиями
- Показывает актеров театра
- Отображает карусель проектов

✅ **Страница события** (`src/app/[venueId]/[eventId]/page.tsx`)
- Детальная информация о событии
- Расписание показов
- Актерский состав
- Превью и галерея
- Другие мероприятия

## Шаги для тестирования

### 1. Запуск Strapi
```bash
cd strapi-backend
npm run develop
```

### 2. Настройка переменных окружения
Создайте файл `.env.local` в корне проекта:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-strapi-api-token
```

### 3. Создание API Token в Strapi
1. Откройте http://localhost:1337/admin
2. Перейдите в Settings > API Tokens
3. Создайте новый токен с правами на чтение
4. Скопируйте токен в `.env.local`

### 4. Создание тестовых данных
В админ панели Strapi создайте:

#### Venue (Место проведения)
- Title: "Театр 'Летучая мышь'"
- Label: "Основная сцена"
- Address: "г. Москва, ул. Театральная, 1"
- Map URL: "https://yandex.ru/map-widget/v1/..."

#### Actor (Актер)
- Name: "Иван Иванов"
- Description: "Главный актер театра"
- Photo: загрузите изображение
- Photo Square: загрузите квадратное изображение
- Photo Thumbnail: загрузите миниатюру

#### Event (Событие)
- Title: "Спектакль 'Гамлет'"
- Subtitle: "Трагедия в 5 актах"
- Poster: загрузите постер
- Poster Square: загрузите квадратный постер
- Poster Wide: загрузите широкий постер
- Poster Mobile: загрузите мобильный постер

#### Event Details (Детали события)
- YM: "12345678" (ID Яндекс.Метрики)
- Cover Image: загрузите обложку
- Cover Wide: загрузите широкую обложку
- Cover Mobile: загрузите мобильную обложку
- Description: "Описание спектакля..."

#### Schedule (Расписание)
- Ticket URL: "https://tickets.ru/event/123"
- Place: "Основная сцена"
- Date Time: "2024-01-15T19:00:00.000Z"
- Price: "1500 руб"

#### Role (Роль)
- Role: "Гамлет"
- Character Photo: загрузите фото в роли
- Character Photo Square: загрузите квадратное фото в роли
- Actor: свяжите с актером

#### Album Element (Элемент альбома)
- Title: "Сцена из спектакля"
- Subtitle: "Акт 1, сцена 1"
- Original Image: загрузите оригинальное изображение
- Carousel Image: загрузите изображение для карусели
- Preview Image: загрузите превью
- Gallery Image: загрузите изображение для галереи

#### Album (Альбом)
- Title: "Фото со спектакля"
- Key: "hamlet_photos"
- Elements: свяжите с элементами альбома

### 5. Запуск фронтенда
```bash
npm run dev
```

### 6. Проверка работы

#### Главная страница (http://localhost:3000)
1. ✅ Проверьте загрузку мест проведения
2. ✅ Проверьте отображение событий с постерами
3. ✅ Проверьте карусель проектов
4. ✅ Проверьте секцию актеров
5. ✅ Проверьте отображение изображений

#### Страница события (http://localhost:3000/[venueId]/[eventId])
1. ✅ Проверьте загрузку деталей события
2. ✅ Проверьте отображение обложки в заголовке
3. ✅ Проверьте расписание показов
4. ✅ Проверьте актерский состав
5. ✅ Проверьте превью и галерею
6. ✅ Проверьте другие мероприятия
7. ✅ Проверьте метаданные (title, description, og:image)

## Возможные проблемы

### CORS ошибки
Если возникают CORS ошибки, добавьте в конфигурацию Strapi:
```javascript
// config/middlewares.ts
export default [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### Проблемы с изображениями
1. Проверьте права доступа к медиа файлам
2. Убедитесь, что URL изображений корректные
3. Проверьте, что Strapi доступен по указанному адресу

### Проблемы с API
1. Проверьте правильность API Token
2. Убедитесь, что Content Types созданы
3. Проверьте права доступа для API

### Проблемы с маршрутизацией
1. Убедитесь, что venueId и eventId соответствуют ID в Strapi
2. Проверьте, что связи между Content Types настроены правильно

## Отладка

### Логи Strapi
```bash
cd strapi-backend
npm run develop -- --debug
```

### Логи Next.js
```bash
npm run dev
```

### Проверка API
```bash
# Проверка мест проведения
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:1337/api/venues

# Проверка событий
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:1337/api/events

# Проверка актеров
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:1337/api/actors
```

### Проверка изображений
```bash
# Проверка медиа файлов
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:1337/api/upload/files
```

## Следующие шаги

После успешного тестирования:
1. ✅ Создайте все необходимые Content Types
2. ✅ Настройте права доступа
3. 🔄 Добавьте кэширование
4. 🔄 Оптимизируйте запросы
5. 🔄 Настройте продакшен окружение
6. 🔄 Добавьте обработку ошибок
7. 🔄 Оптимизируйте изображения
8. 🔄 Добавьте SEO оптимизацию 
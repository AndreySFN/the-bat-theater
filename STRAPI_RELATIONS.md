# Связи в Strapi - Документация

## Созданные Content Types

### 1. Actor (Актер)
- **Поля:**
  - `name` (string, required) - Имя актера
  - `description` (text) - Описание
  - `photo` (media) - Фото актера
  - `photoSquare` (media) - Квадратное фото
  - `photoThumbnail` (media) - Миниатюра
  - `roles` (relation) - Роли актера

- **Связи:**
  - `roles` → `Role` (oneToMany, mappedBy: "actor")

### 2. Role (Роль)
- **Поля:**
  - `role` (string) - Название роли
  - `actor` (relation) - Актер
  - `characterPhoto` (media) - Фото в роли
  - `characterPhotoSquare` (media) - Квадратное фото в роли
  - `eventDetail` (relation) - Детали события

- **Связи:**
  - `actor` → `Actor` (manyToOne, inversedBy: "roles")
  - `eventDetail` → `EventDetail` (manyToOne, inversedBy: "roles")

### 3. Schedule (Расписание)
- **Поля:**
  - `ticketUrl` (string, required) - Ссылка на билеты
  - `place` (string, required) - Место проведения
  - `dateTime` (datetime, required) - Дата и время
  - `price` (string, required) - Цена
  - `eventDetail` (relation) - Детали события

- **Связи:**
  - `eventDetail` → `EventDetail` (manyToOne, inversedBy: "schedule")

### 4. EventDetail (Детали события)
- **Поля:**
  - `ym` (string) - ID Яндекс.Метрики
  - `coverImage` (media) - Обложка
  - `coverWide` (media) - Широкая обложка
  - `coverMobile` (media) - Мобильная обложка
  - `description` (richtext) - Описание
  - `schedule` (relation) - Расписание
  - `roles` (relation) - Роли
  - `previews` (relation) - Превью
  - `metadata` (relation) - SEO метаданные
  - `event` (relation) - Событие

- **Связи:**
  - `schedule` → `Schedule` (oneToMany, mappedBy: "eventDetail")
  - `roles` → `Role` (oneToMany, mappedBy: "eventDetail")
  - `previews` → `Album` (manyToOne, inversedBy: "eventDetails")
  - `metadata` → `SEOMetadata` (manyToOne, inversedBy: "eventDetails")
  - `event` → `Event` (oneToOne, inversedBy: "eventDetails")

### 5. Event (Событие)
- **Поля:**
  - `title` (string, required) - Название
  - `subtitle` (string) - Подзаголовок
  - `poster` (media) - Постер
  - `posterSquare` (media) - Квадратный постер
  - `posterWide` (media) - Широкий постер
  - `posterMobile` (media) - Мобильный постер
  - `eventDetails` (relation) - Детали события
  - `venue` (relation) - Место проведения

- **Связи:**
  - `eventDetails` → `EventDetail` (oneToOne, mappedBy: "event")
  - `venue` → `Venue` (manyToOne, inversedBy: "events")

### 6. Venue (Место проведения)
- **Поля:**
  - `title` (string, required) - Название
  - `label` (string, required) - Метка
  - `address` (string, required) - Адрес
  - `mapUrl` (string) - Ссылка на карту
  - `events` (relation) - События

- **Связи:**
  - `events` → `Event` (oneToMany, mappedBy: "venue")

### 7. AlbumElement (Элемент альбома)
- **Поля:**
  - `title` (string) - Заголовок
  - `subtitle` (string) - Подзаголовок
  - `originalImage` (media, required) - Оригинальное изображение
  - `carouselImage` (media) - Изображение для карусели
  - `previewImage` (media) - Превью
  - `galleryImage` (media) - Изображение для галереи
  - `albums` (relation) - Альбомы

- **Связи:**
  - `albums` → `Album` (manyToMany, inversedBy: "elements", mappedBy: "albumElements")

### 8. Album (Альбом)
- **Поля:**
  - `title` (string) - Название
  - `key` (string, required, unique) - Ключ
  - `elements` (relation) - Элементы
  - `eventDetails` (relation) - Детали событий

- **Связи:**
  - `elements` → `AlbumElement` (manyToMany, inversedBy: "albums", mappedBy: "elements")
  - `eventDetails` → `EventDetail` (oneToMany, mappedBy: "previews")

### 9. SEOMetadata (SEO метаданные)
- **Поля:**
  - `title` (string) - Заголовок
  - `description` (text) - Описание
  - `ogImage` (media) - Open Graph изображение
  - `ogImageSquare` (media) - Квадратное OG изображение
  - `twitterImage` (media) - Twitter изображение
  - `alt` (string) - Alt текст
  - `eventDetails` (relation) - Детали событий

- **Связи:**
  - `eventDetails` → `EventDetail` (oneToMany, mappedBy: "metadata")

## Схема связей

```
Venue (1) ←→ (N) Event (1) ←→ (1) EventDetail (1) ←→ (N) Schedule
                                    ↓
                              (1) ←→ (N) Role (N) ←→ (1) Actor
                                    ↓
                              (N) ←→ (1) Album (N) ←→ (M) AlbumElement
                                    ↓
                              (N) ←→ (1) SEOMetadata
```

## Особенности связей

### Связь многие-ко-многим (Album ↔ AlbumElement)
- **Album.elements** → AlbumElement (manyToMany, inversedBy: "albums", mappedBy: "elements")
- **AlbumElement.albums** → Album (manyToMany, inversedBy: "albums", mappedBy: "albumElements")

### Связь один-к-одному (Event ↔ EventDetail)
- **Event.eventDetails** → EventDetail (oneToOne, mappedBy: "event")
- **EventDetail.event** → Event (oneToOne, inversedBy: "eventDetails")

### Связь один-ко-многим (Venue ↔ Event)
- **Venue.events** → Event (oneToMany, mappedBy: "venue")
- **Event.venue** → Venue (manyToOne, inversedBy: "events")

## API Endpoints

После создания Content Types автоматически генерируются следующие API endpoints:

- `GET /api/actors` - Получить всех актеров
- `GET /api/actors/:id` - Получить актера по ID
- `GET /api/events` - Получить все события
- `GET /api/events/:id` - Получить событие по ID
- `GET /api/venues` - Получить все места проведения
- `GET /api/venues/:id` - Получить место проведения по ID
- `GET /api/albums` - Получить все альбомы
- `GET /api/album-elements` - Получить все элементы альбомов
- `GET /api/roles` - Получить все роли
- `GET /api/schedules` - Получить все расписания
- `GET /api/event-details` - Получить все детали событий
- `GET /api/seo-metadata` - Получить все SEO метаданные

## Примеры запросов с populate

### Получить событие с деталями и связанными данными
```bash
GET /api/events/1?populate[eventDetails][populate][schedule]=true&populate[eventDetails][populate][roles][populate][actor]=true&populate[eventDetails][populate][previews][populate][elements]=true
```

### Получить место проведения с событиями
```bash
GET /api/venues/1?populate[events][populate][poster]=true
```

### Получить альбом с элементами
```bash
GET /api/albums/1?populate[elements][populate][originalImage]=true
``` 
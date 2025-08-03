# Руководство по миграции с MongoDB на Strapi

## Обзор

Это руководство поможет вам перенести ваш театральный проект с MongoDB на Strapi CMS.

## Этапы миграции

### 1. Подготовка Strapi проекта

1. **Установка зависимостей:**
   ```bash
   cd strapi-backend
   npm install
   ```

2. **Настройка переменных окружения:**
   ```bash
   cp env.example .env
   ```
   
   Отредактируйте `.env` файл, добавив ваши секретные ключи:
   ```env
   APP_KEYS=your-random-key-1,your-random-key-2
   API_TOKEN_SALT=your-random-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   JWT_SECRET=your-jwt-secret
   ```

3. **Запуск Strapi:**
   ```bash
   npm run develop
   ```

4. **Создание администратора:**
   - Откройте http://localhost:1337/admin
   - Создайте администратора
   - Создайте API Token в Settings > API Tokens

### 2. Миграция данных

1. **Установка зависимостей для миграции:**
   ```bash
   npm install mongoose axios
   ```

2. **Настройка переменных для миграции:**
   ```bash
   export MONGODB_URI="your-mongodb-connection-string"
   export STRAPI_URL="http://localhost:1337"
   export STRAPI_TOKEN="your-strapi-api-token"
   ```

3. **Запуск миграции:**
   ```bash
   node migrate-to-strapi.js
   ```

### 3. Обновление фронтенда

#### Создание Strapi клиента

Создайте файл `src/lib/strapi.ts`:

```typescript
import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

const strapi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Authorization': `Bearer ${STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default strapi;
```

#### Обновление типов данных

Создайте файл `src/lib/strapi-types.ts`:

```typescript
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Image {
  src: string;
  blurDataUrl: string;
}

export interface Actor {
  name: string;
  description?: string;
  image?: StrapiData<Image>;
}

export interface Schedule {
  ticketUrl: string;
  place: string;
  dateTime: string;
  price: string;
}

export interface Metadata {
  title?: string;
  description?: string;
  image?: StrapiData<Image>;
  width?: number;
  height?: number;
  alt?: string;
}

export interface AlbumElement {
  title?: string;
  subtitle?: string;
  image: StrapiData<Image>;
}

export interface Album {
  title?: string;
  key: string;
  elements: StrapiData<AlbumElement>[];
}

export interface Role {
  actor: StrapiData<Actor>;
  image?: StrapiData<Image>;
  role?: string;
}

export interface EventDetails {
  ym?: string;
  coverImg?: StrapiData<Image>;
  description?: string;
  schedule: StrapiData<Schedule>[];
  roles: StrapiData<Role>[];
  previews?: StrapiData<Album>;
  metadata?: StrapiData<Metadata>;
}

export interface Event {
  title: string;
  subtitle?: string;
  posterImg?: StrapiData<Image>;
  eventDetails: StrapiData<EventDetails>;
}

export interface Venue {
  title: string;
  label: string;
  mapUrl?: string;
  events: StrapiData<Event>[];
  address: string;
}
```

#### Обновление сервисов данных

Создайте файл `src/lib/strapi-services.ts`:

```typescript
import strapi from './strapi';
import { StrapiResponse, StrapiData, Venue, Event, Actor, AlbumElement } from './strapi-types';

export const strapiServices = {
  // Получение всех мест проведения с событиями
  async getVenues(): Promise<StrapiData<Venue>[]> {
    const response = await strapi.get<StrapiResponse<StrapiData<Venue>[]>>('/venues', {
      params: {
        populate: {
          events: {
            populate: {
              posterImg: true
            }
          }
        }
      }
    });
    return response.data.data;
  },

  // Получение места проведения по ID
  async getVenueById(id: string): Promise<StrapiData<Venue>> {
    const response = await strapi.get<StrapiResponse<StrapiData<Venue>>>(`/venues/${id}`, {
      params: {
        populate: {
          events: {
            populate: {
              posterImg: true
            }
          }
        }
      }
    });
    return response.data.data;
  },

  // Получение события по ID
  async getEventById(id: string): Promise<StrapiData<Event>> {
    const response = await strapi.get<StrapiResponse<StrapiData<Event>>>(`/events/${id}`, {
      params: {
        populate: {
          posterImg: true,
          eventDetails: {
            populate: {
              coverImg: true,
              schedule: true,
              roles: {
                populate: {
                  image: true,
                  actor: {
                    populate: {
                      image: true
                    }
                  }
                }
              },
              previews: {
                populate: {
                  elements: {
                    populate: {
                      image: true
                    }
                  }
                }
              },
              metadata: {
                populate: {
                  image: true
                }
              }
            }
          }
        }
      }
    });
    return response.data.data;
  },

  // Получение всех актеров
  async getActors(): Promise<StrapiData<Actor>[]> {
    const response = await strapi.get<StrapiResponse<StrapiData<Actor>[]>>('/actors', {
      params: {
        populate: {
          image: true
        }
      }
    });
    return response.data.data;
  },

  // Получение элементов альбома
  async getAlbumElements(): Promise<StrapiData<AlbumElement>[]> {
    const response = await strapi.get<StrapiResponse<StrapiData<AlbumElement>[]>>('/album-elements', {
      params: {
        populate: {
          image: true
        }
      }
    });
    return response.data.data;
  }
};
```

### 4. Обновление компонентов

#### Обновление главной страницы

Обновите `src/app/page.tsx`:

```typescript
import { strapiServices } from '@/lib/strapi-services';
import { StrapiData, Venue, Actor, AlbumElement } from '@/lib/strapi-types';

export default async function MainPage() {
  const venues = await strapiServices.getVenues();
  const actors = await strapiServices.getActors();
  const albumElements = await strapiServices.getAlbumElements();

  // Преобразование данных для совместимости
  const transformedVenues = venues.map(venue => ({
    _id: venue.id,
    title: venue.attributes.title,
    label: venue.attributes.label,
    mapUrl: venue.attributes.mapUrl,
    address: venue.attributes.address,
    events: venue.attributes.events.map(event => ({
      _id: event.id,
      title: event.attributes.title,
      subtitle: event.attributes.subtitle,
      posterImg: event.attributes.posterImg ? {
        _id: event.attributes.posterImg.id,
        src: event.attributes.posterImg.attributes.src,
        blurDataUrl: event.attributes.posterImg.attributes.blurDataUrl
      } : null
    }))
  }));

  const transformedActors = actors.map(actor => ({
    _id: actor.id,
    name: actor.attributes.name,
    description: actor.attributes.description,
    image: actor.attributes.image ? {
      _id: actor.attributes.image.id,
      src: actor.attributes.image.attributes.src,
      blurDataUrl: actor.attributes.image.attributes.blurDataUrl
    } : null
  }));

  // ... остальной код остается без изменений
}
```

#### Обновление страницы события

Обновите `src/app/[venueId]/[eventId]/page.tsx`:

```typescript
import { strapiServices } from '@/lib/strapi-services';

export default async function EventPage({ params }: Props) {
  const { venueId, eventId } = params;
  
  const venue = await strapiServices.getVenueById(venueId);
  const event = await strapiServices.getEventById(eventId);

  // Преобразование данных для совместимости
  const transformedEvent = {
    _id: event.id,
    title: event.attributes.title,
    subtitle: event.attributes.subtitle,
    posterImg: event.attributes.posterImg ? {
      _id: event.attributes.posterImg.id,
      src: event.attributes.posterImg.attributes.src,
      blurDataUrl: event.attributes.posterImg.attributes.blurDataUrl
    } : null,
    eventDetails: {
      _id: event.attributes.eventDetails.id,
      ym: event.attributes.eventDetails.attributes.ym,
      coverImg: event.attributes.eventDetails.attributes.coverImg ? {
        _id: event.attributes.eventDetails.attributes.coverImg.id,
        src: event.attributes.eventDetails.attributes.coverImg.attributes.src,
        blurDataUrl: event.attributes.eventDetails.attributes.coverImg.attributes.blurDataUrl
      } : null,
      description: event.attributes.eventDetails.attributes.description,
      schedule: event.attributes.eventDetails.attributes.schedule.map(schedule => ({
        _id: schedule.id,
        ticketUrl: schedule.attributes.ticketUrl,
        place: schedule.attributes.place,
        dateTime: schedule.attributes.dateTime,
        price: schedule.attributes.price
      })),
      roles: event.attributes.eventDetails.attributes.roles.map(role => ({
        _id: role.id,
        role: role.attributes.role,
        actor: {
          _id: role.attributes.actor.id,
          name: role.attributes.actor.attributes.name,
          description: role.attributes.actor.attributes.description,
          image: role.attributes.actor.attributes.image ? {
            _id: role.attributes.actor.attributes.image.id,
            src: role.attributes.actor.attributes.image.attributes.src,
            blurDataUrl: role.attributes.actor.attributes.image.attributes.blurDataUrl
          } : null
        },
        image: role.attributes.image ? {
          _id: role.attributes.image.id,
          src: role.attributes.image.attributes.src,
          blurDataUrl: role.attributes.image.attributes.blurDataUrl
        } : null
      })),
      previews: event.attributes.eventDetails.attributes.previews ? {
        _id: event.attributes.eventDetails.attributes.previews.id,
        title: event.attributes.eventDetails.attributes.previews.attributes.title,
        key: event.attributes.eventDetails.attributes.previews.attributes.key,
        elements: event.attributes.eventDetails.attributes.previews.attributes.elements.map(element => ({
          _id: element.id,
          title: element.attributes.title,
          subtitle: element.attributes.subtitle,
          image: {
            _id: element.attributes.image.id,
            src: element.attributes.image.attributes.src,
            blurDataUrl: element.attributes.image.attributes.blurDataUrl
          }
        }))
      } : null
    }
  };

  // ... остальной код остается без изменений
}
```

### 5. Обновление переменных окружения

Обновите `.env.local`:

```env
# Удалите MONGODB_URI
# MONGODB_URI=your-mongodb-uri

# Добавьте Strapi переменные
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your-strapi-api-token
```

### 6. Удаление MongoDB зависимостей

```bash
npm uninstall mongoose mongodb
```

### 7. Тестирование

1. Запустите Strapi: `cd strapi-backend && npm run develop`
2. Запустите Next.js: `npm run dev`
3. Проверьте все страницы и функциональность

## Преимущества миграции на Strapi

1. **CMS интерфейс** - удобное управление контентом
2. **REST API** - готовые эндпоинты
3. **Роли и права** - встроенная система авторизации
4. **Медиа библиотека** - управление изображениями
5. **Вебхуки** - автоматизация процессов
6. **Плагины** - расширяемость функционала

## Возможные проблемы и решения

1. **CORS ошибки** - настройте CORS в Strapi
2. **Проблемы с изображениями** - проверьте права доступа к медиа
3. **Медленные запросы** - используйте кэширование и пагинацию

## Следующие шаги

1. Настройте права доступа в Strapi
2. Добавьте кэширование для API
3. Настройте CDN для изображений
4. Добавьте мониторинг и логирование 
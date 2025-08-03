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

// В Strapi v5 данные приходят напрямую, без обертки attributes
export interface StrapiData<T> {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Все поля из T добавляются напрямую
  [key: string]: any;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    large?: {
      url: string;
      width: number;
      height: number;
    };
  };
  url: string;
  previewUrl?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageComponent {
  original?: StrapiMedia;
  square?: StrapiMedia;
  thumbnail?: StrapiMedia;
  wide?: StrapiMedia;
  mobile?: StrapiMedia;
  carousel?: StrapiMedia;
  preview?: StrapiMedia;
  gallery?: StrapiMedia;
  alt?: string;
}

export interface Actor {
  name: string;
  description?: string;
  photo?: StrapiMedia;
  photoSquare?: StrapiMedia;
  photoThumbnail?: StrapiMedia;
}

export interface Schedule {
  ticketUrl: string;
  place: string;
  dateTime: string;
  price: string;
}

export interface Album {
  title?: string;
  subtitle?: string;
  key: string;
  originalImage: StrapiMedia;
  carouselImage?: StrapiMedia;
  previewImage?: StrapiMedia;
  galleryImage?: StrapiMedia;
}

export interface Role {
  actor: Actor;
  characterPhoto?: StrapiMedia;
  characterPhotoSquare?: StrapiMedia;
  role?: string;
}

export interface Event {
  title: string;
  subtitle?: string;
  poster?: StrapiMedia;
  posterSquare?: StrapiMedia;
  posterWide?: StrapiMedia;
  posterMobile?: StrapiMedia;
  ym?: string;
  coverImage?: StrapiMedia;
  coverWide?: StrapiMedia;
  coverMobile?: StrapiMedia;
  description?: string;
  schedule: Schedule[];
  roles: Role[];
  previews?: Album;
  venue: Venue;
}

export interface Venue {
  title: string;
  label: string;
  mapUrl?: string;
  events: Event[];
  address: string;
} 
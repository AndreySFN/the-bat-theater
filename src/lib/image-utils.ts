import { StrapiData, StrapiMedia } from './strapi-types';

// Получение полного URL изображения (добавляет домен Strapi)
export const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  
  // Если URL уже полный, возвращаем как есть
  if (url.startsWith('http')) {
    return url;
  }
  
  // Добавляем домен Strapi
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl}${url}`;
};

// Получение URL изображения с учетом размера
export const getImageUrl = (
  media: StrapiData<StrapiMedia> | null | undefined,
  size: 'original' | 'thumbnail' | 'small' | 'medium' | 'large' = 'original'
): string => {
  if (!media?.attributes) return '';
  
  const { attributes } = media;
  
  if (size === 'original') {
    return getFullImageUrl(attributes.url);
  }
  
  const formatUrl = attributes.formats?.[size]?.url;
  return getFullImageUrl(formatUrl || attributes.url);
};

// Получение размеров изображения
export const getImageDimensions = (
  media: StrapiData<StrapiMedia> | null | undefined,
  size: 'original' | 'thumbnail' | 'small' | 'medium' | 'large' = 'original'
): { width: number; height: number } => {
  if (!media?.attributes) return { width: 0, height: 0 };
  
  const { attributes } = media;
  
  if (size === 'original') {
    return { width: attributes.width, height: attributes.height };
  }
  
  const format = attributes.formats?.[size];
  return {
    width: format?.width || attributes.width,
    height: format?.height || attributes.height
  };
};

// Получение alt текста
export const getImageAlt = (media: StrapiData<StrapiMedia> | null | undefined): string => {
  if (!media?.attributes) return '';
  return media.attributes.alternativeText || media.attributes.name || '';
};

// Получение blur data URL (используем thumbnail как placeholder)
export const getBlurDataUrl = (
  media: StrapiData<StrapiMedia> | null | undefined
): string => {
  if (!media?.attributes) return '';
  
  const thumbnailUrl = media.attributes.formats?.thumbnail?.url;
  if (thumbnailUrl) {
    return getFullImageUrl(thumbnailUrl);
  }
  
  return '';
};

// Выбор оптимального изображения для контекста
export const getImageForContext = (
  media: StrapiData<StrapiMedia> | null | undefined,
  context: 'mobile' | 'tablet' | 'desktop' | 'thumbnail' | 'carousel' | 'gallery'
): { url: string; width: number; height: number; alt: string } => {
  if (!media) {
    return { url: '', width: 0, height: 0, alt: '' };
  }

  let size: 'original' | 'thumbnail' | 'small' | 'medium' | 'large' = 'original';
  
  switch (context) {
    case 'mobile':
      size = 'medium';
      break;
    case 'tablet':
      size = 'large';
      break;
    case 'desktop':
      size = 'original';
      break;
    case 'thumbnail':
      size = 'thumbnail';
      break;
    case 'carousel':
      size = 'medium';
      break;
    case 'gallery':
      size = 'large';
      break;
  }

  const url = getImageUrl(media, size);
  const dimensions = getImageDimensions(media, size);
  const alt = getImageAlt(media);

  return { url, ...dimensions, alt };
}; 
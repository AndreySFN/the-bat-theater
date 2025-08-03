// Получение полного URL изображения
export const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl}${url}`;
};

// Получение URL изображения из Strapi Media
export const getImageUrlFromStrapi = (media: any): string => {
  if (!media?.attributes?.url) return '';
  return getFullImageUrl(media.attributes.url);
};

// Получение blur URL из Strapi Media
export const getBlurUrlFromStrapi = (media: any): string => {
  if (!media?.attributes) return '';
  
  const thumbnailUrl = media.attributes.formats?.thumbnail?.url;
  if (thumbnailUrl) {
    return getFullImageUrl(thumbnailUrl);
  }
  
  return getFullImageUrl(media.attributes.url);
};

// Получение alt текста из Strapi Media
export const getAltTextFromStrapi = (media: any): string => {
  if (!media?.attributes) return '';
  return media.attributes.alternativeText || media.attributes.name || '';
}; 
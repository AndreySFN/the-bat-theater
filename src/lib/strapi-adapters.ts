// Получение полного URL изображения
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl}${url}`;
};

// Преобразование Strapi Media в старый формат Image
export const adaptStrapiMediaToImage = (media: any) => {
  if (!media) return null;

  return {
    _id: media.id.toString(),
    src: getFullImageUrl(media.url),
    blurDataUrl: getFullImageUrl(
      media.formats?.thumbnail?.url || media.url
    ),
  };
};

// Адаптер для Actor
export const adaptStrapiActorToLegacy = (actor: any) => {
  return {
    _id: actor.id.toString(),
    name: actor.name,
    description: actor.description,
    image: adaptStrapiMediaToImage(
      actor.photoSquare || actor.photo
    ),
  };
};

// Адаптер для Event (базовый)
export const adaptStrapiEventBasicToLegacy = (event: any) => {
  return {
    _id: event.id.toString(),
    title: event.title,
    subtitle: event.subtitle,
    posterImg: adaptStrapiMediaToImage(
      event.posterSquare || event.poster
    ),
  };
};

// Адаптер для Album
export const adaptStrapiAlbumToLegacy = (album: any) => {
  return {
    _id: album.id.toString(),
    title: album.title,
    subtitle: album.subtitle,
    image: adaptStrapiMediaToImage(
      album.previewImage || album.originalImage
    ),
  };
};

// Адаптер для Venue
export const adaptStrapiVenueToLegacy = (venue: any) => {
    console.log(venue)
    return {
    _id: venue.id.toString(),
    title: venue.title,
    label: venue.label,
    mapUrl: venue.mapUrl,
    address: venue.address,
    events: venue.events?.map(adaptStrapiEventToLegacy) || [],
  };
};

// Адаптер для EventDetails
export const adaptStrapiEventDetailsToLegacy = (eventDetails: any) => {
  return {
    _id: eventDetails.id.toString(),
    ym: eventDetails.ym,
    coverImg: adaptStrapiMediaToImage(eventDetails.coverImage),
    description: eventDetails.description,
    schedule:
      eventDetails.schedule?.map((schedule: any) => ({
        _id: schedule.id.toString(),
        ticketUrl: schedule.ticketUrl,
        place: schedule.place,
        dateTime: schedule.dateTime,
        price: schedule.price,
      })) || [],
    roles:
      eventDetails.roles?.map((role: any) => ({
        _id: role.id.toString(),
        role: role.role,
        actor: adaptStrapiActorToLegacy(role.actor),
        image: adaptStrapiMediaToImage(
          role.characterPhotoSquare || role.characterPhoto
        ),
      })) || [],
    previews: eventDetails.previews
      ? {
          _id: eventDetails.previews.id.toString(),
          title: eventDetails.previews.title,
          key: eventDetails.previews.key,
          elements: [adaptStrapiAlbumToLegacy(eventDetails.previews)],
        }
      : null,
  };
};

// Полный адаптер для Event
export const adaptStrapiEventToLegacy = (event: any) => {
  return {
    _id: event.id.toString(),
    title: event.title,
    subtitle: event.subtitle,
    posterImg: adaptStrapiMediaToImage(
      event.posterSquare || event.poster
    ),
    ym: event.ym,
    coverImg: adaptStrapiMediaToImage(event.coverImage),
    description: event.description,
    schedule:
      event.schedule?.map((schedule: any) => ({
        _id: schedule.id.toString(),
        ticketUrl: schedule.ticketUrl,
        place: schedule.place,
        dateTime: schedule.dateTime,
        price: schedule.price,
      })) || [],
    roles:
      event.roles?.map((role: any) => ({
        _id: role.id.toString(),
        role: role.role,
        actor: adaptStrapiActorToLegacy(role.actor),
        image: adaptStrapiMediaToImage(
          role.characterPhotoSquare || role.characterPhoto
        ),
      })) || [],
    previews: event.previews
      ? {
          _id: event.previews.id.toString(),
          title: event.previews.title,
          key: event.previews.key,
          elements: [adaptStrapiAlbumToLegacy(event.previews)],
        }
      : null,
  };
};

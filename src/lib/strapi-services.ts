import strapi from './strapi';
import {
  StrapiResponse,
  StrapiData,
  Venue,
  Event,
  Actor,
  Album,
} from './strapi-types';

export const strapiServices = {
  // Получение всех мест проведения с событиями
  async getVenues(): Promise<StrapiData<Venue>[]> {
    try {
      const response = await strapi.get<StrapiResponse<StrapiData<Venue>[]>>(
        '/venues',
        {
          params: {
            populate: {
              events: {
                populate: {
                  poster: true,
                  posterSquare: true,
                  posterWide: true,
                  posterMobile: true,
                },
              },
            },
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching venues:', error);
      return [];
    }
  },

  // Получение места проведения по ID
  async getVenueById(id: string): Promise<StrapiData<Venue> | null> {
    try {
      const response = await strapi.get<StrapiResponse<StrapiData<Venue>>>(
        `/venues/${id}`,
        {
          params: {
            populate: {
              events: {
                populate: {
                  poster: true,
                  posterSquare: true,
                  posterWide: true,
                  posterMobile: true,
                },
              },
            },
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching venue by id:', error);
      return null;
    }
  },

  // Получение события по ID
  async getEventById(id: string): Promise<StrapiData<Event> | null> {
    try {
      const response = await strapi.get<StrapiResponse<StrapiData<Event>>>(
        `/events/${id}`,
        {
          params: {
            populate: {
              poster: true,
              posterSquare: true,
              posterWide: true,
              posterMobile: true,
              coverImage: true,
              coverWide: true,
              coverMobile: true,
              venue: true,
              schedule: true,
              roles: {
                populate: {
                  characterPhoto: true,
                  characterPhotoSquare: true,
                  actor: {
                    populate: {
                      photo: true,
                      photoSquare: true,
                      photoThumbnail: true,
                    },
                  },
                },
              },
              previews: {
                populate: {
                  originalImage: true,
                  carouselImage: true,
                  previewImage: true,
                  galleryImage: true,
                },
              },
            },
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching event by id:', error);
      return null;
    }
  },

  // Получение всех актеров
  async getActors(): Promise<StrapiData<Actor>[]> {
    try {
      const response = await strapi.get<StrapiResponse<StrapiData<Actor>[]>>(
        '/actors',
        {
          params: {
            populate: {
              photo: true,
              photoSquare: true,
              photoThumbnail: true,
            },
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching actors:', error);
      return [];
    }
  },

  // Получение альбомов
  async getAlbums(): Promise<StrapiData<Album>[]> {
    try {
      const response = await strapi.get<StrapiResponse<StrapiData<Album>[]>>(
        '/albums',
        {
          params: {
            populate: {
              originalImage: true,
              carouselImage: true,
              previewImage: true,
              galleryImage: true,
            },
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching albums:', error);
      return [];
    }
  },
};

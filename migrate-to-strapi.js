const mongoose = require('mongoose');
const axios = require('axios');

// Конфигурация
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database';
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || 'your-strapi-token';

// Подключение к MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Функция для создания записи в Strapi
async function createStrapiRecord(contentType, data) {
  try {
    const response = await axios.post(`${STRAPI_URL}/api/${contentType}`, {
      data: data
    }, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error creating ${contentType}:`, error.response?.data || error.message);
    return null;
  }
}

// Миграция изображений
async function migrateImages() {
  console.log('Migrating images...');
  const ImageModel = mongoose.model('images', new mongoose.Schema({
    src: String,
    blurDataUrl: String
  }));

  const images = await ImageModel.find({});
  const imageMap = new Map();

  for (const image of images) {
    const strapiImage = await createStrapiRecord('images', {
      src: image.src,
      blurDataUrl: image.blurDataUrl
    });
    
    if (strapiImage) {
      imageMap.set(image._id.toString(), strapiImage.id);
      console.log(`Migrated image: ${image.src}`);
    }
  }

  return imageMap;
}

// Миграция актеров
async function migrateActors(imageMap) {
  console.log('Migrating actors...');
  const ActorModel = mongoose.model('actors', new mongoose.Schema({
    name: String,
    description: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'images' }
  }));

  const actors = await ActorModel.find({}).populate('image');
  const actorMap = new Map();

  for (const actor of actors) {
    const strapiActor = await createStrapiRecord('actors', {
      name: actor.name,
      description: actor.description,
      image: actor.image ? imageMap.get(actor.image._id.toString()) : null
    });

    if (strapiActor) {
      actorMap.set(actor._id.toString(), strapiActor.id);
      console.log(`Migrated actor: ${actor.name}`);
    }
  }

  return actorMap;
}

// Миграция расписания
async function migrateSchedules() {
  console.log('Migrating schedules...');
  const ScheduleModel = mongoose.model('schedules', new mongoose.Schema({
    ticketUrl: String,
    place: String,
    dateTime: Date,
    price: String
  }));

  const schedules = await ScheduleModel.find({});
  const scheduleMap = new Map();

  for (const schedule of schedules) {
    const strapiSchedule = await createStrapiRecord('schedules', {
      ticketUrl: schedule.ticketUrl,
      place: schedule.place,
      dateTime: schedule.dateTime,
      price: schedule.price
    });

    if (strapiSchedule) {
      scheduleMap.set(schedule._id.toString(), strapiSchedule.id);
      console.log(`Migrated schedule: ${schedule.place} - ${schedule.dateTime}`);
    }
  }

  return scheduleMap;
}

// Миграция метаданных
async function migrateMetadata(imageMap) {
  console.log('Migrating metadata...');
  const MetadataModel = mongoose.model('metadata', new mongoose.Schema({
    title: String,
    description: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'images' },
    width: Number,
    height: Number,
    alt: String
  }));

  const metadata = await MetadataModel.find({}).populate('image');
  const metadataMap = new Map();

  for (const meta of metadata) {
    const strapiMetadata = await createStrapiRecord('metadata', {
      title: meta.title,
      description: meta.description,
      image: meta.image ? imageMap.get(meta.image._id.toString()) : null,
      width: meta.width,
      height: meta.height,
      alt: meta.alt
    });

    if (strapiMetadata) {
      metadataMap.set(meta._id.toString(), strapiMetadata.id);
      console.log(`Migrated metadata: ${meta.title}`);
    }
  }

  return metadataMap;
}

// Миграция элементов альбома
async function migrateAlbumElements(imageMap) {
  console.log('Migrating album elements...');
  const AlbumElementModel = mongoose.model('album_elements', new mongoose.Schema({
    title: String,
    subtitle: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'images' }
  }));

  const albumElements = await AlbumElementModel.find({}).populate('image');
  const albumElementMap = new Map();

  for (const element of albumElements) {
    const strapiElement = await createStrapiRecord('album-elements', {
      title: element.title,
      subtitle: element.subtitle,
      image: element.image ? imageMap.get(element.image._id.toString()) : null
    });

    if (strapiElement) {
      albumElementMap.set(element._id.toString(), strapiElement.id);
      console.log(`Migrated album element: ${element.title}`);
    }
  }

  return albumElementMap;
}

// Миграция альбомов
async function migrateAlbums(albumElementMap) {
  console.log('Migrating albums...');
  const AlbumModel = mongoose.model('albums', new mongoose.Schema({
    title: String,
    key: String,
    elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'album_elements' }]
  }));

  const albums = await AlbumModel.find({}).populate('elements');
  const albumMap = new Map();

  for (const album of albums) {
    const elementIds = album.elements.map(el => albumElementMap.get(el._id.toString())).filter(Boolean);
    
    const strapiAlbum = await createStrapiRecord('albums', {
      title: album.title,
      key: album.key,
      elements: elementIds
    });

    if (strapiAlbum) {
      albumMap.set(album._id.toString(), strapiAlbum.id);
      console.log(`Migrated album: ${album.title}`);
    }
  }

  return albumMap;
}

// Миграция ролей
async function migrateRoles(actorMap, imageMap) {
  console.log('Migrating roles...');
  const RoleModel = mongoose.model('roles', new mongoose.Schema({
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'actors' },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'images' },
    role: String
  }));

  const roles = await RoleModel.find({}).populate(['actor', 'image']);
  const roleMap = new Map();

  for (const role of roles) {
    const strapiRole = await createStrapiRecord('roles', {
      actor: role.actor ? actorMap.get(role.actor._id.toString()) : null,
      image: role.image ? imageMap.get(role.image._id.toString()) : null,
      role: role.role
    });

    if (strapiRole) {
      roleMap.set(role._id.toString(), strapiRole.id);
      console.log(`Migrated role: ${role.role}`);
    }
  }

  return roleMap;
}

// Миграция деталей событий
async function migrateEventDetails(imageMap, scheduleMap, roleMap, albumMap, metadataMap) {
  console.log('Migrating event details...');
  const EventDetailsModel = mongoose.model('event_details', new mongoose.Schema({
    ym: String,
    coverImg: { type: mongoose.Schema.Types.ObjectId, ref: 'images' },
    description: String,
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedules' }],
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }],
    previews: { type: mongoose.Schema.Types.ObjectId, ref: 'albums' },
    metadata: { type: mongoose.Schema.Types.ObjectId, ref: 'metadata' }
  }));

  const eventDetails = await EventDetailsModel.find({}).populate(['coverImg', 'schedule', 'roles', 'previews', 'metadata']);
  const eventDetailsMap = new Map();

  for (const details of eventDetails) {
    const scheduleIds = details.schedule.map(s => scheduleMap.get(s._id.toString())).filter(Boolean);
    const roleIds = details.roles.map(r => roleMap.get(r._id.toString())).filter(Boolean);

    const strapiEventDetails = await createStrapiRecord('event-details', {
      ym: details.ym,
      coverImg: details.coverImg ? imageMap.get(details.coverImg._id.toString()) : null,
      description: details.description,
      schedule: scheduleIds,
      roles: roleIds,
      previews: details.previews ? albumMap.get(details.previews._id.toString()) : null,
      metadata: details.metadata ? metadataMap.get(details.metadata._id.toString()) : null
    });

    if (strapiEventDetails) {
      eventDetailsMap.set(details._id.toString(), strapiEventDetails.id);
      console.log(`Migrated event details: ${details.description?.substring(0, 50)}...`);
    }
  }

  return eventDetailsMap;
}

// Миграция событий
async function migrateEvents(imageMap, eventDetailsMap) {
  console.log('Migrating events...');
  const EventModel = mongoose.model('events', new mongoose.Schema({
    title: String,
    subtitle: String,
    posterImg: { type: mongoose.Schema.Types.ObjectId, ref: 'images' },
    eventDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'event_details' }
  }));

  const events = await EventModel.find({}).populate(['posterImg', 'eventDetails']);
  const eventMap = new Map();

  for (const event of events) {
    const strapiEvent = await createStrapiRecord('events', {
      title: event.title,
      subtitle: event.subtitle,
      posterImg: event.posterImg ? imageMap.get(event.posterImg._id.toString()) : null,
      eventDetails: event.eventDetails ? eventDetailsMap.get(event.eventDetails._id.toString()) : null
    });

    if (strapiEvent) {
      eventMap.set(event._id.toString(), strapiEvent.id);
      console.log(`Migrated event: ${event.title}`);
    }
  }

  return eventMap;
}

// Миграция мест проведения
async function migrateVenues(eventMap) {
  console.log('Migrating venues...');
  const VenueModel = mongoose.model('venues', new mongoose.Schema({
    title: String,
    label: String,
    mapUrl: String,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
    address: String
  }));

  const venues = await VenueModel.find({}).populate('events');

  for (const venue of venues) {
    const eventIds = venue.events.map(e => eventMap.get(e._id.toString())).filter(Boolean);

    const strapiVenue = await createStrapiRecord('venues', {
      title: venue.title,
      label: venue.label,
      mapUrl: venue.mapUrl,
      events: eventIds,
      address: venue.address
    });

    if (strapiVenue) {
      console.log(`Migrated venue: ${venue.title}`);
    }
  }
}

// Основная функция миграции
async function migrateData() {
  try {
    await connectToMongoDB();

    console.log('Starting migration...');

    // Миграция в правильном порядке (сначала зависимости)
    const imageMap = await migrateImages();
    const actorMap = await migrateActors(imageMap);
    const scheduleMap = await migrateSchedules();
    const metadataMap = await migrateMetadata(imageMap);
    const albumElementMap = await migrateAlbumElements(imageMap);
    const albumMap = await migrateAlbums(albumElementMap);
    const roleMap = await migrateRoles(actorMap, imageMap);
    const eventDetailsMap = await migrateEventDetails(imageMap, scheduleMap, roleMap, albumMap, metadataMap);
    const eventMap = await migrateEvents(imageMap, eventDetailsMap);
    await migrateVenues(eventMap);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Запуск миграции
migrateData(); 
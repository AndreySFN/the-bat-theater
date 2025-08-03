const fs = require('fs');
const path = require('path');

// Определяем структуру Content Types
const contentTypes = {
  'actor': {
    kind: 'collectionType',
    collectionName: 'actors',
    info: {
      singularName: 'actor',
      pluralName: 'actors',
      displayName: 'Actor',
      description: 'Актеры театра'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      name: {
        type: 'string',
        required: true
      },
      description: {
        type: 'text'
      },
      photo: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      photoSquare: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      photoThumbnail: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      }
    }
  },

  'schedule': {
    kind: 'collectionType',
    collectionName: 'schedules',
    info: {
      singularName: 'schedule',
      pluralName: 'schedules',
      displayName: 'Schedule',
      description: 'Расписание показов'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      ticketUrl: {
        type: 'string',
        required: true
      },
      place: {
        type: 'string',
        required: true
      },
      dateTime: {
        type: 'datetime',
        required: true
      },
      price: {
        type: 'string',
        required: true
      }
    }
  },

  'seo-metadata': {
    kind: 'collectionType',
    collectionName: 'seo_metadata',
    info: {
      singularName: 'seo-metadata',
      pluralName: 'seo-metadata',
      displayName: 'SEO Metadata',
      description: 'SEO метаданные'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      title: {
        type: 'string'
      },
      description: {
        type: 'text'
      },
      ogImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      ogImageSquare: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      twitterImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      alt: {
        type: 'string'
      }
    }
  },

  'album-element': {
    kind: 'collectionType',
    collectionName: 'album_elements',
    info: {
      singularName: 'album-element',
      pluralName: 'album-elements',
      displayName: 'Album Element',
      description: 'Элементы альбома'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      title: {
        type: 'string'
      },
      subtitle: {
        type: 'string'
      },
      originalImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images'],
        required: true
      },
      carouselImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      previewImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      galleryImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      }
    }
  },

  'album': {
    kind: 'collectionType',
    collectionName: 'albums',
    info: {
      singularName: 'album',
      pluralName: 'albums',
      displayName: 'Album',
      description: 'Альбомы'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      title: {
        type: 'string'
      },
      key: {
        type: 'string',
        required: true,
        unique: true
      },
      elements: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::album-element.album-element',
        mappedBy: 'albums',
        inversedBy: 'elements'
      }
    }
  },

  'role': {
    kind: 'collectionType',
    collectionName: 'roles',
    info: {
      singularName: 'role',
      pluralName: 'roles',
      displayName: 'Role',
      description: 'Роли актеров'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      role: {
        type: 'string'
      },
      actor: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::actor.actor',
        inversedBy: 'roles'
      },
      characterPhoto: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      characterPhotoSquare: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      }
    }
  },

  'event-detail': {
    kind: 'collectionType',
    collectionName: 'event_details',
    info: {
      singularName: 'event-detail',
      pluralName: 'event-details',
      displayName: 'Event Detail',
      description: 'Детали события'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      ym: {
        type: 'string'
      },
      coverImage: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      coverWide: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      coverMobile: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      description: {
        type: 'richtext'
      },
      schedule: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::schedule.schedule',
        mappedBy: 'eventDetail'
      },
      roles: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::role.role',
        mappedBy: 'eventDetail'
      },
      previews: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::album.album',
        inversedBy: 'eventDetails'
      },
      metadata: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::seo-metadata.seo-metadata',
        inversedBy: 'eventDetails'
      }
    }
  },

  'event': {
    kind: 'collectionType',
    collectionName: 'events',
    info: {
      singularName: 'event',
      pluralName: 'events',
      displayName: 'Event',
      description: 'События'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      title: {
        type: 'string',
        required: true
      },
      subtitle: {
        type: 'string'
      },
      poster: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      posterSquare: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      posterWide: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      posterMobile: {
        type: 'media',
        multiple: false,
        allowedTypes: ['images']
      },
      eventDetails: {
        type: 'relation',
        relation: 'oneToOne',
        target: 'api::event-detail.event-detail',
        mappedBy: 'event'
      }
    }
  },

  'venue': {
    kind: 'collectionType',
    collectionName: 'venues',
    info: {
      singularName: 'venue',
      pluralName: 'venues',
      displayName: 'Venue',
      description: 'Места проведения'
    },
    options: {
      draftAndPublish: false
    },
    attributes: {
      title: {
        type: 'string',
        required: true
      },
      label: {
        type: 'string',
        required: true
      },
      address: {
        type: 'string',
        required: true
      },
      mapUrl: {
        type: 'string'
      },
      events: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::event.event',
        mappedBy: 'venue'
      }
    }
  }
};

// Создаем директории и файлы для каждого Content Type
Object.entries(contentTypes).forEach(([name, schema]) => {
  const apiDir = path.join(__dirname, 'src', 'api', name);
  const contentTypesDir = path.join(apiDir, 'content-types', name);
  
  // Создаем директории
  if (!fs.existsSync(contentTypesDir)) {
    fs.mkdirSync(contentTypesDir, { recursive: true });
  }
  
  // Создаем schema.json
  const schemaPath = path.join(contentTypesDir, 'schema.json');
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  
  console.log(`Created schema for ${name}`);
});

console.log('All Content Types created successfully!'); 
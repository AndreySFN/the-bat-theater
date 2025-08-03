const fs = require('fs');
const path = require('path');

const apis = [
  'actor',
  'schedule', 
  'metadata',
  'album-element',
  'album',
  'role',
  'event-details',
  'event',
  'venue'
];

const createApiFiles = (apiName) => {
  const apiDir = path.join(__dirname, 'src', 'api', apiName);
  
  // Создаем директории
  ['controllers', 'routes', 'services'].forEach(dir => {
    const dirPath = path.join(apiDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  // Создаем файлы
  const files = [
    {
      path: path.join(apiDir, 'controllers', `${apiName}.ts`),
      content: `/**
 * ${apiName} controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::${apiName}.${apiName}');`
    },
    {
      path: path.join(apiDir, 'routes', `${apiName}.ts`),
      content: `/**
 * ${apiName} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${apiName}.${apiName}');`
    },
    {
      path: path.join(apiDir, 'services', `${apiName}.ts`),
      content: `/**
 * ${apiName} service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${apiName}.${apiName}');`
    }
  ];

  files.forEach(file => {
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.content);
      console.log(`Created: ${file.path}`);
    }
  });
};

apis.forEach(createApiFiles);
console.log('All API files created successfully!'); 
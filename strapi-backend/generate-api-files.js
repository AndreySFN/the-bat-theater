const fs = require('fs');
const path = require('path');

const apis = [
  'actor',
  'schedule',
  'album',
  'role',
  'event',
  'venue'
];

const createApiFiles = (apiName) => {
  const apiDir = path.join(__dirname, 'src', 'api', apiName);
  
  // Создаем директории
  const controllersDir = path.join(apiDir, 'controllers');
  const routesDir = path.join(apiDir, 'routes');
  const servicesDir = path.join(apiDir, 'services');
  
  if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir, { recursive: true });
  }
  if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
  }
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
  }

  // Создаем контроллер
  const controllerContent = `'use strict';

/**
 * ${apiName} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${apiName}.${apiName}');
`;
  fs.writeFileSync(path.join(controllersDir, `${apiName}.js`), controllerContent);

  // Создаем роут
  const routeContent = `'use strict';

/**
 * ${apiName} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${apiName}.${apiName}');
`;
  fs.writeFileSync(path.join(routesDir, `${apiName}.js`), routeContent);

  // Создаем сервис
  const serviceContent = `'use strict';

/**
 * ${apiName} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${apiName}.${apiName}');
`;
  fs.writeFileSync(path.join(servicesDir, `${apiName}.js`), serviceContent);

  console.log(`Created API files for ${apiName}`);
};

apis.forEach(createApiFiles);
console.log('All API files created successfully!'); 
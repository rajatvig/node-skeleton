'use strict';

const swaggerJSDoc = require('swagger-jsdoc');

function create(appInfo, srcDirs) {
  let options = {
    swaggerDefinition: {
      info: {
        title: appInfo.name,
        version: appInfo.version,
        description: appInfo.description
      }
    },
    apis: srcDirs
  };

  let swaggerSpec = swaggerJSDoc(options);

  return (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  };
}

module.exports = {
  create: create
};

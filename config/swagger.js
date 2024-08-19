const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');

// Load and parse the Swagger YAML file
const swaggerDocument = yaml.load(path.resolve(__dirname, '../swagger.yaml'));

module.exports = {
  swaggerUi,
  swaggerDocument,
};

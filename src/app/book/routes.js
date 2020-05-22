const { BaseRoutes } = require('../../base');

const { BookController } = require('./controller');
const { bookUpdatedValidator, bookCreateValidator } = require('./model');

const routes = BaseRoutes.init(
  BookController,
  bookCreateValidator,
  bookUpdatedValidator
);

module.exports = {
  BookRoutes: routes,
};

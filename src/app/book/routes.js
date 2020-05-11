const { Router } = require('express');

const { Validations } = require('../../middlewares');
const { BookController } = require('./controller');
const { bookUpdatedValidator, bookCreateValidator } = require('./model');

const routes = Router();

// Book
routes.post(
  '/',
  Validations.validateBody(bookCreateValidator),
  BookController.create
);
routes.get('/', BookController.findAll);
routes.get('/:id', Validations.validateId, BookController.findById);
routes.delete('/:id', Validations.validateId, BookController.deleteById);
routes.put(
  '/:id',
  Validations.validateId,
  Validations.validateBody(bookUpdatedValidator),
  BookController.updateById
);

module.exports = {
  BookRoutes: routes,
};

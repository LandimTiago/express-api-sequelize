const { Router } = require('express');

const { BookController } = require('./controller');
const { Validations } = require('./middlewares');
const { bookUpdatedValidator, bookCreateValidator } = require('./models');

const routes = Router();

// Book
routes.post(
  '/books',
  Validations.validateBody(bookCreateValidator),
  BookController.create
);
routes.get('/books', BookController.findAll);
routes.get('/books/:id', Validations.validateId, BookController.findById);
routes.delete('/books/:id', Validations.validateId, BookController.deleteById);
routes.put(
  '/books/:id',
  Validations.validateId,
  Validations.validateBody(bookUpdatedValidator),
  BookController.updateById
);

module.exports = { routes };

const { Router } = require('express');

const { BookRoutes } = require('./app/book');

const routes = Router();

routes.use('/books', BookRoutes);

module.exports = { routes };

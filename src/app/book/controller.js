const { BaseController } = require('../../base');
const { BookService } = require('./service');

const BookController = BaseController.init(BookService);

module.exports = { BookController };

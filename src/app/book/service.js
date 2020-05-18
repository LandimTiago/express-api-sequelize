const { BaseService } = require('../../base');
const { Book } = require('./model');

const BookService = BaseService.init('Book', Book);

module.exports = { BookService };

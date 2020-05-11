const { Book, bookCreateValidator, bookUpdatedValidator } = require('./model');
const { BookRoutes } = require('./routes');

module.exports = {
  Book,
  bookCreateValidator,
  bookUpdatedValidator,
  BookRoutes,
};

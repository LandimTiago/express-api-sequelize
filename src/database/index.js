const Sequelize = require('sequelize');

const { Book } = require('../app/book');
const config = require('./config');

const models = [Book];

const init = () => {
  const connection = new Sequelize(config);

  models.map(model => model.init(connection));
};

module.exports = {
  Database: {
    models,
    init,
  },
};

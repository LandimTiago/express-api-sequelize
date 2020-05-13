const express = require('express');
require('express-async-errors');

const { loggerMiddleware, logger } = require('./libs');
const { notFound, errorMiddleware } = require('./middlewares');
const { routes } = require('./routes');

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use(routes);
server.use('*', notFound);
server.use(errorMiddleware);

const start = async () => {
  try {
    server.listen(5000, () => logger.info('server is runing on port 5000'));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = {
  App: {
    server,
    start,
  },
};

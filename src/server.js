const express = require('express');
require('express-async-error');

const { loggerMiddleware, logger } = require('./libs');
const { routes } = require('./routes');

const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use(routes);

async function start() {
  try {
    server.listen(5000, () => logger.info('server is runing on port 5000'));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
start();

const pino = require('pino');
const expresspino = require('express-pino-logger');

const Logger = pino({
  redact: {
    remove: true,
    paths: [
      'hostname',
      'req.id',
      'req.headers',
      'req.remoteAddress',
      'req.remotePort',
      'res.headers',
    ],
  },
});

const loggerMiddleware = expresspino({ Logger });

module.exports = { Logger, loggerMiddleware };

const { response, logger } = require('../libs');

const errorMiddleware = async (err, req, res, next) => {
  logger.error(err);
  return response.send(res, response.buildError());
};
module.exports = { errorMiddleware };

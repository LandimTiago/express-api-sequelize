const { Response, Logger } = require('../libs');

const errorMiddleware = async (err, req, res, next) => {
  Logger.error(err);
  return Response.send(res, Response.buildError());
};
module.exports = { errorMiddleware };

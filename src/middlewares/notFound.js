const { HttpStatus, response } = require('../libs');

const notFound = async (req, res) =>
  response.send(
    res,
    response.buildError(
      'Route not provided by this service',
      HttpStatus.NOT_FOUND
    )
  );

module.exports = { notFound };

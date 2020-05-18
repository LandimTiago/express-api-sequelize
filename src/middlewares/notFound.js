const { HttpStatus, Response } = require('../libs');

const notFound = async (req, res) =>
  Response.send(
    res,
    Response.buildError(
      'Route not provided by this service',
      HttpStatus.NOT_FOUND
    )
  );

module.exports = { notFound };

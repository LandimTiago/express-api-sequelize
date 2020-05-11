const { HttpStatus } = require('./httpStatus');

function buildError(
  message = 'Internal Server Error, contact the suport',
  status = HttpStatus.INTERNAL_SERVER_ERROR
) {
  return {
    error: {
      status: status.number,
      data: {
        timestamp: new Date().toISOString(),
        name: status.name,
        message,
      },
    },
  };
}

function build(content) {
  return { content };
}

module.exports = {
  response: {
    buildError,
    build,
  },
};

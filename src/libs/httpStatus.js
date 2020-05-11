const HttpStatus = {
  CREATED: {
    name: 'Created',
    number: 201,
  },
  OK: {
    name: 'Ok',
    number: 200,
  },
  BAD_REQUEST: {
    name: 'Bad Request',
    number: 400,
  },
  UNAUTHORIZED: {
    name: 'Unauthorized',
    number: 401,
  },
  FORBIDDEN: {
    name: 'Forbidden',
    number: 403,
  },
  NOT_FOUND: {
    name: 'Not Found',
    number: 404,
  },
  CONFLICT: {
    name: 'Conflict',
    number: 409,
  },
  INTERNAL_SERVER_ERROR: {
    name: 'Internal Server Error',
    number: 500,
  },
};

module.exports = { HttpStatus };

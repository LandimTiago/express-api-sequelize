const { HttpStatus } = require('./httpStatus');

const buildError = (
  message = 'Internal Server Error, contact the suport',
  status = HttpStatus.INTERNAL_SERVER_ERROR
) => ({
  error: {
    status: status.number,
    data: {
      timestamp: Date.now(),
      name: status.name,
      message,
    },
  },
});
const build = content => ({ content });

const send = (res, result) =>
  result.error
    ? res.status(result.error.status).json(result.error.data)
    : res.json(result.content);

// const send = (res, result) => {
//   if (result.error) {
//     return res.status(result.error.status).json(result.error.data);
//   }
//   return res.json(result.content);
// };

module.exports = {
  Response: {
    buildError,
    build,
    send,
  },
};

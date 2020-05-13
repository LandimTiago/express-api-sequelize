const query = data =>
  jest
    .fn()
    .mockReturnValue(Array.isArray(data) ? { rows: data } : { rows: [data] });

module.exports = {
  DatabaseMock: {
    query,
  },
};

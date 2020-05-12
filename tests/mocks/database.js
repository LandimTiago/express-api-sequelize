const query = data =>
  jest
    .fn()
    .mockReturnValue(
      typeof data === 'object' ? { rows: [data] } : { rows: data }
    );

module.exports = {
  DatabaseMock: {
    query,
  },
};

const request = require('supertest');

const { App } = require('../../../src/server');

describe('Not found middleware', () => {
  test('Should return not found error', async () => {
    const res = await request(App.server).get('/notfoundroute');
    expect(res.status).toEqual(404);
  });
});

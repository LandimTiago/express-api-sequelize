const request = require('supertest');

const { App } = require('../../../src/server');

describe('Id validation middleware', () => {
  test('Should return error for invalid number', async () => {
    const res = await request(App.server).get('/books/1a');

    expect(res.status).toEqual(400);
  });
  test('Should return error for invalid integer', async () => {
    const res = await request(App.server).get('/books/1.1');

    expect(res.status).toEqual(400);
  });
});

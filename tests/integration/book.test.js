const request = require('supertest');

const { App } = require('../../src/server');
const db = require('../../src/database');

// const bookCreateValidator = Yup.object().shape({
//   name: Yup.string().required().min(4).max(40),
//   description: Yup.string().min(4).max(255),
//   pages: Yup.number().integer().required().min(1),
// });

// POST /books
describe('POST /books', () => {
  test('name, description, pages corrects', async () => {
    db.query = jest.fn().mockReturnValue({
      rows: [
        {
          id: 1,
          name: 'my book',
          description: 'my book description',
          pages: 100,
        },
      ],
    });

    const res = await request(App.server).post('/books').send({
      name: 'my book',
      description: 'my book description',
      pages: 100,
    });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('description');
    expect(res.body).toHaveProperty('pages');
  });
});
// GET /books
describe('GET /books', () => {});
// GET /books/:id
describe('GET /books/:id', () => {});
// PUT /books/:id
describe('PUT /books/:id', () => {});
// DELETE /book/:id
describe('DELETE /books/:id', () => {});

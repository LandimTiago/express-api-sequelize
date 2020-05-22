const request = require('supertest');

const { App } = require('../../../src/server');
const { Book } = require('../../../src/app/book');
const { Database } = require('../../../src/database');
const { DatabaseUtils } = require('../../utils');
const { BookMock } = require('../../mocks');

// const bookCreateValidator = Yup.object().shape({
//   name: Yup.string().required().min(4).max(40),
//   description: Yup.string().min(4).max(255),
//   pages: Yup.number().integer().required().min(1),
// });

describe('Book entity', () => {
  beforeAll(() => Database.init());

  beforeEach(() => DatabaseUtils.truncate());

  // POST /books
  describe('POST /books', () => {
    test('should create a book with description', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create());

      expect(res.status).toEqual(200);
    });
    test('should create a book without description', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ description: undefined }));

      expect(res.status).toEqual(200);
    });
    test('Should return null error for name field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ name: undefined }));

      expect(res.status).toEqual(400);
    });
    test('Should return length < 4 error for name field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ name: '' }));

      expect(res.status).toEqual(400);
    });
    test('Should return length > 40 error for name field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ name: BookMock.getLargeName() }));

      expect(res.status).toEqual(400);
    });
    test('Should return length < 4 error for description field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ description: '' }));

      expect(res.status).toEqual(400);
    });
    test('Should return length > 255 error for description field', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(
          BookMock.create({
            description: BookMock.getLargeDescriptionm(),
          })
        );

      expect(res.status).toEqual(400);
    });
    test('Should return null error for pages fields', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: undefined }));

      expect(res.status).toEqual(400);
    });
    test('Should return size <1 error for pages fields', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: 0 }));

      expect(res.status).toEqual(400);
    });
    test('Should return invalid number error for pages fields', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: '10a' }));

      expect(res.status).toEqual(400);
    });
    test('Should return invalid integer number error for pages fields', async () => {
      const res = await request(App.server)
        .post('/books')
        .send(BookMock.create({ pages: 10.25 }));

      expect(res.status).toEqual(400);
    });
  });
  // GET /books
  describe('GET /books', () => {
    test('Should return array with two books', async () => {
      await Book.bulkCreate([BookMock.create(), BookMock.create()]);

      const res = await request(App.server).get('/books');

      expect(res.status).toEqual(200);

      expect(res.body).toHaveLength(2);
    });
    test('Should return empity array', async () => {
      const res = await request(App.server).get('/books');

      expect(res.status).toEqual(200);

      expect(res.body).toEqual([]);
    });
  });

  // GET /books/:id
  describe('GET /books/:id', () => {
    test('Should return a book with same provided id', async () => {
      const book = await Book.create(BookMock.create());
      const res = await request(App.server).get(`/books/${book.id}`);

      expect(res.status).toEqual(200);

      expect(res.body).toHaveProperty('id', book.id);
    });
    test('Should return not found error', async () => {
      const res = await request(App.server).get('/books/1');

      expect(res.status).toEqual(404);
    });
  });

  // PUT /books/:id
  describe('PUT /books/:id', () => {
    test('Should update a book and return success status', async () => {
      const book = await Book.create(BookMock.create());

      const res = await request(App.server)
        .put(`/books/${book.id}`)
        .send(BookMock.create());

      expect(res.status).toEqual(200);
    });
    test('Should return not found error', async () => {
      const res = await request(App.server).put('/books/1');

      expect(res.status).toEqual(404);
    });
    test('Should return length < 4 error for name field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ name: '' }));

      expect(res.status).toEqual(400);
    });
    test('Should return length > 40 error for name field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ name: BookMock.getLargeName() }));

      expect(res.status).toEqual(400);
    });
    test('Should return length < 4 error for description field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ description: '' }));
      expect(res.status).toEqual(400);
    });
    test('Should return length > 255 error for description field', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(
          BookMock.create({
            description: BookMock.getLargeDescriptionm(),
          })
        );
      expect(res.status).toEqual(400);
    });
    test('Should return size <1 error for pages fields', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ pages: 0 }));
      expect(res.status).toEqual(400);
    });
    test('Should return invalid number error for pages fields', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ pages: '10a' }));
      expect(res.status).toEqual(400);
    });
    test('Should return invalid integer number error for pages fields', async () => {
      const res = await request(App.server)
        .put('/books/1')
        .send(BookMock.create({ pages: 10.25 }));
      expect(res.status).toEqual(400);
    });
  });
  // DELETE /book/:id
  describe('DELETE /books/:id', () => {
    test('Should delete book and return success status', async () => {
      const book = await Book.create(BookMock.create());

      const res = await request(App.server).delete(`/books/${book.id}`);
      expect(res.status).toEqual(200);
    });
    test('Should return not found error', async () => {
      const res = await request(App.server).delete('/books/1');
      expect(res.status).toEqual(404);
    });
  });
});

const request = require('supertest');

const { App } = require('../../../src/server');
const { DatabaseMock, BookMock } = require('../../mocks');
const db = require('../../../src/database');

// const bookCreateValidator = Yup.object().shape({
//   name: Yup.string().required().min(4).max(40),
//   description: Yup.string().min(4).max(255),
//   pages: Yup.number().integer().required().min(1),
// });

// POST /books
describe('POST /books', () => {
  test('should create a book with description', async () => {
    const Book = BookMock.create();
    db.query = DatabaseMock.query({
      id: 1,
      ...Book,
    });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(200);
  });
  test('should create a book without description', async () => {
    const Book = BookMock.create({ description: undefined });
    db.query = DatabaseMock.query({
      id: 1,
      ...Book,
    });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('description', '');
  });
  test('Should return null error for name field', async () => {
    const Book = BookMock.create({ name: undefined });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length < 4 error for name field', async () => {
    const Book = BookMock.create({ name: '' });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length > 40 error for name field', async () => {
    const Book = BookMock.create({ name: BookMock.getLargeName() });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length < 4 error for description field', async () => {
    const Book = BookMock.create({ description: '' });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length > 255 error for description field', async () => {
    const Book = BookMock.create({
      description: BookMock.getLargeDescriptionm(),
    });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return null error for pages fields', async () => {
    const Book = BookMock.create({ pages: undefined });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return size <1 error for pages fields', async () => {
    const Book = BookMock.create({ pages: 0 });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return invalid number error for pages fields', async () => {
    const Book = BookMock.create({ pages: '10a' });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return invalid integer number error for pages fields', async () => {
    const Book = BookMock.create({ pages: 10.25 });
    const res = await request(App.server).post('/books').send(Book);
    expect(res.status).toEqual(400);
  });
});
// GET /books
describe('GET /books', () => {
  test('Should return array with two books', async () => {
    const books = [
      { id: 1, ...BookMock.create() },
      { id: 2, ...BookMock.create() },
    ];
    db.query = DatabaseMock.query(books);
    const res = await request(App.server).get('/books');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(books);
  });
  test('Should return empity array', async () => {
    db.query = DatabaseMock.query([]);
    const res = await request(App.server).get('/books');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([]);
  });
});

// GET /books/:id
describe('GET /books/:id', () => {
  test('Should return a book with same provided id', async () => {
    db.query = DatabaseMock.query({
      id: 1,
      ...BookMock.create(),
    });
    const res = await request(App.server).get('/books/1');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });
  test('Should return not found error', async () => {
    db.query = DatabaseMock.query([]);
    const res = await request(App.server).get('/books/1');
    expect(res.status).toEqual(404);
  });
});

// PUT /books/:id
describe('PUT /books/:id', () => {
  test('Should update a book and return success status', async () => {
    const book = BookMock.create();
    db.query = DatabaseMock.query({ id: 1, ...book });
    const res = await request(App.server).put('/books/1').send(book);
    expect(res.status).toEqual(200);
  });
  test('Should return not found error', async () => {
    db.query = DatabaseMock.query([]);
    const res = await request(App.server).put('/books/1');
    expect(res.status).toEqual(404);
  });
  test('Should return length < 4 error for name field', async () => {
    const Book = BookMock.create({ name: '' });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length > 40 error for name field', async () => {
    const Book = BookMock.create({ name: BookMock.getLargeName() });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length < 4 error for description field', async () => {
    const Book = BookMock.create({ description: '' });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return length > 255 error for description field', async () => {
    const Book = BookMock.create({
      description: BookMock.getLargeDescriptionm(),
    });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return size <1 error for pages fields', async () => {
    const Book = BookMock.create({ pages: 0 });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return invalid number error for pages fields', async () => {
    const Book = BookMock.create({ pages: '10a' });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
  test('Should return invalid integer number error for pages fields', async () => {
    const Book = BookMock.create({ pages: 10.25 });
    const res = await request(App.server).put('/books/1').send(Book);
    expect(res.status).toEqual(400);
  });
});
// DELETE /book/:id
describe('DELETE /books/:id', () => {
  test('Should delete book and return success status', async () => {
    db.query = DatabaseMock.query({ id: 1, ...BookMock.create() });
    const res = await request(App.server).delete('/books/1');
    expect(res.status).toEqual(200);
  });
  test('Should return not found error', async () => {
    db.query = DatabaseMock.query([]);
    const res = await request(App.server).delete('/books/1');
    expect(res.status).toEqual(404);
  });
});

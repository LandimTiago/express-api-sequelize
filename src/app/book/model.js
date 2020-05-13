const Yup = require('yup');

const db = require('../../database');
const { response, HttpStatus } = require('../../libs');

// validação de dados para criação
const bookCreateValidator = Yup.object().shape({
  name: Yup.string().required().min(4).max(40),
  description: Yup.string().min(4).max(255),
  pages: Yup.number().integer().required().min(1),
});
// validação de dados para atualização
const bookUpdatedValidator = Yup.object().shape({
  name: Yup.string().min(4).max(40),
  description: Yup.string().min(4).max(255),
  pages: Yup.number().integer().min(1),
});

const CREATE_QUERY = `
    INSERT INTO book (name, description, pages)
    VALUES ($1, $2, $3)
    RETURNING id, name, description, pages;
`;
const UPDATE_QUERY = `
    UPDATE book SET
        name = $1,
        description = $2,
        pages = $3
    WHERE id = $4
    RETURNING id, name, description, pages;
`;
const DELETE_QUERY = `
    DELETE FROM book
    WHERE id = $1;
`;
const FIND_ALL_QUERY = `
    SELECT id, name, description, pages
    FROM book;
`;
const FIND_BY_ID_QUERY = `
    SELECT id, name, description, pages
    FROM book
    WHERE id = $1;
`;

const create = async ({ name, description, pages }) => {
  const { rows } = await db.query(CREATE_QUERY, [name, description, pages]);
  const book = rows[0];

  return response.build({
    id: book.id,
    name: book.name,
    description: book.description || '',
    pages: book.pages,
  });
};
const findAll = async () => {
  const { rows } = await db.query(FIND_ALL_QUERY);

  return response.build(
    rows.map(book => ({
      id: book.id,
      name: book.name,
      description: book.description || '',
      pages: book.pages,
    }))
  );
};
const findById = async id => {
  const { rows } = await db.query(FIND_BY_ID_QUERY, [id]);
  const book = rows[0];

  if (!book) {
    return response.buildError(
      'Cannot find book with provided id',
      HttpStatus.NOT_FOUND
    );
  }

  return response.build({
    id: book.id,
    name: book.name,
    description: book.description || '',
    pages: book.pages,
  });
};
const updateById = async (id, bookData) => {
  const result = await findById(id);

  if (result.error) return result;

  const { name, description, pages } = { ...result.content, ...bookData };

  const { rows } = await db.query(UPDATE_QUERY, [name, description, pages, id]);

  const updatedBook = rows[0];

  return {
    content: {
      id: updatedBook.id,
      name: updatedBook.name,
      description: updatedBook.description || '',
      pages: updatedBook.pages,
    },
  };
};
const deleteById = async id => {
  const result = await findById(id);

  if (result.error) return result;

  await db.query(DELETE_QUERY, [id]);

  return response.build({
    deleted: true,
  });
};

module.exports = {
  bookCreateValidator,
  bookUpdatedValidator,
  Book: {
    create,
    updateById,
    deleteById,
    findById,
    findAll,
  },
};

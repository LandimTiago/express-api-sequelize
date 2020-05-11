const { Book } = require('../models');

async function create(req, res) {
  const result = await Book.create(req.body);

  if (result.error) {
    return res.status(result.error.status).json(result.error.data);
  }

  return res.json(result.content);
}
async function updateById(req, res) {
  const result = await Book.updateById(req.params.id, req.body);

  if (result.error) {
    return res.status(result.error.status).json(result.error.data);
  }

  return res.json(result.content);
}
async function deleteById(req, res) {
  const result = await Book.deleteById(req.params.id);

  if (result.error) {
    return res.status(result.error.status).json(result.error.data);
  }

  return res.json(result.content);
}
async function findAll(req, res) {
  const result = await Book.findAll();

  return res.json(result.content);
}
async function findById(req, res) {
  const result = await Book.findById(req.params.id);

  if (result.error) {
    return res.status(result.error.status).json(result.error.data);
  }

  return res.json(result.content);
}

module.exports = {
  BookController: {
    create,
    updateById,
    deleteById,
    findById,
    findAll,
  },
};
